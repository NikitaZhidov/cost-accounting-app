const { Router } = require("express");
const router = Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const authMiddleware = require("../middlewares/auth.middleware");

const User = require("../models/User");
const UserCosts = require("../models/UserCosts");
const Costs = require("../models/Costs");
const { check, validationResult } = require("express-validator");

router.post("/login", async (req, res) => {
  try {
    const errMsg = "Неверный email или пароль";

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ message: errMsg, error: 1 });
    }

    const isPassValid = await bcrypt.compare(password, user.password);

    if (!isPassValid) {
      return res.json({ message: errMsg, error: 1 });
    }

    const token = jwt.sign({ id: user.id }, config.get("jwtSecret"), {
      expiresIn: "1h",
    });

    return res.json({
      token,
      error: 0,
      message: "Вы успешно авторизованы",
      user: {
        id: user.id,
        nickname: user.nickname,
      },
    });
  } catch (e) {
    console.log(e);
    res.json({ message: "Server error", error: 1 });
  }
});

router.get("/login", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });

    if (!user || !user.id) {
      return res.json({
        error: 1,
        message:
          "Ошибка авторизации, нет такого пользователя, зарегистрируйтесь или авторизуйтесь заного",
      });
    }

    const token = jwt.sign({ id: user.id }, config.get("jwtSecret"), {
      expiresIn: "1h",
    });

    return res.json({
      token,
      error: 0,
      message: "Вы успешно авторизованы",
      user: {
        id: user.id,
        nickname: user.nickname,
      },
    });
  } catch (e) {
    console.log(e);
    res.json({ message: "Server error", error: 1 });
  }
});

router.post(
  "/register",
  [
    check("email", "Некорретный email").isEmail(),
    check(
      "password",
      "Длина пароля должна быть не менее 4 и не более 30 символов"
    ).isLength({ min: 4, max: 30 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.json({
          message: errors
            .array()
            .map((err) => err.msg)
            .join(" "),
          error: 1,
        });
      }
      const { email, password, nickname } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.json({
          message: "Пользователь с таким email уже существует",
          error: 1,
        });
      }

      const hashPassword = await bcrypt.hash(password, 8);

      const costs = new Costs({ costs: [] });
      await costs.save();

      const usersCosts = new UserCosts({ users: [] });

      usersCosts.users.push({ costs: costs._id, name: "Общие" });
      await usersCosts.save();

      const user = new User({
        email,
        nickname,
        password: hashPassword,
        userCosts: usersCosts._id,
      });
      await user.save();

      return res.json({ message: "Регистрация прошла успешно", error: 0 });
    } catch (e) {
      console.log(e);
      return res.json({ message: "Server error", error: 1 });
    }
  }
);

module.exports = router;
