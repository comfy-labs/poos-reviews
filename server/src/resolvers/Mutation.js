// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const { APP_SECRET, getUserId } = require("../utils");

// AKA 'postReview(reviewDetails)'
async function createTurdbit(parent, args, context, info) {
  const turdbit = await prisma.createTurdbit({
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

module.exports = {
  createTurdbit,
};
