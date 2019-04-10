const express = require("express");
const router = express.Router();
const helpers = require("../../helpers");
let group = [];
router.get("/", async (req, res) => {
  try {
    const DB = await helpers.loadItemCollection();
    res.json(
      await DB.aggregate([
        { $match: { itemTypeDisplayName: "Armor Set" } },
        {
          $lookup: {
            localField: "gearset.itemList",
            foreignField: "_id",
            from: "DestinyInventoryItemDefinition",
            as: "set"
          }
        },
        { $unwind: "$set" },
        {
          $project: {
            "displayProperties.name": 1,
            "set.displayProperties": 1,
            "set.loreeHash": 1,
            "set.hash": 1,
            "set.screenshot": 1,
            "set.itemTypeAndTierDisplayName": 1
          }
        }
      ]).toArray()
    );
  } catch (e) {
    res.status(500).send(`Something broke! ${e}`);
  }
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
