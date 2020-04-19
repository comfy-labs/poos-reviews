const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const { createStore } = require("./utils");
const resolvers = require("./resolvers");
const PlaceDetailsAPI = require("./data-sources/place-details");
const PooserAPI = require("./data-sources/pooser");
const ShitiqueAPI = require("./data-sources/shitique");
const ShituationAPI = require("./data-sources/shituation");

const store = createStore();

const server = new ApolloServer({
  context: ({ req }) => {
    // To find out the correct arguments for a specific integration,
    // see the `context` option in the API reference for `apollo-server`:
    // https://www.apollographql.com/docs/apollo-server/api/apollo-server/

    // Get the user token from the headers.
    const token = req.headers.authorization || "";

    // try to retrieve a user with the token
    const user = getUser(token);

    // add the user to the context
    return { user };
  },
  dataSources: () => ({
    placeDetailsAPI: new PlaceDetailsAPI(),
    pooserAPI: new PooserAPI({ store }),
    shitiqueAPI: new ShitiqueAPI({ store }),
    shituationAPI: new ShituationAPI({ store })
  }),
  resolvers,
  typeDefs
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
