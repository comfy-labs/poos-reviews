import { hasLocationChanged } from "../helpers";

describe("<GoogleMap /> helpers", () => {
  describe("hasLocationChanged", () => {
    it("should return true if lat changed", () => {
      const oldLocation = { lat: 37.774929, lng: -122.419418 };
      const newLocation = { lat: 38.111111, lng: -122.419418 };
      expect(hasLocationChanged(oldLocation, newLocation)).toBe(true);
    });
    it("should return true if lng changed", () => {
      const oldLocation = { lat: 37.774929, lng: -122.419418 };
      const newLocation = { lat: 37.774929, lng: -123.111111 };
      expect(hasLocationChanged(oldLocation, newLocation)).toBe(true);
    });
    it("should return true if both lat and lng changed", () => {
      const oldLocation = { lat: 37.774929, lng: -122.419418 };
      const newLocation = { lat: 38.111111, lng: -123.111111 };
      expect(hasLocationChanged(oldLocation, newLocation)).toBe(true);
    });
    it("should return false if both lat and lng are unchanged", () => {
      const oldLocation = { lat: 37.774929, lng: -122.419418 };
      const newLocation = { lat: 37.774929, lng: -122.419418 };
      expect(hasLocationChanged(oldLocation, newLocation)).toBe(false);
    });
  });
});
