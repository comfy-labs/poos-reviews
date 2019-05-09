export default function getLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject({
        // @todo: centralize this
        errors: [
          {
            type: "browser",
            message: "Geolocation is not supported by your browser."
          }
        ]
      });
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        resolve({
          data: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy
          }
        });
      },
      () => {
        reject({
          errors: [
            {
              type: "location",
              message: "Unable to retreive your location."
            }
          ]
        });
      }
    );
  });
}
