const { Schema, model } = require("mongoose");

const Icons = new Schema({
  src: String,
});

module.exports = model("Icons", Icons);
