import graphQLRequest from "../graphQLRequest";

// @todo: centralize this configuration
const endpoint = "http://127.0.0.1:4000/";

export default function getLocationReviews(placeId) {
  const requestOptions = {
    type: "query",
    field: "feed",
    parameters: { filter: { locationPlaceId: placeId } },
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
