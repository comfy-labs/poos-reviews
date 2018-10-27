import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import get from "lodash/get";

import LinearProgress from "@material-ui/core/LinearProgress";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";

// custom
import getLocation from "../../data/deviceRequest/location/getLocation";
import img from "../../../blue-dot.png"; // @todo: make sure this works in production mode

const styles = theme => ({
  linearProgress: {
    backgroundColor: "#b2dfdb"
  },
  paper: {
    height: 400,
    marginBottom: theme.spacing.unit * 4,
    position: "relative",
    width: "100%"
  }
});

class GoogleMap extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    google: PropTypes.object
  };

  constructor() {
    super();
    this.map = null;
    this.state = {
      currentLocation: { lat: 37.774929, lng: -122.419418 },
      currentLocationErrors: null,
      isLoading: true
    };
  }

  componentDidMount() {
    if (!this.map && this.props.google) {
      this.buildMap();
      this.setState(state => {
        return { ...state, isLoading: false };
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // create Google Maps instance if google object is available
    if (!this.map && this.props.google) {
      this.buildMap();
      this.setState(state => {
        return { ...state, isLoading: false };
      });
    }

    if (
      this.map &&
      this.hasCurrentLocationChanged(
        prevState.currentLocation,
        this.state.currentLocation
      )
    ) {
      const { Marker } = this.props.google.maps;
      const marker = new Marker({
        icon: img,
        position: this.state.currentLocation,
        title: "Current Location"
      });

      marker.setMap(this.map);
      this.map.panTo(this.state.currentLocation);
    }
  }

  buildMap = () => {
    const {
      Map,
      ControlPosition: { RIGHT_BOTTOM }
    } = this.props.google.maps;

    // build Google Map instance
    const node = ReactDOM.findDOMNode(this.refs.map);
    const mapConfig = this.buildMapConfig();
    this.map = new Map(node, mapConfig);

    // build GPS button
    this.map.controls[RIGHT_BOTTOM].push(this.buildGPSButton());
  };

  buildGPSButton = () => {
    let controlDiv = document.createElement("div");

    let firstChild = document.createElement("button");
    firstChild.style.backgroundColor = "#fff";
    firstChild.style.border = "none";
    firstChild.style.outline = "none";
    firstChild.style.width = "40px";
    firstChild.style.height = "40px";
    firstChild.style.borderRadius = "2px";
    firstChild.style.boxShadow = "0 1px 4px rgba(0,0,0,0.3)";
    firstChild.style.cursor = "pointer";
    firstChild.style.marginRight = "10px";
    firstChild.style.padding = "0";
    firstChild.title = "Your Location";
    controlDiv.appendChild(firstChild);

    let secondChild = document.createElement("div");
    secondChild.style.margin = "10px";
    secondChild.style.width = "20px";
    secondChild.style.height = "20px";
    secondChild.style.backgroundImage =
      "url(https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-2x.png)";
    secondChild.style.backgroundSize = "200px 20px";
    secondChild.style.backgroundPosition = "0 0";
    secondChild.style.backgroundRepeat = "no-repeat";
    firstChild.appendChild(secondChild);

    firstChild.addEventListener("click", this.handleGPSClick);

    controlDiv.index = 1;

    return controlDiv;
  };

  buildMapConfig = () => {
    return {
      center: this.state.currentLocation, // required
      mapTypeControl: false,
      zoom: 13, // required
      zoomControlOptions: {
        style: this.props.google.maps.ZoomControlStyle.SMALL
      }
    };
  };

  hasCurrentLocationChanged(oldLocation, newLocation) {
    return (
      get(oldLocation, "lat") !== get(newLocation, "lat") ||
      get(oldLocation, "lng") !== get(newLocation, "lng")
    );
  }

  handleGPSClick = () => {
    this.setState(state => {
      return { ...state, isLoading: true };
    });

    getLocation()
      .then(response => {
        this.setState(state => {
          const currentLocation = response.data;
          return { ...state, currentLocation, isLoading: false };
        });
      })
      .catch(response => {
        this.setState(state => {
          const currentLocationErrors = response.errors;
          return { ...state, currentLocationErrors, isLoading: false };
        });
      });
  };

  render() {
    return (
      <Paper className={this.props.classes.paper}>
        <div
          style={{
            position: "absolute",
            top: 0,
            width: "100%",
            zIndex: this.state.isLoading ? 1 : 0
          }}
        >
          <LinearProgress />
        </div>
        <div
          ref="map"
          style={{ height: 400, position: "absolute", top: 0, width: "100%" }}
        />
      </Paper>
    );
  }
}

export default withStyles(styles)(GoogleMap);
