import React, { useState } from "react";
import PropTypes from "prop-types";
import get from "lodash/get";
import {
  Button,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
  withStyles
} from "@material-ui/core";
import RateReviewIcon from "@material-ui/icons/RateReview";
import AccountCircle from "@material-ui/icons/AccountCircle";
import getStyles from "./nab-bar-styles";
import LoginModal from "../forms/authentication/loginModal";
import SignUpModal from "../forms/authentication/signUpModal";
import WriteAReviewModal from "../forms/review/writeAReviewModal";
import useAuthentication from "./use-authentication";

function NavBar({ classes, google, onLogin, onSignUp, user }) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isWriteAReviewModalOpen, setIsWriteAReviewModalOpen] = useState(false);
  const { isLoading, login, signUp } = useAuthentication();

  const handleLogin = (email, password) => {
    login(email, password).then(onLogin);
  };

  const handleSignUp = (name, email, password) => {
    signUp(name, email, password).then(onSignUp);
  };

  return (
    <>
      <Toolbar className={classes.toolbar} variant="dense">
        <Hidden smDown>
          <Button
            onClick={() => setIsWriteAReviewModalOpen(true)}
            size="small"
            startIcon={<RateReviewIcon color="action" />}
            variant="outlined"
          >
            Write a Review
          </Button>
        </Hidden>
        <Hidden mdUp>
          <IconButton
            onClick={() => setIsWriteAReviewModalOpen(true)}
            size="small"
          >
            <RateReviewIcon color="action" />
          </IconButton>
        </Hidden>
        <Typography
          align="center"
          className={classes.title}
          color="inherit"
          component="h5"
          noWrap
          variant="h5"
        >
          Poos Reviews
        </Typography>
        <Hidden smDown>
          <Button
            onClick={() => setIsLoginModalOpen(true)}
            size="small"
            style={{ marginRight: 10 }}
          >
            {user ? "Log out" : "Log In"}
          </Button>
          {!user && (
            <Button
              onClick={() => setIsSignUpModalOpen(true)}
              size="small"
              variant="outlined"
            >
              Sign Up
            </Button>
          )}
        </Hidden>
        <Hidden mdUp>
          <IconButton>
            <AccountCircle color="action" />
          </IconButton>
        </Hidden>
      </Toolbar>
      <LoginModal
        isLoading={isLoading}
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSubmit={handleLogin}
      />
      <SignUpModal
        isLoading={isLoading}
        isOpen={isSignUpModalOpen}
        onClose={() => setIsSignUpModalOpen(false)}
        onSubmit={handleSignUp}
      />
      <WriteAReviewModal
        google={google}
        isOpen={isWriteAReviewModalOpen}
        onClose={() => setIsWriteAReviewModalOpen(false)}
        token={get(user, "token")}
      />
    </>
  );
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  google: PropTypes.object,
  onLogin: PropTypes.func.isRequired,
  onSignUp: PropTypes.func.isRequired
};

export default withStyles(getStyles)(NavBar);
