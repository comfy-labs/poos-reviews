import graphQLRequest from "../graphQLRequest";

// @todo: centralize this configuration
const endpoint = "https://app.prisma.io/mark-dhillon-d38778/services/prisma-us1/poos-reviews/dev/";

export default function getReviewsByUserId(userId) {
  const requestOptions = {
    type: "query",
    field: "feed",
    parameters: { filter: { user: { id: userId } } },
    selections: {
      reviews: {
        id: "id",
        createdAt: "createdAt",
        accessibility: "accessibility",
        cleanliness: "cleanliness",
        locationLat: "locationLat",
        locationLng: "locationLng",
        locationPlaceId: "locationPlaceId",
        numStalls: "numStalls",
        privacy: "privacy",
        rating: "rating",
        reviewText: "reviewText",
        tpQuality: "tpQuality",
        postedBy: {
          id: "id",
          name: "name",
          email: "email"
        }
      }
    }
  };

  return graphQLRequest(endpoint, requestOptions);
}
