import React from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button/Button";
import DialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import postReview from "../../../../data/apiRequest/graphQLRequest/reviews/postReview";

const styles = theme => {
  return {
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1)
    },
    container: {
      width: "100%"
    }
  };
};

class ReviewConfirmationPage extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    goBack: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    review: PropTypes.shape({
      accessibility: PropTypes.string.isRequired,
      cleanliness: PropTypes.number.isRequired,
      locationLat: PropTypes.number.isRequired,
      locationLng: PropTypes.number.isRequired,
      locationPlaceId: PropTypes.string.isRequired,
      numStalls: PropTypes.number.isRequired,
      privacy: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      reviewText: PropTypes.string.isRequired,
      tpQuality: PropTypes.number.isRequired
    }).isRequired,
    token: PropTypes.string.isRequired
  };

  handleBackClick = () => {
    this.props.goBack();
  };

  handleSubmitClick = () => {
    const { review, token } = this.props;
    postReview(review, token)
      .then(response => {
        console.log("post response: ", response);
      })
      .then(() => {
        this.props.onClose();
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Typography variant="h6" gutterBottom>
          {"Ready to submit?"}
        </Typography>
        {/* buttons */}
        <DialogActions className={classes.buttons}>
          <Button onClick={this.handleBackClick} className={classes.button}>
            Back
          </Button>
          <Button
            autoFocus
            className={classes.button}
            color="primary"
            onClick={this.handleSubmitClick}
            variant="contained"
          >
            Submit
          </Button>
        </DialogActions>
      </div>
    );
  }
}

export default withStyles(styles)(ReviewConfirmationPage);
