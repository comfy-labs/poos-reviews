import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import get from "lodash/get";
import MarkerClusterer from "@google/markerclusterer/src/markerclusterer";
import Script from "react-load-script";
// material-ui
import LinearProgress from "@material-ui/core/LinearProgress";
import Paper from "@material-ui/core/Paper";
import SearchBar from "material-ui-search-bar";

import { withStyles } from "@material-ui/core/styles";
// custom
import getLocation from "../../data/deviceRequest/location/getLocation";
// @todo: make sure these work in production mode
import blueDot from "../../../blue-dot.png";
import toilet from "../../../toilet25.png";
import getLocationReviews from "../../data/apiRequest/graphQLRequest/reviews/getLocationReviews";

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
    google: PropTypes.object,
    locationConsent: PropTypes.bool,
    currentLocationMarker: PropTypes.object,
    query: PropTypes.string,
    mapBounds: PropTypes.object

  };

  constructor(props) {
    super(props);
    this.map = null;
    this.state = {
      currentLocation: { lat: null, lng: null},
      currentLocationErrors: null,
      isLoading: true
    };

    // this.handleScriptLoad = this.handleScriptLoad.bind(this);
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
  }

  componentDidMount() {
    if (!this.map && this.props.google) {
      this.setState(state => {
        return { ...state, isLoading: false };
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // create Google Maps instance if google object is available
    if (!this.map && this.props.google && this.props.locationConsent) {
      /*global google*/
      var options = { types: ["establishment"] };
      this.autocomplete = new google.maps.places.Autocomplete(
          document.getElementById("autocomplete"),
          options
      );
      this.autocomplete.addListener("place_changed", this.handlePlaceSelect);
      this.buildMap();
    }
  }

  checkCurrentMapForReviewedLocations = () => {
    let mapBounds = this.state.mapBounds;
    console.log('Checking for currently reviewed locations');
    getLocationReviews("ChIJVSvIaJiAhYARwg6LgKkXkB0").then(response => {
        response.feed.reviews.forEach(function(f){
            console.log(f);
            let latLng = {lat: f.locationLat, lng: f.locationLng};
            console.log(mapBounds.contains(latLng));
        });
    });
  };

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

    // Grab the DOM element to put the map in
    const node = ReactDOM.findDOMNode(this.refs.map);
    let component = this;
    getLocation()
      .then(response => {
          console.log("Current location promise succeeded");
          component.state.currentLocation = response.data;
          const mapConfig = component.buildMapConfig();
          component.map = new Map(node, mapConfig);
          google.maps.event.addListener(component.map, "bounds_changed", function() {
              component.setState(state => {
                return { ...state, mapBounds: component.map.getBounds(), isLoading: false};
              });
              component.checkCurrentMapForReviewedLocations();
          });
          component.map.controls[RIGHT_BOTTOM].push(component.buildGPSButton());
          var circle = new google.maps.Circle({
              center: response.data,
              radius: response.data.accuracy
          });
          component.autocomplete.setBounds(circle.getBounds());
          const blueDotMarker = this.createMarkerForCurrentLocation(response.data);
          component.setState(state => {
              return { ...state, isLoading: false, currentLocationMarker: blueDotMarker};
          });
      })
      .catch(response => {

      });
  };

  createMarkerForCurrentLocation = (locationData) => {
      return new google.maps.Marker({
          position: locationData,
          map: this.map,
          icon: blueDot
      });
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

    let firstChild = document.createElement("");
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
        this.map.panTo(response.data);
        let blueDotMarker = this.state.currentLocationMarker;
        if (this.hasCurrentLocationChanged(this.state.currentLocation, response.data)) {
          this.state.currentLocationMarker.setMap(null);
          blueDotMarker = this.createMarkerForCurrentLocation(response.data);
        }
        this.setState(state => {
          const currentLocation = response.data;
          return { ...state, currentLocation, currentLocationMarker: blueDotMarker, isLoading: false };
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
  };

  handlePlaceSelect() {
    let addressObject = this.autocomplete.getPlace();
    // For some reason, the query after selecting shows just what you typed in, but not what you selected
    // So, this reconstructs it kinda and sets it
    let selectedQuery = addressObject.name + ', ' + addressObject.formatted_address;
    let lat = addressObject.geometry.location.lat();
    let lng = addressObject.geometry.location.lng();
    let geolocation = { lat: lat, lng: lng };
    var marker = new google.maps.Marker({
      position: geolocation,
      map: this.map,
    });
    this.map.panTo(geolocation);
    this.setState(state => {
      return { ...state, selectedQuery};
    });
  }

  render() {
    const shouldQueryLocation = this.props.locationConsent;
    if (shouldQueryLocation) {
    return (
      <React.Fragment>
        <div>
          <SearchBar
            id="autocomplete"
            value={this.state.selectedQuery}
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
    } else {
      return (
          <div></div>
      );
    }
  }
}

export default withStyles(styles)(GoogleMap);
