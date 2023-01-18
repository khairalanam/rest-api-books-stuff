const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = express.Router();
const bookSchema = require("../models/model");

dotenv.config();

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

router.post("/add", function (req, res) {
  const book = new bookSchema({
    bookId: req.body.bookId,
    bookName: req.body.bookName,
    authorName: req.body.authorName,
    lentStatus: req.body.lentStatus,
    lentTo: req.body.lentTo,
    lentOn: req.body.lentOn,
  });

  bookSchema.countDocuments({ bookId: req.body.bookId }, function (err, count) {
    if (count > 0) {
      bookSchema.findOneAndUpdate(
        { bookId: req.body.bookId },
        {
          $set: {
            bookName: req.body.bookName,
            authorName: req.body.authorName,
            lentStatus: req.body.lentStatus,
            lentTo: req.body.lentTo,
            lentOn: req.body.lentOn,
          },
        },
        { new: true },
        (err, books) => {
          if (err) {
            res.send(err);
          } else res.json(books);
        }
      );
    } else {
      book.save((err, books) => {
        if (err) {
          res.send(err);
        }
        res.json(books);
      });
    }
  });
});

router.get("/check/:bookId", (req, res) => {
  bookSchema.find(
    { bookId: req.params.bookId },
    { _id: 0, __v: 0 },
    (err, data) => {
      if (err) {
        res.json(err);
      }
      res.json(data);
    }
  );
});

router.put("/update/:bookId", function (req, res) {
  bookSchema.findOneAndUpdate(
    { bookId: req.body.bookId },
    {
      $set: {
        bookName: req.body.bookName,
        authorName: req.body.authorName,
        lentStatus: req.body.lentStatus,
        lentTo: req.body.lentTo,
        lentOn: req.body.lentOn,
      },
    },
    { new: true },
    (err, books) => {
      if (err) {
        res.send(err);
      } else res.json(books);
    }
  );
});

router.delete("/delete/:bookId", function (req, res) {
  bookSchema.deleteOne({ bookId: req.body.bookId });
});

module.exports = router;
