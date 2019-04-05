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
  res.send(
    await items
      .find(
        {
          itemCategoryHashes: 39
        },
        { projection: { displayProperties: 1 } }
      )
      .toArray()
  );
});

router.get("/:id", async (req, res) => {
  const id = JSON.parse(req.params.id);
  console.log(req.baseUrl);
  res.setHeader(
    "Access-Control-Allow-Origin",
    `${process.env.CORS_ORIGIN_ENDPOINT}`
  );
  const items = await helpers.loadItemCollection();
  res.json(
    await items
      .find(
        { $and: [{ itemCategoryHashes: 39 }, { _id: id }] },
        { projection: { displayProperties: 1 } }
      )
      .toArray()
  );
});

module.exports = router;
