import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import get from "lodash/get";
import {
  Button,
  ClickAwayListener,
  Grid,
  Grow,
  Hidden,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Slide,
  Snackbar,
  SnackbarContent,
  Toolbar,
  Typography,
  withStyles
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CloseIcon from "@material-ui/icons/Close";
import RateReviewIcon from "@material-ui/icons/RateReview";
import LoginModal from "../forms/authentication/loginModal";
import SignUpModal from "../forms/authentication/signUpModal";
import WriteAReviewModal from "../forms/review/writeAReviewModal";
import getStyles from "./nab-bar-styles";
import useAuthentication from "./use-authentication";

function NavBar({ classes, google, onLogin, onSignUp, user }) {
  const accountRef = useRef(null);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isLogInModalOpen, setIsLogInModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isWriteAReviewModalOpen, setIsWriteAReviewModalOpen] = useState(false);
  const { clearErrors, errors, isLoading, login, signUp } = useAuthentication();

  const handleLogin = (email, password) => {
    login(email, password).then(onLogin);
  };
  const handleSignUp = (name, email, password) => {
    signUp(name, email, password).then(onSignUp);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        open={Boolean(errors)}
        TransitionComponent={props => <Slide {...props} direction="down" />}
      >
        <SnackbarContent
          className={classes.error}
          message={<span>{errors && errors.join("/n")}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={clearErrors}
            >
              <CloseIcon className={classes.icon} />
            </IconButton>
          ]}
        />
      </Snackbar>
      <Toolbar disableGutters variant="dense">
        <Grid alignItems="center" container direction="row" justify="center">
          <Grid className={classes.leftContent} item>
            <Hidden only="xs">
              <Button
                onClick={() => setIsWriteAReviewModalOpen(true)}
                size="small"
                startIcon={<RateReviewIcon color="action" />}
                // variant="outlined"
              >
                Write a Review
              </Button>
            </Hidden>
            <Hidden smUp>
              <IconButton
                edge="start"
                onClick={() => setIsWriteAReviewModalOpen(true)}
                size="small"
              >
                <RateReviewIcon color="action" />
              </IconButton>
            </Hidden>
          </Grid>
          <Grid item>
            <Typography
              align="center"
              color="inherit"
              component="h5"
              noWrap
              variant="h5"
            >
              Poos Reviews
            </Typography>
          </Grid>
          <Grid className={classes.rightContent} item>
            <Hidden only="xs">
              <Button
                onClick={() => setIsLogInModalOpen(true)}
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
            <Hidden smUp>
              <IconButton
                edge="end"
                onClick={() => setIsAccountMenuOpen(true)}
                ref={accountRef}
              >
                <AccountCircleIcon color="action" />
              </IconButton>
              <Popper
                anchorEl={accountRef.current}
                disablePortal
                open={isAccountMenuOpen}
                placement="bottom-end"
                style={{ zIndex: 2 }}
                transition
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    id="menu-list-grow"
                    style={{ transformOrigin: "bottom-end" }}
                  >
                    <Paper>
                      <ClickAwayListener
                        onClickAway={() => setIsAccountMenuOpen(false)}
                      >
                        <MenuList dense>
                          {!user && (
                            <MenuItem
                              onClick={() => {
                                setIsLogInModalOpen(true);
                                setIsAccountMenuOpen(false);
                              }}
                            >
                              <Typography noWrap variant="inherit">
                                Log In
                              </Typography>
                            </MenuItem>
                          )}
                          {!user && (
                            <MenuItem
                              onClick={() => {
                                setIsSignUpModalOpen(true);
                                setIsAccountMenuOpen(false);
                              }}
                            >
                              <Typography noWrap variant="inherit">
                                Sign Up
                              </Typography>
                            </MenuItem>
                          )}
                          {user && (
                            <MenuItem>
                              <Typography noWrap variant="inherit">
                                Log Out
                              </Typography>
                            </MenuItem>
                          )}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </Hidden>
          </Grid>
        </Grid>
      </Toolbar>
      <LoginModal
        isLoading={isLoading}
        isOpen={isLogInModalOpen}
        onClose={() => {
          clearErrors();
          setIsLogInModalOpen(false);
        }}
        onSubmit={handleLogin}
      />
      <SignUpModal
        isLoading={isLoading}
        isOpen={isSignUpModalOpen}
        onClose={() => {
          clearErrors();
          setIsSignUpModalOpen(false);
        }}
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
