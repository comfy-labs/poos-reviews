import axios from "axios";

export default function serverRequest(file) {
  return axios({
    method: "post",
    url: "http://127.0.0.1:5000/upload-dick-pics",
    data: file
  })
    // .post("127.0.0.1:5000/upload-dick-pics", { file })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
}
