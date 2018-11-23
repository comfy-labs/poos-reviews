import React from "react";
import PropTypes from "prop-types";
import get from "lodash/get";

// import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import withStyles from "@material-ui/core/styles/withStyles";

import Wizard, {
  WizardPage
} from "../../../../common/components/wizard/wizard";
import ReviewMetricsPage from "./pages/reviewMetricsPage";
import ReviewUploadImagesPage from "./pages/reviewUploadImagesPage";
import ReviewConfirmationPage from "./pages/reviewConfirmationPage";

const styles = theme => {
  return {
    dialog: {
      [theme.breakpoints.down("sm")]: {
        width: window.innerWidth - theme.spacing.unit * 12
      },
      [theme.breakpoints.up("sm")]: {
        width: 600 - theme.spacing.unit * 12
      }
    },
    stepper: {
      padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`
    },
    buttons: {
      display: "flex",
      justifyContent: "flex-end"
    },
    button: {
      marginTop: theme.spacing.unit * 3,
      marginLeft: theme.spacing.unit
    }
  };
};

const pages = ["Describe", "Upload", "Confirm"];

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
      metricsPage: null,
      uploadImagesPage: null
    };
  }

  getPageState = pageName => this.state[pageName];

  setPageState = pageName => newPageState => {
    this.setState(state => {
      return { ...state, [pageName]: newPageState };
    });
  };

  formatReview(metricsPageState) {
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

  render() {
    const { classes, token } = this.props;
    const {
      metricsPage: previousMetricsPageState,
      uploadImagesPage: previousUploadImagesState
    } = this.state;
    return (
      <Dialog
        aria-labelledby="responsive-dialog-title"
        onClose={this.props.onClose}
        open={this.props.isOpen}
      >
        <div className={classes.dialog}>
          <DialogTitle id="responsive-dialog-title">Write A Review</DialogTitle>
          <DialogContent>
            <Wizard
              pageCount={3}
              render={({ currentPageIndex, goBack, goForward }) => {
                return (
                  <React.Fragment>
                    {/* stepper */}
                    <Stepper
                      activeStep={currentPageIndex}
                      className={classes.stepper}
                      alternativeLabel
                      orientation="horizontal"
                    >
                      {pages.map(label => (
                        <Step key={label}>
                          <StepLabel>{label}</StepLabel>
                        </Step>
                      ))}
                    </Stepper>

                    {/* pages */}
                    <WizardPage isHidden={currentPageIndex !== 0}>
                      <ReviewMetricsPage
                        goForward={goForward}
                        google={this.props.google}
                        onClose={this.props.onClose}
                        onSavePageState={this.setPageState("metricsPage")}
                        previousState={previousMetricsPageState}
                        token={this.props.token}
                      />
                    </WizardPage>
                    <WizardPage isHidden={currentPageIndex !== 1}>
                      <ReviewUploadImagesPage
                        goBack={goBack}
                        goForward={goForward}
                        onSavePageState={this.setPageState("uploadImagesPage")}
                        previousState={previousUploadImagesState}
                      />
                    </WizardPage>
                    <WizardPage isHidden={currentPageIndex !== 2}>
                      <ReviewConfirmationPage
                        goBack={goBack}
                        onClose={this.props.onClose}
                        onSavePageState={this.setPageState(
                          "reviewConfirmationPage"
                        )}
                        review={this.formatReview(previousMetricsPageState)}
                        token={token}
                      />
                    </WizardPage>
                  </React.Fragment>
                );
              }}
            />
          </DialogContent>
        </div>
      </Dialog>
    );
  }
}

const WriteAReviewModalWithStyles = withStyles(styles)(WriteAReviewModal);
export default withMobileDialog()(WriteAReviewModalWithStyles);
