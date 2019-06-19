const { authQueries } = require('graphql-authentication');

async function shitholes(parent, args, context, info) {
  return context.prisma.shitholes();
}

async function users(parent, args, context, info) {
  return context.prisma.users();
}

async function turdbits(parent, args, context, info) {
  return context.prisma.turdbits();
}

async function shitholeWithName(parent, args, context, info) {
  return context.prisma.shitholes({where: {name_contains: args.name}});
}

async function userTurdbits(parent, args, context, info) {
  return await context.prisma.user({email: args.email}).turdbits();
}

async function usersWithTurdbitsAndShitholes(parent, args, context, info) {
  const fragment = `
  fragment UsersWithTurdbitsAndShitholes on User {
    id
    name
    email 
    turdbits {
      id
      text
    }     
  }
  `;
  return await context.prisma.users().$fragment(fragment);
}

/*
 * City Mike requested these APIs
 */

// // AKA login
// async function login(parent, args, context, info) {
//
// }
//
// // AKA signup
// async function signup(parent, args, context, info) {
//
// }
//
// // AKA logout
// async function logout(parent, args, context, info) {
//
// }

async function currentUser(parent, args, context, info) {
  // Straight-up pass through to graphql-authentication
  return authQueries.currentUser(parent, args, context, info);
}

// AKA getLocations(geolocationSW, geolocationNE)
async function shitholesWithinBoundingBox(parent, args, context, info) {
  /*
   * southWest.lat < lat < northEast.lat
   * southWest.lng < lng < northEast.lng
   */
  return await context.prisma.shitholes(
    { where: { AND: [
          { lat_gte: args.southWestLat },
          { lat_lte: args.northEastLat },
          { lng_gte: args.southWestLng },
          { lng_lte: args.northEastLng }
        ]
      }
    }
  );

}

// AKA getLocation(locationId)
async function shitholeWithId(parent, args, context, info) {
  return await context.prisma.shithole({id: args.id});
}

// AKA getReviews(locationId)
async function turdbitsForShithole(parent, args, context, info) {
  return await context.prisma.shithole({id: args.id}).turdbits();
}

// AKA 'getReview(reviewId)'
async function turdbitWithId(parent, args, context, info) {
  return await context.prisma.turdbit({id: args.id});
}

module.exports = {
  shitholes,
  users,
  turdbits,
  shitholeWithName,
  userTurdbits,
  usersWithTurdbitsAndShitholes,
  // // login,
  // // signup,
  // // logout,
  shitholesWithinBoundingBox,
  shitholeWithId,
  turdbitsForShithole,
  turdbitWithId,
  currentUser,
};
