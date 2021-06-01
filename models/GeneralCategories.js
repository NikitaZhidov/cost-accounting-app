const { Schema, model } = require("mongoose");

const GeneralCategories = new Schema({
  name: { type: String, unique: true },
  icon: { type: Schema.Types.ObjectId, ref: "Icons" },
});

module.exports = model("GeneralCategories", GeneralCategories);
