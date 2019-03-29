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

async function loadItemCollection() {
  console.log(process.env.DB_URL);
  const client = await mongodb.MongoClient.connect(process.env.DB_URL, {
    useNewUrlParser: true
  });
  return client
    .db(process.env.DB_NAME)
    .collection("DestinyInventoryItemDefinition");
}

module.exports = router;
