const { DataSource } = require("apollo-datasource");
const { Op } = require("sequelize");
const get = require("lodash/get");

class ShitiqueAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  initialize(config) {
    this.context = config.context;
  }

  async findOrCreateShitique({ placeId, shitique } = {}) {
    const pooserId = this.context.pooser.id;
    const response = await this.store.shitiques.findOrCreate({
      where: { placeId, pooserId },
      defaults: { ...shitique }
    });
    return get(response, "[0]", false);
  }

  async getCompactShitiquesByPooser() {
    const pooserId = this.context.pooser.id;
    const shitiques = await this.store.shitiques.findAll({
      where: { pooserId }
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

  async getCompactShitiquesByShituation({ placeId }) {
    const shitiques = await this.store.shitiques.findAll({
      where: { placeId }
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

module.exports = ShitiqueAPI;
