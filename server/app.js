if (process.env.SystemRoot == "C:\\Windows") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const port = process.env.PORT || 3001;
const ghosts = require("./routes/api/ghosts");
const armor = require("./routes/api/armor");
const weapons = require("./routes/api/weapons");
const sparrows = require("./routes/api/sparrows");
const ships = require("./routes/api/ships");
const ornaments = require("./routes/api/ornaments");
const emblems = require("./routes/api/emblems");
const categories = require("./routes/api/categories");
const armor_sets = require("./routes/api/armor_sets");

// Middleware
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/static/index.html"));
});

app.use("/api/ghosts/", ghosts);
app.use("/api/armor/", armor);
app.use("/api/weapons", weapons);
app.use("/api/sparrows", sparrows);
app.use("/api/ships", ships);
app.use("/api/ornaments", ornaments);
app.use("/api/emblems", emblems);
app.use("/api/categories", categories);
app.use("/api/armor-sets/", armor_sets);

app.listen(port, () =>
  console.log(`Armory backdoor is now open on port ${port}`)
);
