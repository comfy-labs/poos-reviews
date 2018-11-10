import React from "react";
import PropTypes from "prop-types";
import debounce from "lodash/debounce";

import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import DialogActions from "@material-ui/core/DialogActions";
import Grid from "@material-ui/core/Grid";
import Grow from "@material-ui/core/Grow";
import LinearProgress from "@material-ui/core/LinearProgress";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import Rater from "../../../rater/rater";

const styles = theme => {
  return {
    button: {
      marginTop: theme.spacing.unit * 3,
      marginLeft: theme.spacing.unit
    },
    buttons: {
      display: "flex",
      justifyContent: "flex-end"
    },
    popper: {
      zIndex: 2
    }
  };
};

const accessibilities = [
  { value: "public", label: "Open to Public" },
  { value: "customers", label: "Customers Only" },
  { value: "private", label: "Privately Owned" }
];

const privacies = [
  { value: 1, label: "Not Private" },
  { value: 2, label: "Kinda Private" },
  { value: 3, label: "Mostly Private" },
  { value: 4, label: "Absolutely Private" }
];

const cleanlinesses = [
  { value: 1, label: "Very Unclean" },
  { value: 2, label: "Not Very Clean" },
  { value: 3, label: "Mostly Clean" },
  { value: 4, label: "Sparkling Clean" }
];

const tpQualities = [
  { value: 1, label: "Poor" },
  { value: 2, label: "Not Good" },
  { value: 3, label: "Good" },
  { value: 4, label: "Great" }
];

class ReviewMetricsPage extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    defaultLocation: PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    }),
    onClose: PropTypes.func.isRequired,
    goForward: PropTypes.func.isRequired,
    onSavePageState: PropTypes.func.isRequired,
    previousState: PropTypes.object
  };

  constructor(props) {
    super();

    // debounce typeahead search queries to the Google Maps Places api
    this.debouncedGetPlacePredictions = debounce(this.getPlacePredictions, 300);

    this.state = props.previousState || {
      accessibility: "",
      cleanliness: "",
      isLocationDropdownOpen: false,
      location: props.defaultLocation || { label: "", value: null },
      locationDropdownOptions: [],
      numStalls: 0,
      privacy: "",
      rating: 0,
      reviewText: "",
      tpQuality: ""
    };
  }

  getField = name => this.state[name];

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
    );
  };

  handleTextFieldChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleLocationChange = event => {
    const searchText = event.target.value;
    this.setState(state => {
      return {
        ...state,
        isLocationDropdownOpen: true,
        location: { label: searchText, value: null }
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

  handleLocationSelect = location => {
    if (this.geocoder) {
      this.getGeocodeFromPlaceId(location.value).then(geolocation => {
        this.setState(state => {
          return {
            ...state,
            isLocationDropdownOpen: false,
            location: {
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
    } else {
      const { Geocoder } = this.props.google.maps;
      this.geocoder = new Geocoder();
      this.getGeocodeFromPlaceId(location.value).then(geolocation => {
        this.setState(state => {
          return {
            ...state,
            isLocationDropdownOpen: false,
            location: {
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
    }
  };

  handleRatingChange = rating => {
    this.setState(state => {
      return { ...state, rating };
    });
  };

  handleToggleRatingDropdown = () => {
    this.setState(state => {
      return {
        ...state,
        isLocationDropdownOpen: !state.isLocationDropdownOpen
      };
    });
  };

  handleCloseClick = () => {
    this.props.onClose();
  };

  handleNextClick = () => {
    this.props.onSavePageState(this.state);
    this.props.goForward();
  };

  render() {
    const { classes, google } = this.props;

    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Write a Review
        </Typography>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Rater
              value={this.getField("rating")}
              max={5}
              onChange={this.handleRatingChange}
            />
          </Grid>
          <Grid item xs={12}>
            <div ref="location" style={{ height: 73 }}>
              {google ? null : <LinearProgress />}
              <TextField
                disabled={!google}
                fullWidth
                id="location"
                InputLabelProps={{ shrink: true }}
                label="Bathroom Location"
                margin="normal"
                onChange={this.handleLocationChange}
                required
                value={this.getField("location").label}
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
                      <ClickAwayListener
                        onClickAway={this.handleToggleRatingDropdown}
                      >
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
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="accessibility"
              InputLabelProps={{ shrink: true }}
              label="Accessibility"
              margin="normal"
              onChange={this.handleTextFieldChange("accessibility")}
              required
              select
              value={this.getField("accessibility")}
              variant="outlined"
            >
              {accessibilities.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="privacy"
              InputLabelProps={{ shrink: true }}
              label="Privacy"
              margin="normal"
              onChange={this.handleTextFieldChange("privacy")}
              required
              select
              value={this.getField("privacy")}
              variant="outlined"
            >
              {privacies.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="numStalls"
              InputLabelProps={{ shrink: true }}
              label="Number of Stalls"
              margin="normal"
              onChange={this.handleTextFieldChange("numStalls")}
              required
              type="number"
              value={this.getField("numStalls")}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="cleanliness"
              InputLabelProps={{ shrink: true }}
              label="Cleanliness"
              margin="normal"
              onChange={this.handleTextFieldChange("cleanliness")}
              required
              select
              value={this.getField("cleanliness")}
              variant="outlined"
            >
              {cleanlinesses.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="tpQuality"
              InputLabelProps={{ shrink: true }}
              label="Toilet Paper Quality"
              margin="normal"
              onChange={this.handleTextFieldChange("tpQuality")}
              required
              select
              value={this.getField("tpQuality")}
              variant="outlined"
            >
              {tpQualities.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="reviewText"
              InputLabelProps={{ shrink: true }}
              label="Review / Description"
              margin="normal"
              multiline
              name="reviewText"
              onChange={this.handleTextFieldChange("reviewText")}
              required
              rows="4"
              variant="outlined"
              value={this.getField("reviewText")}
            />
          </Grid>
        </Grid>
        {/* buttons */}
        <DialogActions className={classes.buttons}>
          <Button onClick={this.handleCloseClick} className={classes.button}>
            Cancel
          </Button>
          <Button
            onClick={this.handleNextClick}
            className={classes.button}
            color="primary"
            autoFocus
            variant="contained"
          >
            Next
          </Button>
        </DialogActions>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(ReviewMetricsPage);
