import React from "react";
import PropTypes from "prop-types";

// material-ui imports
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  layout: {
    width: "auto",
    display: "block", // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class LoginModal extends React.Component {
  state = { email: "", password: "" };

  // @todo: add better validation
  validateSubmission(email, password) {
    return email !== "" && password !== "";
  }

  handleEmailChange = event => {
    // must reference target outside because setState is asynchronous
    const email = event.target.value;
    this.setState(state => {
      return { ...state, email };
    });
  };

  handlePasswordChange = event => {
    // must reference target outside because setState is asynchronous
    const password = event.target.value;
    this.setState(state => {
      return { ...state, password };
    });
  };

  handleSubmit = () => {
    const { email, password } = this.state;
    if (this.validateSubmission(email, password)) {
      this.props.onSubmit && this.props.onSubmit(email, password);
    }
  };

  render() {
    const { classes, isOpen, onClose } = this.props;
    const { email, password } = this.state;

    return (
      <Dialog
        aria-labelledby="responsive-dialog-title"
        onClose={onClose}
        open={isOpen}
      >
        <DialogTitle id="responsive-dialog-title">{"Log In"}</DialogTitle>
        <DialogContent>
          <main className={classes.layout}>
            <div className={classes.form}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input
                  id="email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={this.handleEmailChange}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={this.handlePasswordChange}
                />
              </FormControl>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={!this.validateSubmission(email, password)}
                onClick={this.handleSubmit}
              >
                Sign in
              </Button>
            </div>
          </main>
        </DialogContent>
      </Dialog>
    );
  }
}

LoginModal.propTypes = {
  classes: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default withStyles(styles)(LoginModal);
