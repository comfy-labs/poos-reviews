import React from "react";
import PropTypes from "prop-types";

// material-ui imports
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import withStyles from "@material-ui/core/styles/withStyles";
import { CircularProgress, DialogActions } from "@material-ui/core";

const styles = theme => ({
  layout: {
    width: "auto",
    display: "block", // Fix IE11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(6))]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    marginTop: theme.spacing(3)
  }
});

class SignUpModal extends React.Component {
  state = { email: "", name: "", password: "" };

  // @todo: add better validation
  validateSubmission(email, name, password) {
    return email !== "" && name !== "" && password !== "";
  }

  handleEmailChange = event => {
    // must reference target outside because setState is asynchronous
    const email = event.target.value;
    this.setState(state => {
      return { ...state, email };
    });
  };

  handleNameChange = event => {
    // must reference target outside because setState is asynchronous
    const name = event.target.value;
    this.setState(state => {
      return { ...state, name };
    });
  };

  handlePassworChange = event => {
    // must reference target outside because setState is asynchronous
    const password = event.target.value;
    this.setState(state => {
      return { ...state, password };
    });
  };

  handleSubmit = () => {
    const { email, name, password } = this.state;
    if (this.validateSubmission(email, name, password)) {
      this.props.onSubmit && this.props.onSubmit(name, email, password);
    }
  };

  render() {
    return (
      <Dialog
        aria-labelledby="responsive-dialog-title"
        onClose={this.props.onClose}
        open={this.props.isOpen}
      >
        <DialogTitle id="responsive-dialog-title">{"Sign Up"}</DialogTitle>
        <DialogContent>
          <main>
            <div>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="name">Name</InputLabel>
                <Input
                  id="name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  onChange={this.handleNameChange}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input
                  id="email"
                  name="email"
                  autoComplete="email"
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
                  onChange={this.handlePassworChange}
                />
              </FormControl>
            </div>
          </main>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            color="primary"
            disabled={
              !this.validateSubmission(
                this.state.email,
                this.state.name,
                this.state.password
              )
            }
            onClick={this.handleSubmit}
          >
            {this.props.isLoading ? (
              <CircularProgress color="secondary" size={14} thickness={8} />
            ) : (
              "Sign Up"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

SignUpModal.propTypes = {
  classes: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default withStyles(styles)(SignUpModal);
