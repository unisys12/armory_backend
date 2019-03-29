const express = require("express");
const helpers = require("../../helpers");

const router = express.Router();

router.get("/:class", async (req, res) => {
  const items = await helpers.loadItemCollection();
  res.json(
    await items
      .find(
        {
          classType: helpers.resolveClassType(req.params.class)
        },
        { projection: { displayProperties: 1 } }
      )
      .toArray()
  );
});

module.exports = router;
