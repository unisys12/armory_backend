const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

router.get("/:class", async (req, res) => {
  const items = await loadItemCollection();
  res.send(
    await items
      .find(
        {
          classType: resolveClassType(req.params.class)
        },
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

function resolveClassType(classType_id) {
  switch (classType_id) {
    case "hunter":
      return 1;
      break;
    case "warlock":
      return 2;
    case "titan":
      return 0;

    default:
      break;
  }
}

module.exports = router;
