import graphQLRequest from "../graphQLRequest";

const endpoint = "https://app.prisma.io/mark-dhillon-d38778/services/prisma-us1/poos-reviews/dev/";

export default function postReview(
  {
    accessibility,
    cleanliness,
    locationLat,
    locationLng,
    locationPlaceId,
    numStalls,
    privacy,
    rating,
    reviewText,
    tpQuality
  },
  token
) {
  const requestOptions = {
    type: "mutation",
    field: "post",
    parameters: {
      accessibility,
      cleanliness,
      locationLat,
      locationLng,
      locationPlaceId,
      numStalls,
      privacy,
      rating,
      reviewText,
      tpQuality
    },
    selections: { id: "id" },
    headers: { Authorization: `Bearer ${token}` }
  };

  return graphQLRequest(endpoint, requestOptions);
}
