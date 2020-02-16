import React from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import TextField from "@material-ui/core/TextField";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import withStyles from "@material-ui/core/styles/withStyles";

import PooRating from "../../rater/poo-rating";

const styles = theme => {
  return {
    dialog: {
      [theme.breakpoints.down("sm")]: {
        width: window.innerWidth - theme.spacing(12)
      },
      [theme.breakpoints.up("sm")]: {
        width: 600 - theme.spacing(12)
      }
    },
    stepper: {
      padding: `${theme.spacing(3)}px 0 ${theme.spacing(5)}px`
    },
    buttons: {
      display: "flex",
      justifyContent: "flex-end"
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1)
    }
  };
};

class CompleteReviewModal extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.shape({
      accessibility: PropTypes.string.isRequired,
      cleanliness: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      numStalls: PropTypes.string.isRequired,
      privacy: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      reviewText: PropTypes.string.isRequired,
      tpQuality: PropTypes.number.isRequired
    }),
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  };

  static defaultProps = {
    data: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data && this.state.isLoading) {
      this.setState(state => ({ ...state, isLoading: false }));
    }
  }

  render() {
    const { classes, data } = this.props;
    return (
      <Dialog
        aria-labelledby="responsive-dialog-title"
        onClose={this.props.onClose}
        open={this.props.isOpen}
        scroll="paper"
      >
        <div className={classes.dialog}>
          <DialogTitle id="responsive-dialog-title">{data.name}</DialogTitle>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card>
                  <CardMedia
                    component="img"
                    alt={data.name}
                    height="300"
                    image={data.image}
                    title={data.name}
                  />
                </Card>
              </Grid>
              <Grid item xs={12}>
                <PooRating isReadOnly value={data.rating} />
              </Grid>
              <Grid item xs={12}>
                <div ref="location">
                  {this.state.isLoading ? null : <LinearProgress />}
                  <TextField
                    disabled
                    fullWidth
                    id="location"
                    InputLabelProps={{ shrink: true }}
                    label="Bathroom Location"
                    margin="dense"
                    value={data.description}
                    variant="outlined"
                  />
                </div>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  disabled
                  fullWidth
                  id="accessibility"
                  InputLabelProps={{ shrink: true }}
                  label="Accessibility"
                  margin="dense"
                  value={data.accessibility}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  disabled
                  fullWidth
                  id="privacy"
                  InputLabelProps={{ shrink: true }}
                  label="Privacy"
                  margin="dense"
                  value={data.privacy}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  disabled
                  fullWidth
                  id="numStalls"
                  InputLabelProps={{ shrink: true }}
                  label="Number of Stalls"
                  margin="dense"
                  type="number"
                  value={data.numStalls}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  disabled
                  fullWidth
                  id="cleanliness"
                  InputLabelProps={{ shrink: true }}
                  label="Cleanliness"
                  margin="dense"
                  value={data.cleanliness}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  disabled
                  fullWidth
                  id="tpQuality"
                  InputLabelProps={{ shrink: true }}
                  label="Toilet Paper Quality"
                  margin="dense"
                  value={data.tpQuality}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  disabled
                  fullWidth
                  id="reviewText"
                  InputLabelProps={{ shrink: true }}
                  label="Review / Description"
                  margin="dense"
                  multiline
                  name="reviewText"
                  rows="4"
                  value={data.reviewText}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            {/* buttons */}
            <DialogActions className={classes.buttons}>
              <Button onClick={this.props.onClose} className={classes.button}>
                Close
              </Button>
            </DialogActions>
          </DialogContent>
        </div>
      </Dialog>
    );
  }
}

const CompleteReviewModalWithStyles = withStyles(styles)(CompleteReviewModal);
export default withMobileDialog()(CompleteReviewModalWithStyles);
