const mongodb = require("mongodb");

module.exports = {
  resolveClassType: classType_id => {
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
  },
  loadItemCollection: async () => {
    const client = await mongodb.MongoClient.connect(process.env.DB_URL, {
      useNewUrlParser: true
    });
    return client
      .db(process.env.DB_NAME)
      .collection("DestinyInventoryItemDefinition");
  }
};
