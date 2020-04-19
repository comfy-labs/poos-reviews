const { DataSource } = require("apollo-datasource");
const { Op } = require("sequelize");
const get = require("lodash/get");

class ShituationAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  initialize(config) {
    this.context = config.context;
  }

  async findOrCreateShituation({ placeId, shituation } = {}) {
    const response = await this.store.shituations.findOrCreate({
      where: { placeId },
      defaults: { ...shituation }
    });
    return get(response, "[0]", false);
  }

  async getCompactShituationsByArea({ bounds }) {
    const shitiques = await this.store.shituations.findAll({
      where: {
        lat: { [Op.between]: [bounds.sw.lat, bounds.ne.lat] },
        lng: { [Op.between]: [bounds.sw.lng, bounds.ne.lng] }
      }
    });
    return shitiques && shitiques.length
      ? shitiques.map(shitique => {
          return {
            id: shitique.id,
            name: shitique.name,
            placeId: shitique.placeId,
            rating: shitique.rating,
            reviewText: shitique.reviewText
          };
        })
      : [];
  }
}

module.exports = ShituationAPI;
