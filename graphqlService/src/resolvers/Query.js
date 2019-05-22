
async function shitholes_resolver(parent, args, context, info) {
    return await context.db.query.shitholes();
};

module.exports = { shitholes };


// async function feed(parent, args, context, info) {
//   const { filter = {} } = args;
//   const filters = [];
//
//   // review-based filters
//   if (filter.accessibility) {
//     filters.push({ accessibility_in: [filter.accessibility] });
//   }
//   if (filter.cleanliness) {
//     filters.push({ cleanliness_gte: filter.cleanliness });
//   }
//   if (filter.locationPlaceId) {
//     filters.push({ locationPlaceId_contains: filter.locationPlaceId });
//   }
//   if (filter.numStalls) {
//     filters.push({ numStalls_gte: filter.numStalls });
//   }
//   if (filter.privacy) {
//     filters.push({ privacy_gte: filter.privacy });
//   }
//   if (filter.rating) {
//     filters.push({ rating_gte: filter.rating });
//   }
//   if (filter.tpQuality) {
//     filters.push({ tpQuality_gte: filter.tpQuality });
//   }
//   // user-based filters
//   if (filter.user && filter.user.id) {
//     filters.push({ postedBy: { id: filter.user.id } });
//   }
//
//   const where = filters.length ? { OR: filters } : {};
//
//   // const where = args.filter
//   //   ? {
//   //       OR: [
//   //         { url_contains: args.filter },
//   //         { description_contains: args.filter }
//   //       ]
//   //     }
//   //   : {};
//
//   const queriedReviews = await context.db.query.reviews(
//     { where, skip: args.skip, first: args.first, orderBy: args.orderBy },
//     `{ id }`
//   );
//
//   const countSelectionSet = `
//     {
//       aggregate {
//         count
//       }
//     }
//   `;
//   const reviewsConnection = await context.db.query.reviewsConnection(
//     {},
//     countSelectionSet
//   );
//
//   return {
//     count: reviewsConnection.aggregate.count,
//     reviewIds: queriedReviews.map(review => review.id)
//   };
// }
//
// module.exports = { feed };
