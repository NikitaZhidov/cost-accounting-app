const { isValidDate, getDateByLocaleString } = require("../utils/date");

module.exports = (req, res, next) => {
  const { from, to } = req.query;

  const dateCondition = {};

  if (undefined !== from) {
    if (!isValidDate(new Date(from))) {
      return res.json({ error: 1, message: "Invalid field: [from]" });
    }
    dateCondition.$gte = getDateByLocaleString(from);
  }
  if (undefined !== to) {
    if (!isValidDate(new Date(to))) {
      return res.json({ error: 1, message: "Invalid field: [to]" });
    }
    dateCondition.$lte = getDateByLocaleString(to);
  }

  if (!dateCondition.$gte && !dateCondition.$lte) {
    dateCondition.$gte = new Date(0);
  }

  req.dateCondition = dateCondition;

  next();
};
