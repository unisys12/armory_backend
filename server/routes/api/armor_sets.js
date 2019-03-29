const express = require("express");
const router = express.Router();
const helpers = require("../../helpers");

router.get("/", async (req, res) => {
  const items = await helpers.loadItemCollection();
  res.json(
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

router.get("/:class", async (req, res) => {
  const items = await helpers.loadItemCollection();
  res.json(
    await items
      .find(
        {
          $and: [
            { itemCategoryHashes: 20 },
            { classType: helpers.resolveClassType(req.params.class) }
          ]
        },
        { projection: { displayProperties: 1 } }
      )
      .toArray()
  );
});

module.exports = router;
