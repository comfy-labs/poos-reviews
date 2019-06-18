
async function shitholes(parent, args, context, info) {
  return context.prisma.shitholes();
}

async function poosers(parent, args, context, info) {
  return context.prisma.poosers();
}

async function turdbits(parent, args, context, info) {
  return context.prisma.turdbits();
}

async function shitholeWithName(parent, args, context, info) {
  return context.prisma.shitholes({where: {name_contains: args.name}});
}

async function pooserTurdbits(parent, args, context, info) {
  return await context.prisma.pooser({email: args.email}).turdbits();
}

async function poosersWithTurdbitsAndShitholes(parent, args, context, info) {
  const fragment = `
  fragment PoosersWithTurdbitsAndShitholes on Pooser {
    id
    name
    email 
    turdbits {
      id
      text
    }     
  }
  `;
  return await context.prisma.poosers().$fragment(fragment);
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

// AKA getLocations(geolocationNW, geolocationSE)
async function shitholesWithinBoundingBox(parent, args, context, info) {

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
  poosers,
  turdbits,
  shitholeWithName,
  pooserTurdbits,
  poosersWithTurdbitsAndShitholes,
  // // login,
  // // signup,
  // // logout,
  shitholesWithinBoundingBox,
  shitholeWithId,
  turdbitsForShithole,
  turdbitWithId,
};
