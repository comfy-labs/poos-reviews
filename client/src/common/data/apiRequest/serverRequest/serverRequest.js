import axios from "axios";

export default function serverRequest(file) {
  return axios
    .post("/image", { file })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
}
