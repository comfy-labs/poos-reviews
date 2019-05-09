import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import debounce from "lodash/debounce";
import MarkerClusterer from "@google/markerclusterer/src/markerclusterer";
// material-ui
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import LinearProgress from "@material-ui/core/LinearProgress";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
// custom
import blueDot from "../../../blue-dot.png";
import toilet from "../../../toilet25.png";
import getLocation from "../../data/deviceRequest/location/getLocation";
import {
  buildGPSButton,
  buildSearchThisAreaButton,
  extractBounds,
  isSameLocation
} from "./helpers";

// material-ui css-in-js hoc argument
const styles = theme => ({
  linearProgress: {
    backgroundColor: "#b2dfdb"
  },
  map: {
    height: "100%",
    minHeight: 400,
    marginBottom: theme.spacing.unit * 4,
    position: "relative",
    width: "100%"
  },
  popper: {
    zIndex: 2
  }
});

class GoogleMap extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.string.isRequired,
        location: PropTypes.shape({
          lat: PropTypes.number.isRequired,
          lng: PropTypes.number.isRequired
        }).isRequired
      })
    ).isRequired,
    defaultLocation: PropTypes.shape({
      label: PropTypes.string.isRequired,
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
      placeId: PropTypes.string.isRequired
    }),
    google: PropTypes.object,
    onLocationIconClick: PropTypes.func.isRequired,
    onSearchButtonClick: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.debouncedGetPlacePredictions = debounce(this.getPlacePredictions, 300);
    this.map = null;
    this.state = {
      currentLocation: { lat: 37.774929, lng: -122.419418 }, // default to san francisco ¯\_(ツ)_/¯
      currentLocationErrors: null,
      haveBoundsChanged: false,
      isLoading: true,
      isLocationDropdownOpen: false,
      isMapInitialized: false,
      isShowingSearchButton: false,
      locationDropdownOptions: [],
      selectedLocation: props.defaultLocation || { label: "", value: null }
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.map) {
      if (this.props.google) {
        // create Google Maps instance if google object is available and map not created yet
        this.buildMap();
        this.setState(state => {
          return { ...state, isLoading: false };
        });
      }
    } else {
      // update current location marker
      if (prevState.currentLocation !== this.state.currentLocation) {
        this.buildCurrentLocationMarker();
      }

      if (
        prevState.selectedLocation !== this.state.selectedLocation ||
        prevProps.data !== this.props.data ||
        prevState.isMapInitialized !== this.state.isMapInitialized
      ) {
        // update data markers
        this.buildMarkers();
      }

      // update search button visibility
      if (
        this.searchButton &&
        prevState.isShowingSearchButton !== this.state.isShowingSearchButton
      ) {
        this.searchButton.firstChild.style.visibility = this.state
          .isShowingSearchButton
          ? "visible"
          : "hidden";
      }
    }
  }

  buildCurrentLocationMarker = () => {
    if (this.currentLocationMarker) {
      // remove old marker
      this.currentLocationMarker.setMap(null);
    }

    // build new marker
    const { Marker } = this.props.google.maps;
    this.currentLocationMarker = new Marker({
      icon: blueDot,
      position: this.state.currentLocation,
      title: "Current Location"
    });

    // set marker on map
    this.currentLocationMarker.setMap(this.map);

    // center the map on the new marker
    this.map.panTo(this.state.currentLocation);
  };

  buildMap = () => {
    const {
      event,
      Map,
      ControlPosition: { RIGHT_BOTTOM, TOP_CENTER }
    } = this.props.google.maps;

    // build Google Map instance
    const node = ReactDOM.findDOMNode(this.refs.map);
    const mapConfig = this.buildMapConfig();
    this.map = new Map(node, mapConfig);

    // add event listeners
    this.map.addListener("bounds_changed", this.handleBoundsChange);
    event.addListenerOnce(this.map, "idle", this.handleMapInitialize);
    event.addListener(this.map, "idle", this.handleIdleChange);

    // build GPS button
    const gpsButton = buildGPSButton(this.handleGPSClick);
    this.map.controls[RIGHT_BOTTOM].push(gpsButton);

    // build search button
    const searchButton = buildSearchThisAreaButton(
      this.handleSearchButtonClick
    );
    this.searchButton = searchButton;
    this.map.controls[TOP_CENTER].push(searchButton);
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

  buildMarker = ({ icon, position, title }) => {
    const { Marker } = this.props.google.maps;
    return new Marker({ icon, position, title });
  };

  buildMarkers = () => {
    // remove old markers
    if (this.markerClusterer) {
      this.markerClusterer.clearMarkers();
    }

    // build new markers
    const markers = this.props.data.map((item, i) => {
      const isSelectedLocation = isSameLocation(
        item.location,
        this.state.selectedLocation.value
      );

      // build marker
      const marker = this.buildMarker({
        icon: isSelectedLocation ? undefined : toilet,
        position: item.location,
        title: item.description
      });

      // add click event listener
      marker.addListener("click", () => {
        this.handleLocationIconClick(item);
      });

      return marker;
    });

    // build markerClusterer
    this.markerClusterer = new MarkerClusterer(this.map, markers, {});
  };

  getGeocodeFromPlaceId = placeId => {
    return new Promise((resolve, reject) => {
      this.geocoder.geocode({ placeId }, (results, status) => {
        resolve(results[0].geometry.location);
      });
    });
  };

  getPlacePredictions = searchText => {
    this.autocomplete.getPlacePredictions(
      {
        input: searchText,
        types: ["establishment"]
      },
      (predictions, status) => {
        if (predictions) {
          this.setState(state => {
            const locationDropdownOptions = predictions.map(prediction => {
              return {
                label: prediction.description,
                value: prediction.place_id
              };
            });
            return { ...state, locationDropdownOptions };
          });
        }
      }
    );
  };

  handleBoundsChange = () => {
    if (!this.state.haveBoundsChanged && this.state.isMapInitialized) {
      this.setState(state => ({ ...state, haveBoundsChanged: true }));
    }
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

  handleIdleChange = () => {
    if (this.state.haveBoundsChanged) {
      this.setState(state => ({
        ...state,
        haveBoundsChanged: false,
        isShowingSearchButton: true
      }));
    }
  };

  handleLocationSearchTextChange = event => {
    const searchText = event.target.value;
    this.setState(state => {
      return {
        ...state,
        isLocationDropdownOpen: true,
        selectedLocation: { ...state.selectedLocation, label: searchText }
      };
    });

    if (searchText !== "") {
      if (this.autocomplete) {
        this.debouncedGetPlacePredictions(searchText);
      } else {
        const { AutocompleteService } = this.props.google.maps.places;
        this.autocomplete = new AutocompleteService();
        this.debouncedGetPlacePredictions(searchText);
      }
    }
  };

  handleLocationIconClick = data => {
    this.setState(
      state => {
        return {
          ...state,
          selectedLocation: {
            label: data.description,
            value: data.location
          }
        };
      },
      () => {
        this.props.onLocationIconClick(data);
      }
    );
  };

  handleLocationSelect = location => {
    if (!this.geocoder) {
      const { Geocoder } = this.props.google.maps;
      this.geocoder = new Geocoder();
    }

    this.getGeocodeFromPlaceId(location.value).then(geolocation => {
      this.setState(state => {
        return {
          ...state,
          isLocationDropdownOpen: false,
          selectedLocation: {
            label: location.label,
            value: {
              lat: geolocation.lat(),
              lng: geolocation.lng(),
              placeId: location.value
            }
          }
        };
      });
    });
  };

  handleMapInitialize = () => {
    this.setState(state => ({ ...state, isMapInitialized: true }));
  };

  handleSearchButtonClick = () => {
    const bounds = extractBounds(this.map.getBounds());
    this.props.onSearchButtonClick(bounds);
    this.setState(state => ({ ...state, isShowingSearchButton: false }));
  };

  handleLocationDropdown = () => {
    this.setState(state => {
      return {
        ...state,
        isLocationDropdownOpen: !state.isLocationDropdownOpen
      };
    });
  };

  render() {
    const { classes, google } = this.props;
    const linearProgressStyle = {
      position: "absolute",
      top: 0,
      width: "100%",
      zIndex: this.state.isLoading ? 1 : 0
    };
    const mapStyle = {
      height: "100%",
      minHeight: 400,
      position: "absolute",
      top: 0,
      width: "100%"
    };

    return (
      <React.Fragment>
        <div ref="location" style={{ height: 73 }}>
          <TextField
            disabled={!google}
            fullWidth
            id="location"
            InputLabelProps={{ shrink: true }}
            label="Search"
            margin="normal"
            onChange={this.handleLocationSearchTextChange}
            value={this.state.selectedLocation.label}
            variant="outlined"
          />
        </div>
        {this.state.isLocationDropdownOpen ? (
          <Popper
            className={classes.popper}
            open={this.state.isLocationDropdownOpen}
            anchorEl={this.refs.location}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom"
                }}
              >
                <Paper style={{ width: this.refs.location.offsetWidth }}>
                  <ClickAwayListener onClickAway={this.handleLocationDropdown}>
                    <MenuList>
                      {this.state.locationDropdownOptions.map(option => (
                        <MenuItem
                          key={option.value}
                          onClick={() => {
                            this.handleLocationSelect(option);
                          }}
                          style={{ overflow: "ellipsis" }}
                          value={option.value}
                        >
                          <Typography noWrap variant="inherit">
                            {option.label}
                          </Typography>
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        ) : null}
        <Paper className={this.props.classes.map}>
          <div style={linearProgressStyle}>
            <LinearProgress />
          </div>
          <div ref="map" style={mapStyle} />
        </Paper>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(GoogleMap);
