module.exports = {
  Query: {
    me: (parent, args, { dataSources }) =>
      dataSources.pooserAPI.findOrCreatePooser(),
    shitique: (parent, { placeId, shitique }, { dataSources }) =>
      dataSources.shitique.findOrCreateShitique({ placeId, shitique }),
    compactShitiquesByPooser: (parent, { pooserId }, { dataSources }) =>
      dataSources.shitique.getCompactShitiquesByPooser({ pooserId }),
    compactShitiquesByShituation: (parent, { placeId }, { dataSources }) =>
      dataSources.shitique.getCompactShitiquesByShituation({ placeId }),
    shituation: (parent, { placeId, shituation }, { dataSources }) =>
      dataSources.shituation.findOrCreateShituation({ placeId, shituation }),
    compactShituationsByArea: (parent, { bounds }, { dataSources }) =>
      dataSources.shituation.getCompactShitiquesByArea({ bounds })
  }
};
