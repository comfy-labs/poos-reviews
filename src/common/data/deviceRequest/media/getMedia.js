export default function getMedia() {
  return new Promise((resolve, reject) => {
    if (!navigator.mediaDevices.getUserMedia) {
      reject({
        // @todo: centralize this
        errors: [
          {
            type: "browser",
            message: "Your browser does not support this action."
          }
        ]
      });
    }

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(stream => {
        resolve(stream);
      })
      .catch(() => {
        reject({
          errors: [
            {
              type: "media",
              message: "Unable to access your camera."
            }
          ]
        });
      });
  });
}
