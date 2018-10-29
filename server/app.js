const express = require("express");
// const axios = require("axios");

const app = express();
const port = 5000;

// app.get("/", (req, res) => res.send("Hello World!"));
//
// app.get("/maps", (req, res) => {
//   const apiKey = "AIzaSyBo-Jx7q5tVqEhxtKm9AlnWfdTkv3kNUNo";
//   const url = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
//
//   axios
//     .get(url)
//     .then(function(response) {
//       // handle success
//       console.log(response);
//       res.send(response.data);
//     })
//     .catch(function(error) {
//       // handle error
//       console.log(error);
//       res.send(error);
//     });
// });

app.get("/images/toiletCluster/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  res.sendFile(`images/toiletCluster/${imageName}`, { root: __dirname });
});

// start server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
