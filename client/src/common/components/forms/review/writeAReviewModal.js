import React from "react";
import PropTypes from "prop-types";
import get from "lodash/get";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import withStyles from "@material-ui/core/styles/withStyles";

import ReviewMetricsPage from "./pages/reviewMetricsPage";
import ReviewUploadImagesPage from "./pages/reviewUploadImagesPage";
import ReviewConfirmationPage from "./pages/reviewConfirmationPage";

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
      padding: `0 0 ${theme.spacing(1)}px 0`
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

function formatReview(metricsPageState) {
  return {
    accessibility: get(metricsPageState, "accessibility"),
    cleanliness: get(metricsPageState, "cleanliness"),
    locationLat: get(metricsPageState, "location.value.lat"),
    locationLng: get(metricsPageState, "location.value.lng"),
    locationPlaceId: get(metricsPageState, "location.value.placeId"),
    numStalls: get(metricsPageState, "numStalls"),
    privacy: get(metricsPageState, "privacy"),
    rating: get(metricsPageState, "rating"),
    reviewText: get(metricsPageState, "reviewText"),
    tpQuality: get(metricsPageState, "tpQuality")
  };
}

function getActiveStepNumber(currentPage) {
  switch (currentPage) {
    case pageNames.METRICS:
      return 0;
    case pageNames.UPLOAD:
      return 1;
    case pageNames.CONFIRMATION:
      return 2;
    default:
      throw new Error("Page does not exist!");
  }
}

const pageLabels = ["Describe", "Upload", "Confirm"];

const pageNames = {
  METRICS: "METRICS",
  UPLOAD: "UPLOAD",
  CONFIRMATION: "CONFIRMATION"
};

class WriteAReviewModal extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    google: PropTypes.object,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    token: PropTypes.string
  };

  constructor() {
    super();
    this.state = {
      currentPage: pageNames.METRICS,
      [pageNames.METRICS]: null,
      [pageNames.UPLOAD]: null
    };
  }

  getPageState = pageName => this.state[pageName];

  handleBack = pageName => pageState => {
    this.setState(state => {
      return {
        ...state,
        currentPage:
          pageName === pageNames.UPLOAD ? pageNames.METRICS : pageNames.UPLOAD,
        [pageNames.UPLOAD]:
          pageName === pageNames.UPLOAD ? pageState : state[pageNames.UPLOAD]
      };
    });
  };

  handleNext = pageName => pageState => {
    this.setState(state => {
      return {
        ...state,
        currentPage:
          pageName === pageNames.METRICS
            ? pageNames.UPLOAD
            : pageNames.CONFIRMATION,
        [pageNames.METRICS]:
          pageName === pageNames.METRICS ? pageState : state[pageNames.METRICS],
        [pageNames.UPLOAD]:
          pageName === pageNames.UPLOAD ? pageState : state[pageNames.UPLOAD]
      };
    });
  };

  render() {
    const { classes, token } = this.props;

    return (
      <Dialog
        aria-labelledby="responsive-dialog-title"
        onClose={this.props.onClose}
        open={this.props.isOpen}
      >
        <div className={classes.dialog}>
          <DialogTitle id="responsive-dialog-title">
            Review The Poos
          </DialogTitle>
          <DialogContent>
            <React.Fragment>
              <Stepper
                activeStep={getActiveStepNumber(this.state.currentPage)}
                className={classes.stepper}
                alternativeLabel
                orientation="horizontal"
              >
                {pageLabels.map(label => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              {this.state.currentPage === pageNames.METRICS ? (
                <ReviewMetricsPage
                  google={this.props.google}
                  onClose={this.props.onClose}
                  onNext={this.handleNext(pageNames.METRICS)}
                  previousState={this.getPageState(pageNames.METRICS)}
                  token={this.props.token}
                />
              ) : null}
              {this.state.currentPage === pageNames.UPLOAD ? (
                <ReviewUploadImagesPage
                  onBack={this.handleBack(pageNames.UPLOAD)}
                  onNext={this.handleNext(pageNames.UPLOAD)}
                  previousState={this.getPageState(pageNames.UPLOAD)}
                />
              ) : null}
              {this.state.currentPage === pageNames.CONFIRMATION ? (
                <ReviewConfirmationPage
                  onBack={this.handleBack(pageNames.CONFIRMATION)}
                  onClose={this.props.onClose}
                  review={formatReview(this.getPageState(pageNames.METRICS))}
                  token={token}
                />
              ) : null}
            </React.Fragment>
          </DialogContent>
        </div>
      </Dialog>
    );
  }
}

const WriteAReviewModalWithStyles = withStyles(styles)(WriteAReviewModal);
export default withMobileDialog()(WriteAReviewModalWithStyles);
