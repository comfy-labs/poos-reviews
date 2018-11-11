import graphQLRequest from "../graphQLRequest";

const endpoint = "http://127.0.0.1:4000/";

export default function postReview({
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
}) {
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
    selections: { id: "id" }
  };

  return graphQLRequest(endpoint, requestOptions);
}
