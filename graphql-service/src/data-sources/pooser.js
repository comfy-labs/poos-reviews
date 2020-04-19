const { DataSource } = require("apollo-datasource");
const get = require("lodash/get");
const isEmail = require("isemail");

class PooserAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize(config) {
    this.context = config.context;
  }

  /**
   * User can be called with an argument that includes email, but it doesn't
   * have to be. If the user is already on the context, it will use that user
   * instead
   */
  async findOrCreatePooser({ email: emailArg } = {}) {
    const email = get(this, "context.pooser.email", emailArg);
    if (!email || !isEmail.validate(email)) {
      return null;
    } else {
      const users = await this.store.poosers.findOrCreate({ where: { email } });
      return users && users[0] ? users[0] : null;
    }
  }

  async postShitique({ placeId, shitique }) {
    const pooserId = this.context.pooser.id;
    const response = await this.store.shitiques.findOrCreate({
      where: { pooserId, placeId },
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
            name: shitique.name,
            placeId: shitique.placeId,
            rating: shitique.rating,
            reviewText: shitique.reviewText
          };
        })
      : [];
  }
}

module.exports = PooserAPI;
