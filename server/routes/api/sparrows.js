const express = require("express");
const router = express.Router();
const helpers = require("../../helpers");

router.get("/", async (req, res) => {
  const items = await helpers.loadItemCollection();
  res.json(
    await items
      .find(
        {
          itemCategoryHashes: 43
        },
        { projection: { displayProperties: 1 } }
      )
      .toArray()
  );
});

router.get("/:id", async (req, res) => {
  const id = JSON.parse(req.params.id);
  const items = await helpers.loadItemCollection();
  res.json(
    await items
      .find(
        { $and: [{ itemCategoryHashes: 43 }, { _id: id }] },
        { projection: { displayProperties: 1 } }
      )
      .toArray()
  );
});

module.exports = router;
