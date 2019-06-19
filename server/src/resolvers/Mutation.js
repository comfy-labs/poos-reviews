const { authMutations} = require('graphql-authentication');

// AKA 'postReview(reviewDetails)'
async function createTurdbit(parent, args, context, info) {
  const turdbit = await context.prisma.createTurdbit({
    accessibility: args.accessibility,
    cleanliness: args.cleanliness,
    stalls: args.stalls,
    privacy: args.privacy,
    text: args.text,
    tpQuality: args.tpQuality,
    overall: args.overall,
    author: {
      connect: {
        id: args.pooser.id
      }
    },
    shithole: {
      connect: {
        id: args.shithole.id
      }
    }
  });
  return turdbit.id;
}

// Straight-up passthroughs to graphql-authentication
async function signupByInvite(parent, args, context, info) {
  return authMutations.signupByInvite(parent, args, context);
}

async function signup(parent, args, context, info) {
  return authMutations.signup(parent, args, context);
}

async function confirmEmail(parent, args, context, info) {
  return authMutations.confirmEmail(parent, args, context);
}

async function login(parent, args, context, info) {
  return authMutations.login(parent, args, context);
}

async function changePassword(parent, args, context, info) {
  return authMutations.changePassword(parent, args, context);
}

async function updateCurrentUser(parent, args, context, info) {
  return authMutations.updateCurrentUser(parent, args, context);
}

async function triggerPasswordReset(parent, args, context, info) {
  return authMutations.triggerPasswordReset(parent, args, context);
}

module.exports = {
  createTurdbit,
  signupByInvite,
  signup,
  confirmEmail,
  login,
  changePassword,
  updateCurrentUser,
  triggerPasswordReset,
};
