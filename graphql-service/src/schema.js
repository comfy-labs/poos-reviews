const { gql } = require("apollo-server");

const typeDefs = gql`
  type Pooser {
    id: ID!
    email: String!
    pooserName: String!
  }

  extend type Pooser {
    shitiques: [Shitique]!
  }

  type Shitique {
    id: ID!
    accessibility: String!
    cleanliness: String!
    description: String!
    image: String
    name: String!
    numStalls: String!
    placeId: String!
    pooser: Pooser!
    privacy: String!
    rating: Int!
    reviewText: String!
    tpQuality: Int!
  }

  extend type Shitique {
    shituation: Shituation!
  }

  type Shituation {
    id: ID!
    averageRating: Float
    lat: Float!
    lng: Float!
    name: String!
    placeId: String!
    types: [String]
  }

  extend type Shituation {
    shitiques: [Shitique]!
  }

  type Query {
    me: Pooser
    shitique(id: ID!): Shitique
    compactShitiquesByPooser(pooserId: ID!): [Shitique]!
    compactShitiquesByShituation(placeId: String!): [Shitique]!
    shituation(placeId: String!): Shituation
    compactShituationsByArea(bounds: SearchBounds): [Shituation]!
  }

  type Mutation {
    logIn(email: String!): String
    postShitique(
      pooserName: String!
      placeId: String!
      accessibility: String!
      cleanliness: String!
      description: String!
      image: String
      name: String!
      numStalls: String!
      privacy: String!
      rating: Int!
      reviewText: String!
      tpQuality: Int!
    ): ShitiquePostResponse
    signUp(email: String!, pooserName: String!): String
  }

  input LatLng {
    lat: Float!
    lng: Float!
  }

  input SearchBounds {
    ne: LatLng!
    sw: LatLng!
  }

  type ShitiquePostResponse {
    success: Boolean!
    message: String
    shitiquesForPooser: [Shitique]!
    shitiquesForShituation: [Shitique]!
  }
`;

module.exports = typeDefs;
