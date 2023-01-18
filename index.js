const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/router.js");
const cors = require("cors");
const rateLimiter = require("./middleware/rateLimiter.js");

mongoose.set("strictQuery", false);

const app = express();

app.use(rateLimiter);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.send("Welcome to Books.");
});

app.use(router);

const port = process.env.PORT || 3001;

app.listen(port, async () => {
  console.log(`Server is running at port ${port}`);
});
