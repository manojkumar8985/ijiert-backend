const mongoose = require("mongoose");

const paperSchema = new mongoose.Schema({
  title: String,
  authors: String,
  area: String,
  paperId: String,
  pages: String,
  pdf: String,
}, { timestamps: true });

module.exports = mongoose.model("Paper", paperSchema);
