const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

router.get("/", async (req, res) => {
  const items = await loadItemCollection();
  res.send(
    await items
      .find(
        {
          itemCategoryHashes: 20
        },
        { projection: { displayProperties: 1 } }
      )
      .toArray()
  );
});

router.get("/:id", async (req, res) => {
  const id = JSON.parse(req.params.id);
  const items = await loadItemCollection();
  res.send(
    await items
      .find(
        { $and: [{ itemCategoryHashes: 20 }, { _id: id }] },
        { projection: { displayProperties: 1 } }
      )
      .toArray()
  );
});

async function loadItemCollection() {
  const client = await mongodb.MongoClient.connect(
    "mongodb://localhost:27017",
    { useNewUrlParser: true }
  );
  return client.db("Local_Armory").collection("DestinyInventoryItemDefinition");
}

module.exports = router;
