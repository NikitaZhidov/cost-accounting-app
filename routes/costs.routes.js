const { Router } = require("express");
const router = Router();
const mongoose = require("mongoose");

const authMiddleware = require("../middlewares/auth.middleware");
const dateRangeMiddleware = require("../middlewares/dateRange.middleware");
const Costs = require("../models/Costs");
const AddCategories = require("../models/AddCategories");
const User = require("../models/User");

const UserCosts = require("../models/UserCosts");
const { isValidPageAndCount } = require("../utils/check");

const NULL_VALUES = ["undefined", "null", "NaN"];

const PAGE_DEFAULT = 1;
const COUNT_DEFAULT = Infinity;

//? BUG when pageSize == 1

router.get(`/get`, authMiddleware, dateRangeMiddleware, async (req, res) => {
  try {
    const { userId, count, page } = req.query;

    if (!isValidPageAndCount(page, count)) {
      return res.json({ error: 1, message: "Invalid value: page or count" });
    }

    // count costs in page
    const countCondition = count ? +count : COUNT_DEFAULT;

    // current page
    const pageCondition = page ? +page : PAGE_DEFAULT;

    // skip records to access page content
    const skipCondition =
      pageCondition <= 1 ? 0 : (pageCondition - 1) * countCondition;

    const user = await User.findById(req.user.id).lean();

    // aggregate function for get costs by params
    let aggregateArr = [];
    // prepare used by get costs and by check hasNext
    let prepareAggregate = [
      {
        $match: {
          _id: new mongoose.mongo.ObjectID(user.userCosts),
        },
      },
      {
        $unwind: "$users",
      },
    ];

    if (userId) {
      prepareAggregate.push({
        $match: {
          "users._id": new mongoose.mongo.ObjectID(userId),
        },
      });
    }

    prepareAggregate = prepareAggregate.concat([
      {
        $lookup: {
          from: "costs",
          localField: "users.costs",
          foreignField: "_id",
          as: "users.costs",
        },
      },
      {
        $unwind: "$users.costs",
      },
      {
        $unwind: "$users.costs.costs",
      },
      {
        $match: {
          "users.costs.costs.date": req.dateCondition,
        },
      },
      {
        $sort: {
          "users.costs.costs.date": -1,
        },
      },
    ]);

    aggregateArr = aggregateArr.concat(prepareAggregate);

    aggregateArr.push({
      $skip: skipCondition,
    });
    aggregateArr.push({
      $limit: countCondition,
    });

    aggregateArr = aggregateArr.concat([
      {
        $lookup: {
          from: "generalcategories",
          localField: "users.costs.costs.GeneralCategory",
          foreignField: "_id",
          as: "users.costs.costs.GeneralCategory",
        },
      },
      {
        $unwind: {
          path: "$users.costs.costs.GeneralCategory",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "icons",
          localField: "users.costs.costs.GeneralCategory.icon",
          foreignField: "_id",
          as: "users.costs.costs.GeneralCategory.icon",
        },
      },
      {
        $unwind: {
          path: "$users.costs.costs.GeneralCategory.icon",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          costs: {
            $push: "$users.costs.costs",
          },
          _id: "$users.costs._id",
          userName: { $first: "$users.name" },
          userId: { $first: "$users._id" },
          userCostsId: { $first: "$_id" },
        },
      },
    ]);

    const tmpUsersCosts = await UserCosts.aggregate(aggregateArr);

    // If there is at least one more entry on the next page
    const checkNext = await UserCosts.aggregate(
      prepareAggregate.concat([
        { $skip: pageCondition * countCondition },
        { $limit: 1 },
      ])
    );

    const newRetCosts = {
      _id: tmpUsersCosts[0]?.userCostsId,
      hasNext: checkNext.length > 0,
      users: tmpUsersCosts.map((i) => ({
        name: i.userName,
        _id: i.userId,
        costs: { _id: i._id, costs: i.costs },
      })),
    };

    let retCosts = newRetCosts;

    //populate costs with AddCategories
    if (user.addCategories) {
      const addCategories = await AddCategories.findById(
        user.addCategories
      ).populate({ path: "categories", populate: { path: "icon" } });
      retCosts.users = retCosts.users.map((u) => {
        const newCosts = u.costs.costs.map((c) => {
          if (c.AddCategory) {
            const targetCategory = addCategories.categories.find(
              (ac) => ac._id == c.AddCategory.toString()
            );
            return { ...c, AddCategory: targetCategory, GeneralCategory: null };
          }
          return { ...c };
        });
        return { ...u, costs: { _id: u.costs._id, costs: newCosts } };
      });
    }

    return res.json({
      message: "Расходы получены",
      error: 0,
      costs: retCosts,
    });
  } catch (e) {
    console.log(e);
    res.json({ message: "Server error", error: 1 });
  }
});

router.post(`/add`, authMiddleware, async (req, res) => {
  try {
    const { sum, category, date, comment, costsId } = req.body;
    let cost = await Costs.findById(costsId);

    if (!cost) {
      const newCost = new Costs({ costs: [], _id: costsId });
      await newCost.save();
      cost = await Costs.findOne({ _id: costsId });
    }

    let GeneralCategory = null,
      AddCategory = null;

    if (category.isGeneral) {
      GeneralCategory = category.id;
    } else {
      AddCategory = category.id;
    }

    if (cost) {
      cost.costs.push({
        sum,
        date,
        comment,
        GeneralCategory,
        AddCategory,
      });
      await cost.save();

      return res.json({ message: "Расход добавлен", error: 0 });
    }

    return res.json({ message: "Нет данных для пользователя", error: 1 });
  } catch (e) {
    console.log(e);

    res.json({ message: "Server error", error: 1 });
  }
});

router.delete(`/delete`, authMiddleware, async (req, res) => {
  try {
    const { userId, costId } = req.query;

    if (NULL_VALUES.includes(userId) || NULL_VALUES.includes(costId)) {
      return res.json({
        message: "Ошибка удаления категории. Некорректные данные.",
        error: 1,
      });
    }

    const user = await User.findById(req.user.id).populate("userCosts").lean();

    const targetUser = user.userCosts.users.find((u) => u._id == userId);
    const targetCosts = await Costs.findById(targetUser.costs);

    targetCosts.costs = targetCosts.costs.filter((c) => c._id != costId);

    await targetCosts.save();

    res.json({ message: "Расход успешно удален", error: 0 });
  } catch (e) {
    res.json({ message: "Server error", error: 1 });
  }
});

module.exports = router;
