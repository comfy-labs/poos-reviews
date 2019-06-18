const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');
const { graphqlAuthenticationConfig } = require('graphql-authentication');
const { GraphqlAuthenticationPrismaAdapter } = require('graphql-authentication-prisma');

const Query  = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');

const resolvers = {
  Query,
  Mutation,
};

// const mailer = new Email({
//   message: {
//     from: 'info@poosreviews.com'
//   },
//   views: {
//     root: path.join(__dirname, 'emails')
//   }
// });

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => ({
    ...request,
    prisma,
  }),
  graphqlAuthentication: graphqlAuthenticationConfig({
    adapter: new GraphqlAuthenticationPrismaAdapter(),
    secret: 'peeisinyourballs',
    // mailer,
    mailAppUrl: 'http://poosreviews.com'
  }),
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
