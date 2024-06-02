const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const PORT = 5000;

mongoose.connect("mongodb://127.0.0.1:27017/ems")
 .then(() => {
    console.log("mongodb connection successfully");
  })
 .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.get("/", (req, res) => {
  res.send("from get route");
});

app.listen(PORT, () => {
  console.log(`server running on port... ${PORT}`);
});