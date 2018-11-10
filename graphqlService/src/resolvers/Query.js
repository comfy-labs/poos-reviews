async function feed(parent, args, context, info) {
  // const where = args.filter
  //   ? {
  //       OR: [
  //         { url_contains: args.filter },
  //         { description_contains: args.filter }
  //       ]
  //     }
  //   : {};
  const where = {};

  const queriedReviews = await context.db.query.reviews(
    { where, skip: args.skip, first: args.first, orderBy: args.orderBy },
    `{ id }`
  );

  const countSelectionSet = `
    {
      aggregate {
        count
      }
    }
  `;
  const reviewsConnection = await context.db.query.reviewsConnection(
    {},
    countSelectionSet
  );

  return {
    count: reviewsConnection.aggregate.count,
    reviewIds: queriedReviews.map(review => review.id)
  };
}

module.exports = { feed };
