const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;
const port = process.env.PORT || 3001;
const ghosts = require("./routes/api/ghosts");
const armor = require("./routes/api/armor");
const weapons = require("./routes/api/weapons");
const sparrows = require("./routes/api/sparrows");
const ships = require("./routes/api/ships");
const ornaments = require("./routes/api/ornaments");
const emblems = require("./routes/api/emblems");
const categories = require("./routes/api/categories");

// Middleware
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Destiny Armory Defined API!");
});

app.use("/api/ghosts/", ghosts);
app.use("/api/armor/", armor);
app.use("/api/weapons", weapons);
app.use("/api/sparrows", sparrows);
app.use("/api/ships", ships);
app.use("/api/ornaments", ornaments);
app.use("/api/emblems", emblems);
app.use("/api/categories", categories);

app.listen(port, () =>
  console.log(`Armory backdoor is now open on port ${port}`)
);
