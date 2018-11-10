function newReviewSubscribe(parent, args, context, info) {
  return context.db.subscription.review(
    { where: { mutation_in: ["CREATED"] } },
    info
  );
}

const newReview = { subscribe: newReviewSubscribe };

function newVoteSubscribe(parent, args, context, info) {
  return context.db.subscription.vote(
    { where: { mutation_in: ["CREATED"] } },
    info
  );
}

const newVote = { subscribe: newVoteSubscribe };

module.exports = { newReview, newVote };
