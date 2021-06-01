const { Router } = require("express");
const router = Router();

const authMiddleware = require("../middlewares/auth.middleware");

const GeneralCategories = require("../models/GeneralCategories");
const AddCategories = require("../models/AddCategories");
const User = require("../models/User");
const Costs = require("../models/Costs");
const Icons = require("../models/Icons");

router.get("/get", authMiddleware, async (req, res) => {
  try {
    GeneralCategories.find()
      .populate("icon")
      .exec(async (err, genCategories) => {
        if (err) throw err;
        let categories = {
          general: genCategories.map((c) => {
            return {
              icon: `${c._doc.icon.src}`,
              id: c._doc._id,
              name: c._doc.name,
              isGeneral: true,
            };
          }),
        };

        const user = await User.findById(req.user.id);

        if (user.addCategories) {
          AddCategories.findById(user.addCategories)
            .populate({ path: "categories", populate: { path: "icon" } })
            .exec((err, addCategories) => {
              if (err) throw err;

              categories.addCategories = addCategories.categories.map((c) => {
                return {
                  icon: `${c._doc.icon.src}`,
                  id: c._doc._id,
                  name: c._doc.name,
                  isGeneral: false,
                };
              });

              return res.json({
                message: "Категории получены",
                error: 0,
                categories,
              });
            });
        } else {
          categories.addCategories = [];
          return res.json({
            message: "Категории получены",
            error: 0,
            categories,
          });
        }
      });
  } catch (e) {
    res.json({ message: "Server error", error: 1 });
  }
});

router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { name, icon } = req.body;

    if (!name && !name.length) {
      return res.json({
        message: "Имя категории - обязательное поле",
        error: 1,
      });
    }

    const iconModel = await Icons.findById(icon).lean();

    if (!iconModel) {
      return res.json({
        message: "Несуществующий id иконки",
        error: 1,
      });
    }

    const user = await User.findById(req.user.id);

    if (!user.addCategories) {
      const addCategories = new AddCategories({ categories: [] });
      await addCategories.save();

      user.addCategories = addCategories._id;

      await user.save();
    }

    let addCategories = await AddCategories.findById(user.addCategories);

    if (!addCategories) {
      const newAddCategories = new AddCategories({
        categories: [],
        _id: user.addCategories,
        icon: icon,
      });
      await newAddCategories.save();
    } else {
      addCategories.categories.push({ name, icon });
      await addCategories.save();
    }

    res.json({ message: "Категория успешно добавлена", error: 0 });
  } catch (e) {
    console.log(e);
    res.json({ message: "Server error", error: 1 });
  }
});

router.delete(`/delete/:id`, authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate({
        path: "userCosts",
      })
      .lean();

    const users = user.userCosts.users;

    // Удаление всех расходов из этой категории
    for (let i = 0; i < users.length; i++) {
      const costs = await Costs.findById(users[i].costs);
      costs.costs = costs.costs.filter((c) => c.AddCategory != req.params.id);
      await costs.save();
    }

    // Удаление категории
    const addCategories = await AddCategories.findById(user.addCategories);
    addCategories.categories = addCategories.categories.filter(
      (c) => c._id != req.params.id
    );
    await addCategories.save();

    res.json({ message: "Категория успешно удалена", error: 0 });
  } catch (e) {
    res.json({ message: "Server error", error: 1 });
  }
});

router.post(`/edit`, authMiddleware, async (req, res) => {
  try {
    const { id, name, iconId } = req.body;

    const user = await User.findById(req.user.id).lean();
    const addCategories = await AddCategories.findById(user.addCategories);

    addCategories.categories = addCategories.categories.map((c) => {
      if (c._id == id) {
        return { ...c.toJSON(), name, icon: iconId };
      }
      return c;
    });

    await addCategories.save();

    res.json({ message: "Категория успешно изменена", error: 0 });
  } catch (e) {
    console.log(e);
    res.json({ message: "Server error", error: 1 });
  }
});
module.exports = router;
