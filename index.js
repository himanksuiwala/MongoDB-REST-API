const express = require("express");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const app = express();
const listRoute = require("./routes/list");

var cors = require("cors");
app.use(cors());

const PORT = 3001;
var database;
app.use(express.json());
app.use(listRoute);

MongoClient.connect(
  dotenv.config().parsed.SECRET,
  { useNewUrlParser: true },
  (error, result) => {
    if (error) {
      throw error;
    }
    database = result.db("sample_airbnb");
    console.log("Connection done");
  }
);

app.get("/g", (req, res) => {
  res.status(200).send({
    msg: "HEYA!",
  });
});

app.get("/get/:listing", async (req, res) => {
  const listing_name = req.params.listing;
  try {
    const data = await database
      .collection("listingsAndReviews")
      .findOne({ name: listing_name });
    res.status(201).send(data);
  } catch (e) {
    console.log("NO Data");
  }
});

app.post("/newListing", async (req, res) => {
  const listing = req.body;
  try {
    const data = await database
      .collection("listingsAndReviews")
      .insertOne(listing);
    res.status(200).send({
      remark: "Success",
      id: data.insertedId,
    });
  } catch (e) {
    console.log("Error");
  }
});

app.listen(PORT, () => {
  console.log("Runnin");
});
