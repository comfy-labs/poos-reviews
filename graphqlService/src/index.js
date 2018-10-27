const { GraphQLServer } = require("graphql-yoga");
const { Prisma } = require("prisma-binding");

const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const AuthPayload = require("./resolvers/AuthPayload");
const Subscription = require("./resolvers/Subscription");
const Feed = require("./resolvers/Feed");

/*
 * The resolvers object is the actual implementation of the GraphQL schema.
 * Notice how its structure is identical to the typeDefs structure.
 */

const resolvers = {
  Query,
  Mutation,
  AuthPayload,
  Subscription,
  Feed
};

/*
 * Here we pass in the schema and resolvers into the graphql-yoga GraphQLServer
 * to tell the server what API operations are accepted and how they should be
 * resolved.
 */
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: "src/generated/prisma.graphql",
      endpoint: "https://us1.prisma.sh/michael-stromberg-2f6e83/database/dev",
      secret: "mysecret123",
      debug: true
    })
  })
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
