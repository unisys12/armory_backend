const express = require("express");
const router = express.Router();
const helpers = require("../../helpers");

router.get("/", async (req, res) => {
  console.log(req.baseUrl);
  res.setHeader(
    "Access-Control-Allow-Origin",
    `${process.env.CORS_ORIGIN_ENDPOINT}`
  );
  const items = await helpers.loadItemCollection();
  res.json(
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
  console.log(`${req.baseUrl}/${req.params.class}`);
  res.setHeader(
    "Access-Control-Allow-Origin",
    `${process.env.CORS_ORIGIN_ENDPOINT}`
  );
  const id = JSON.parse(req.params.id);
  const items = await helpers.loadItemCollection();
  res.json(
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
