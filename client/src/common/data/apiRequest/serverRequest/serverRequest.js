import axios from "axios";

export default function serverRequest(file) {
  const formData = new FormData();
  formData.append("image", file);

  return axios
    .post("http://127.0.0.1:5000/upload", formData)
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
}
