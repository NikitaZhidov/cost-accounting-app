const { Router } = require("express");
const router = Router();

const authMiddleware = require("../middlewares/auth.middleware");

const User = require("../models/User");
const UserCosts = require("../models/UserCosts");
const Costs = require("../models/Costs");

router.post(`/add`, authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;

    const user = await User.findById(req.user.id);
    const userCosts = await UserCosts.findById(user.userCosts);

    const newCosts = new Costs({ costs: [] });
    await newCosts.save();

    userCosts.users.push({ costs: newCosts._id, name });

    await userCosts.save();

    res.json({ message: "Пользователь успешно добавлен", error: 0 });
  } catch (e) {
    res.send({ message: "Server error", error: 1 });
  }
});

router.get("/get", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("userCosts").lean();
    res.json({
      message: "Пользователи успешно получены",
      error: 0,
      users: user.userCosts.users,
    });
  } catch (e) {
    res.send({ message: "Server error", error: 1 });
  }
});

module.exports = router;
