import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Home from "./screens/home/home";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Home />
      </React.Fragment>
    );
  }
}

export default App;
