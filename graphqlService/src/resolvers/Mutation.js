const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, getUserId } = require("../utils");

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);

  const user = await context.db.mutation.createUser(
    {
      data: { ...args, password }
    },
    `{ id }`
  );

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return { token, user };
}

async function login(parent, args, context, info) {
  const user = await context.db.query.user(
    { where: { email: args.email } },
    ` { id password } `
  );
  if (!user) {
    throw new Error("No such user found");
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return { token, user };
}

async function post(parent, args, context, info) {
  const userId = getUserId(context);
  const placeExists = await context.db.exists.Place({
    placeId: args.place.placeId
  });
  const place = placeExists ? {
    placeId: args.place.placeId
  } : {
    name: args.place.name,
    lat: args.place.lat,
    lng: args.place.lng,
    placeId: args.place.placeId
  };

  return context.db.mutation.createReview(
    {
      data: {
        accessibility: args.accessibility,
        cleanliness: args.cleanliness,
        numStalls: args.numStalls,
        place,
        privacy: args.privacy,
        rating: args.rating,
        reviewText: args.reviewText,
        tpQuality: args.tpQuality,
        postedBy: { connect: { id: userId } }
      }
    },
    info
  );
}

async function vote(parent, args, context, info) {
  const userId = getUserId(context);

  const reviewExists = await context.db.exists.Vote({
    user: { id: userId },
    review: { id: args.reviewId }
  });
  if (reviewExists) {
    throw new Error(`Already voted for review: ${args.reviewId}`);
  }

  return context.db.mutation.createVote(
    {
      data: {
        user: { connect: { id: userId } },
        review: { connect: { id: args.reviewId } }
      }
    },
    info
  );
}

module.exports = { signup, login, post, vote };
