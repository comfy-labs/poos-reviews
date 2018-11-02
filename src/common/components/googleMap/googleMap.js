import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import get from "lodash/get";
import MarkerClusterer from "@google/markerclusterer/src/markerclusterer";
import Script from "react-load-script"

// material-ui
import LinearProgress from "@material-ui/core/LinearProgress";
import Paper from "@material-ui/core/Paper";
import SearchBar from 'material-ui-search-bar'


import { withStyles } from "@material-ui/core/styles";

// custom
import getLocation from "../../data/deviceRequest/location/getLocation";
// @todo: make sure these work in production mode
import blueDot from "../../../blue-dot.png";
import toilet from "../../../toilet25.png";

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

  constructor(props) {
    super(props);
    this.map = null;
    this.state = {
      currentLocation: { lat: 37.774929, lng: -122.419418 },
      currentLocationErrors: null,
      isLoading: true
    };

    this.handleScriptLoad = this.handleScriptLoad.bind(this);
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
    this.handleFocusChange = this.handleFocusChange.bind(this);
  }

  componentDidMount() {
      console.log('MOUNT!');
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

    // update current location marker
    if (this.map && prevState.currentLocation !== this.state.currentLocation) {
      this.buildCurrentLocationMarker();
    }

    // update data markers
    if (this.map) {
      this.buildMarkers();
    }
  }

  buildCurrentLocationMarker = () => {
    const { Marker } = this.props.google.maps;
    const marker = new Marker({
      icon: blueDot,
      position: this.state.currentLocation,
      title: "Current Location"
    });

    marker.setMap(this.map);
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
    this.map.controls[RIGHT_BOTTOM].push(this.buildGPSButton());
    console.log('MAP BUILT!');
    this.setMapToCurrentLocation();
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

  setMapToCurrentLocation = () => {
      let autocomplete = this.autocomplete;
      let map = this.map;
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
              var geolocation = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
              };
              var circle = new google.maps.Circle({
                  center: geolocation,
                  radius: position.coords.accuracy
              });
              autocomplete.setBounds(circle.getBounds());
              map.panTo({lat: position.coords.latitude, lng: position.coords.longitude});
          });
      }
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

  handleInputChange = event => {
      this.setState({ inputValue: event.target.value });
      console.log('wahhhhh');
  };

  handleFocusChange = event => {
      console.log('focusssss');
  };

    handleScriptLoad() {
      var options = {types: ['geocode']};
      /*global google*/
      this.autocomplete = new google.maps.places.Autocomplete(
          document.getElementById('autocomplete'),
          options);
        this.autocomplete.addListener('place_changed',this.handlePlaceSelect);
      console.log('SCRIPT LOADED!');
    }

    handlePlaceSelect() {
        console.log('HANNLE');
        let addressObject = this.autocomplete.getPlace();
        let lat = addressObject.geometry.location.lat();
        let lng = addressObject.geometry.location.lng();
    }


  render() {
    return (

        <React.Fragment>
          <div>
            <Script
                url="https://maps.googleapis.com/maps/api/js?key=AIzaSyBGc7C0LtRisG8VxJQonWDh-sL5GIoXYJU&libraries=places"
                onLoad={this.handleScriptLoad}
            />
            <SearchBar
                id="autocomplete"
                value={this.state.value}
                onFocus={this.handleFocusChange}
                onChange={(newValue) => this.setState({ value: newValue })}
            />
          </div>
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
        </React.Fragment>
    );
  }
}

export default withStyles(styles)(GoogleMap);
