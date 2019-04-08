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
          itemCategoryHashes: 1
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
        { $and: [{ itemCategoryHashes: 1 }, { _id: id }] },
        { projection: { displayProperties: 1 } }
      )
      .toArray()
  );
});

router.get("/set/:class", async (req, res) => {
  console.log(`${req.baseUrl}/${req.params.class}`);
  res.setHeader(
    "Access-Control-Allow-Origin",
    `${process.env.CORS_ORIGIN_ENDPOINT}`
  );
  const items = await helpers.loadItemCollection();
  res.json(
    await items
      .find(
        {
          itemCategoryHashes: 1,
          classType: helpers.resolveClassType(req.params.class)
        },
        { projection: { displayProperties: 1 } }
      )
      .toArray()
  );
});

module.exports = router;
