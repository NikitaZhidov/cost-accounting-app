const { Schema, model } = require("mongoose");

const Costs = new Schema({
  costs: [
    {
      sum: Number,
      GeneralCategory: {
        type: Schema.Types.ObjectId,
        default: null,
        ref: "GeneralCategories",
      },
      AddCategory: {
        type: Schema.Types.ObjectId,
        default: null,
        ref: "AddCategories",
      },
      date: Date,
      comment: String,
    },
  ],
});

module.exports = model("Costs", Costs);
