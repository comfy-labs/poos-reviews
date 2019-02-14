const get = require('lodash/get');

function validateBounds(bounds) {
  return get(bounds, 'ne.lat') && get(bounds, 'ne.llng') && get(bounds, 'sw.lat') && get(bounds, 'sw.lng');
}

async function feed(parent, args, context, info) {
  const { filter = {} } = args;
  const filters = [];

  // review-based filters
  if (filter.accessibility) {
    filters.push({ accessibility_in: [filter.accessibility] });
  }
  if (filter.cleanliness) {
    filters.push({ cleanliness_gte: filter.cleanliness });
  }
  if (filter.place && filter.place.placeId) {
    filters.push({ place: { placeId: filter.placeId } });
  }
  if (filter.numStalls) {
    filters.push({ numStalls_gte: filter.numStalls });
  }
  if (filter.privacy) {
    filters.push({ privacy_gte: filter.privacy });
  }
  if (filter.rating) {
    filters.push({ rating_gte: filter.rating });
  }
  if (filter.tpQuality) {
    filters.push({ tpQuality_gte: filter.tpQuality });
  }
  // user-based filters
  if (filter.user && filter.user.id) {
    filters.push({ postedBy: { id: filter.user.id } });
  }

  const where = filters.length ? { AND: filters } : {};
  const queriedReviews = await context.db.query.reviews(
    { where, skip: args.skip, first: args.first, orderBy: args.orderBy },
    `{ id }`
  );

  const countSelectionSet = `{ aggregate { count } } `;
  const reviewsConnection = await context.db.query.reviewsConnection(
    {},
    countSelectionSet
  );

  return {
    count: reviewsConnection.aggregate.count,
    reviewIds: queriedReviews.map(review => review.id)
  };
}

async function places(parent, args, context, info) {
  const { filter = {} } = args;
  const filters = [];

  if (filter.placeId) {
    filters.push({ placeId: filter.placeId });
  }
  if (filter.bounds && validateBounds(filter.bounds)) {
    filters.push(
      { lat_lte: filter.bounds.ne.lat },
      { lat_gte: filter.bounds.sw.lat },
      { lng_lte: filter.bounds.ne.lng },
      { lng_gte: filter.bounds.sw.lng },
    );
  }

  const where = filters.length ? { AND: filters } : {};

  const queriedPlaces = await context.db.query.places(
    { where, skip: args.skip, first: args.first, orderBy: args.orderBy },
    `{ name, lat, lng, placeId }`
  );

  // const averageSelectionSet = `{ aggregate { avg } }`;
  // const placesConnection = await context.db.query.placesConnection(
  //   {},
  //   countSelectionSet
  // );

  return {
    // average: placesConnection.aggregate.count,
    places: queriedPlaces
  };
}

module.exports = { feed, places };
