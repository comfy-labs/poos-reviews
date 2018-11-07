import React from "react";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
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
    onClose: PropTypes.func.isRequired,
    goForward: PropTypes.func.isRequired,
    onSavePageState: PropTypes.func.isRequired,
    previousState: PropTypes.object
  };

  constructor(props) {
    super();
    this.state = props.previousState || {
      accessibility: "",
      cleanliness: "",
      geolocation: null,
      numStalls: 0,
      privacy: "",
      rating: 0,
      reviewText: "",
      tpQuality: ""
    };
  }

  getField = name => this.state[name];

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleRatingChange = rating => {
    this.setState(state => {
      return { ...state, rating };
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
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Write a Review
        </Typography>
        <Grid container spacing={24}>
          {/*<Grid item xs={12}>
              <TextField
                defaultValue={this.getField("geolocation")}
                fullWidth
                id="geolocation"
                inputProps={{ onBlur: this.handleChange("geolocation") }}
                label="Bathroom Location"
                margin="normal"
                name="geolocation"
                required
              />
            </Grid>*/}
          <Grid item xs={12}>
            <Rater
              value={this.getField("rating")}
              max={5}
              onChange={this.handleRatingChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="accessibility"
              InputLabelProps={{ shrink: true }}
              label="Accessibility"
              margin="normal"
              onChange={this.handleChange("accessibility")}
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
              onChange={this.handleChange("privacy")}
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
              onChange={this.handleChange("numStalls")}
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
              onChange={this.handleChange("cleanliness")}
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
              onChange={this.handleChange("tpQuality")}
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
              label="Review / Description"
              margin="normal"
              multiline
              name="reviewText"
              onChange={this.handleChange("reviewText")}
              required
              rows="4"
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
