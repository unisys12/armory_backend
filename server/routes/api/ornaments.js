const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

router.get("/", async (req, res) => {
  const items = await loadItemCollection();
  console.log(req.baseUrl);
  res.send(
    await items
      .find(
        {
          itemCategoryHashes: 56
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
        { $and: [{ itemCategoryHashes: 56 }, { _id: id }] },
        { projection: { displayProperties: 1 } }
      )
      .toArray()
  );
});

async function loadItemCollection() {
  const client = await mongodb.MongoClient.connect(process.env.DB_URL, {
    useNewUrlParser: true
  });
  return client
    .db(process.env.DB_NAME)
    .collection("DestinyInventoryItemDefinition");
}

module.exports = router;
