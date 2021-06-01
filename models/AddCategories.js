const { Schema, model } = require("mongoose");

const AddCategories = new Schema({
  categories: [
    {
      name: { type: String },
      icon: { type: Schema.Types.ObjectId, ref: "Icons" },
    },
  ],
});

module.exports = model("AddCategories", AddCategories);
