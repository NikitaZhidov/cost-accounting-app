const { Router } = require("express");
const Icons = require("../models/Icons");
const router = Router();

router.get("/get", async (req, res) => {
  try {
    const icons = await Icons.find();

    res.json({ message: "Иконки успешно получены", error: 0, icons });
  } catch (e) {
    res.json({ message: "Server error", error: 1 });
  }
});

module.exports = router;
