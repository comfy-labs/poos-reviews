const express = require("express");
const path = require("path");

const app = express();
const port = 5000;

app.use(express.static(path.join(__dirname, "build")));

// handle route to server toilet clusters
app.get("/images/toiletCluster/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  res.sendFile(`images/toiletCluster/${imageName}`, { root: __dirname });
});

// start server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
