const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const tokenArray = req.headers.authorization.split(" ");
    const token = tokenArray[1];

    if (token == "null" || !token) {
      return res.json({
        error: 1,
        message: "Вы не авторизованы",
        isWrongToken: true,
      });
    }
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded;
    next();
  } catch (e) {
    return res.json({ error: 1, message: "Server error", isWrongToken: true });
  }
};
