const { RESTDataSource } = require("apollo-datasource-rest");
const { placeDetailsStatusCodes } = require("../enums/google-apis");

const URL = "https://maps.googleapis.com/maps/api/place/details/json";

class PlaceDetailsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = URL;
  }

  willSendRequest(request) {
    request.params.set("key", "AIzaSyBo-Jx7q5tVqEhxtKm9AlnWfdTkv3kNUNo");
    // request.params.set('api_key', this.context.token);
  }

  async getPlaceDetailsById(placeId) {
    const response = await this.get("", {
      place_id: placeId,
      fields: "geometry,name,place_id,types"
      // @todo: add sessiontoken?
    });
    return response.status === placeDetailsStatusCodes.OK
      ? this.placeDetailsReducer(response.result)
      : {};
  }

  placeDetailsReducer(result) {
    return {
      lat: result.geometry.location.lat,
      lng: result.geometry.location.lng,
      name: result.name,
      placeId: result.place_id,
      types: result.types
    };
  }
}

module.exports = PlaceDetailsAPI;
