const { Schema, model } = require("mongoose");

const UserCosts = new Schema({
  users: [
    {
      costs: { type: Schema.Types.ObjectId, ref: "Costs" },
      name: { type: String, required: true },
    },
  ],
});

module.exports = model("UserCosts", UserCosts);
