const SQL = require("sequelize");

module.exports.paginateResults = ({
  after: cursor,
  pageSize = 20,
  results,
  // can pass in a function to calculate an item's cursor
  getCursor = () => null
}) => {
  if (pageSize < 1) return [];

  if (!cursor) return results.slice(0, pageSize);
  const cursorIndex = results.findIndex(item => {
    // if an item has a `cursor` on it, use that, otherwise try to generate one
    let itemCursor = item.cursor ? item.cursor : getCursor(item);

    // if there's still not a cursor, return false by default
    return itemCursor ? cursor === itemCursor : false;
  });

  return cursorIndex >= 0
    ? cursorIndex === results.length - 1 // don't let us overflow
      ? []
      : results.slice(
          cursorIndex + 1,
          Math.min(results.length, cursorIndex + 1 + pageSize)
        )
    : results.slice(0, pageSize);
};

module.exports.createStore = () => {
  const Op = SQL.Op;
  const operatorsAliases = {
    $in: Op.in
  };

  const db = new SQL("database_dev", "username", "password", {
    dialect: "sqlite",
    storage: "./store.sqlite",
    operatorsAliases,
    logging: false
  });

  const poosers = db.define("pooser", {
    id: {
      type: SQL.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    email: SQL.STRING,
    pooserName: SQL.STRING,
    token: SQL.STRING
  });

  const shitiques = db.define("shitique", {
    id: {
      type: SQL.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    accessability: SQL.STRING,
    cleanliness: SQL.STRING,
    description: SQL.STRING,
    image: SQL.STRING,
    name: SQL.STRING,
    numStalls: SQL.STRING,
    placeId: SQL.STRING,
    pooserId: SQL.INTEGER,
    privacy: SQL.STRING,
    rating: SQL.INTEGER,
    reviewText: SQL.STRING,
    shituationId: SQL.INTEGER,
    tpQuality: SQL.INTEGER
  });

  const shituations = db.define("shituation", {
    id: {
      type: SQL.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    averageRating: SQL.DECIMAL,
    lat: SQL.DECIMAL,
    lng: SQL.DECIMAL,
    name: SQL.STRING,
    placeId: SQL.STRING
  });

  return { poosers, shitiques, shituations };
};
