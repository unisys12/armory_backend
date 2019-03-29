const express = require("express");
const router = express.Router();
const helpers = require("../../helpers");

router.get("/", async (req, res) => {
  const items = await helpers.loadItemCollection();
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

module.exports = router;
