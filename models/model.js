const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  bookId: {
    type: Number,
    required: true,
  },
  bookName: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  lentStatus: {
    type: String,
    required: true,
  },
  lentTo: {
    type: String,
    required: true,
  },
  lentOn: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("bookSchema", bookSchema);
