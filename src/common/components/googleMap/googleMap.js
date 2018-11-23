import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import MarkerClusterer from "@google/markerclusterer/src/markerclusterer";
// material-ui
import LinearProgress from "@material-ui/core/LinearProgress";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
// custom
import blueDot from "../../../blue-dot.png";
import toilet from "../../../toilet25.png";
import getLocation from "../../data/deviceRequest/location/getLocation";
import { buildGPSButton, hasCurrentLocationChanged } from "./helpers";

// material-ui css-in-js hoc argument
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
    data: PropTypes.arrayOf(
      PropTypes.shape({
        location: PropTypes.shape({
          lat: PropTypes.number.isRequired,
          lng: PropTypes.number.isRequired
        }).isRequired
      })
    ).isRequired,
    google: PropTypes.object
  };

  constructor() {
    super();
    this.map = null;
    this.state = {
      // default to san francisco ¯\_(ツ)_/¯
      currentLocation: { lat: 37.774929, lng: -122.419418 },
      currentLocationErrors: null,
      isLoading: true
    };
  }

  componentDidUpdate(prevProps, prevState) {
    // create Google Maps instance if google object is available
    if (!this.map && this.props.google) {
      this.buildMap();
      this.setState(state => {
        return { ...state, isLoading: false };
      });
    }

    // update current location marker
    if (
      this.map &&
      hasCurrentLocationChanged(
        prevState.currentLocation,
        this.state.currentLocation
      )
    ) {
      this.buildCurrentLocationMarker();
    }

    // update data markers
    if (this.map) {
      this.buildMarkers();
    }
  }

  buildCurrentLocationMarker = () => {
    // build new marker
    const { Marker } = this.props.google.maps;
    const marker = new Marker({
      icon: blueDot,
      position: this.state.currentLocation,
      title: "Current Location"
    });

    // set marker on map
    marker.setMap(this.map);

    // center the map on the new marker
    this.map.panTo(this.state.currentLocation);
  };

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
    const gpsButton = buildGPSButton(this.handleGPSClick);
    this.map.controls[RIGHT_BOTTOM].push(gpsButton);
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

  buildMarkers = () => {
    const { Marker } = this.props.google.maps;
    const markers = this.props.data.map((review, i) => {
      return new Marker({ icon: toilet, position: review.location });
    });

    /* eslint-disable no-unused-vars */
    const markerCluster = new MarkerClusterer(this.map, markers, {
      imagePath: "http://127.0.0.1:5000/images/toiletCluster/toiletCluster"
    });
    /* eslint-enable no-unused-vars */
  };

  handleGPSClick = () => {
    this.setState(state => ({ ...state, isLoading: true }));

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
    const linearProgressStyle = {
      position: "absolute",
      top: 0,
      width: "100%",
      zIndex: this.state.isLoading ? 1 : 0
    };
    const mapStyle = {
      height: 400,
      position: "absolute",
      top: 0,
      width: "100%"
    };

    return (
      <Paper className={this.props.classes.paper}>
        <div style={linearProgressStyle}>
          <LinearProgress />
        </div>
        <div ref="map" style={mapStyle} />
      </Paper>
    );
  }
}

export default withStyles(styles)(GoogleMap);
