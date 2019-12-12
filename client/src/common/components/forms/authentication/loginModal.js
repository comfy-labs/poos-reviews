import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel
} from "@material-ui/core";

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
    return (
      <Dialog
        aria-labelledby="responsive-dialog-title"
        onClose={this.props.onClose}
        open={this.props.isOpen}
      >
        <DialogTitle id="responsive-dialog-title">{"Log In"}</DialogTitle>
        <DialogContent>
          <main>
            <div>
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
            </div>
          </main>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            color="primary"
            disabled={
              !this.validateSubmission(this.state.email, this.state.password)
            }
            onClick={this.handleSubmit}
          >
            {this.props.isLoading ? (
              <CircularProgress color="secondary" size={14} thickness={8} />
            ) : (
              "Sign In"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

LoginModal.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default LoginModal;
