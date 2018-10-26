import React from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import withStyles from "@material-ui/core/styles/withStyles";

import Wizard, {
  WizardPage
} from "../../../../common/components/wizard/wizard";
import ReviewMetricsPage from "./pages/reviewMetricsPage";
import ReviewUploadImagesPage from "./pages/reviewUploadImagesPage";
import ReviewConfirmationPage from "./pages/reviewConfirmationPage";

const styles = theme => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      marginLeft: "auto",
      marginRight: "auto",
      padding: 0,
      width: 600
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
});

const pages = ["Details", "Upload Images", "Confirmation"];

class WriteAReviewModal extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  };

  render() {
    const { classes } = this.props;
    return (
      <Dialog
        aria-labelledby="responsive-dialog-title"
        onClose={this.props.onClose}
        open={this.props.isOpen}
      >
        <DialogTitle id="responsive-dialog-title">
          {"Write a Review"}
        </DialogTitle>
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
                  >
                    {pages.map(label => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>

                  {/* pages */}
                  <WizardPage isHidden={currentPageIndex !== 0}>
                    <ReviewMetricsPage />
                  </WizardPage>
                  <WizardPage isHidden={currentPageIndex !== 1}>
                    <ReviewUploadImagesPage />
                  </WizardPage>
                  <WizardPage isHidden={currentPageIndex !== 2}>
                    <ReviewConfirmationPage />
                  </WizardPage>

                  {/* buttons */}
                  <DialogActions className={classes.buttons}>
                    {currentPageIndex !== 0 && (
                      <Button onClick={goBack} className={classes.button}>
                        Back
                      </Button>
                    )}
                    <Button
                      onClick={goForward}
                      className={classes.button}
                      color="primary"
                      autoFocus
                      variant="contained"
                    >
                      {currentPageIndex === pages.length - 1
                        ? "Submit"
                        : "Next"}
                    </Button>
                  </DialogActions>
                </React.Fragment>
              );
            }}
          />
        </DialogContent>
      </Dialog>
    );
  }
}

export default withStyles(styles)(WriteAReviewModal);
