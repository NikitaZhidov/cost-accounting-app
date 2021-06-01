const { Schema, model } = require("mongoose");

const User = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  userCosts: {
    type: Schema.Types.ObjectId,
    ref: "UserCosts",
  },
  addCategories: {
    type: Schema.Types.ObjectId,
    ref: "AddCategories",
  },
});

module.exports = model("User", User);
