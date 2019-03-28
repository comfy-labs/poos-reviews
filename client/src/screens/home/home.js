import React from "react";
import PropTypes from "prop-types";
import get from "lodash/get";
import Script from "react-load-script";
// material-ui components
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
// custom components
import CompactReviewsList from "../../common/components/reviews/compactReviewsList/compactReviewsList";
import LoginModal from "../../common/components/forms/authentication/loginModal";
import SignUpModal from "../../common/components/forms/authentication/signUpModal";
import WriteAReviewModal from "../../common/components/forms/review/writeAReviewModal";
import GoogleMap from "../../common/components/googleMap/googleMap";
// custom helpers
import login from "../../common/data/apiRequest/graphQLRequest/authentication/login";
import signUp from "../../common/data/apiRequest/graphQLRequest/authentication/signUp";

// @todo: remove
const mockData = [
  {
    description: "Fake Location 1",
    location: {
      lat: 37.797667,
      lng: -122.429518
    },
    username: "Fake User 1"
  },
  {
    description: "Fake Location 2",
    location: {
      lat: 37.7866,
      lng: -122.414149
    },
    username: "Fake User 2"
  },
  {
    description: "Fake Location 3",
    location: {
      lat: 37.790941,
      lng: -122.450097
    },
    username: "Fake User 3"
  },
  {
    description: "Fake Location 4",
    location: {
      lat: 37.805465,
      lng: -122.440243
    },
    username: "Fake User 4"
  },
  {
    description: "Fake Location 5",
    location: {
      lat: 37.797056,
      lng: -122.400779
    },
    username: "Fake User 5"
  },
  {
    description: "Fake Location 6",
    location: {
      lat: 37.780098,
      lng: -122.393572
    },
    username: "Fake User 6"
  },
  {
    description: "Fake Location 7",
    location: {
      lat: 37.784033,
      lng: -122.420339
    },
    username: "Fake User 7"
  },
  {
    description: "Fake Location 8",
    location: {
      lat: 37.774671,
      lng: -122.459633
    },
    username: "Fake User 8"
  },
  {
    description: "Fake Location 9",
    location: {
      lat: 37.785389,
      lng: -122.434753
    },
    username: "Fake User 9"
  },
  {
    description: "Fake Location 10",
    location: {
      lat: 37.803295,
      lng: -122.426688
    },
    username: "Fake User 10"
  }
];

const styles = theme => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  toolbarMain: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`
  },
  toolbarTitle: {
    flex: 1
  },
  toolbarSecondary: {
    justifyContent: "space-between"
  },
  mainGrid: {
    marginTop: theme.spacing.unit * 3
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing.unit * 8,
    padding: `${theme.spacing.unit * 6}px 0`
  }
});

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // modal state
      isLoginModalShowing: false,
      isSignUpModalShowing: false,
      isWriteAReviewModalShowing: false,
      // authentication state
      authenticationErrors: null,
      user: null,
      // google map state
      google: null,
      // review state
      data: mockData // @todo: remove when real data can be populated
    };
  }

  handleLogin = (email, password) => {
    login(email, password).then(payload => {
      const hasErrors = Boolean(payload.errors);
      this.setState(state => {
        return {
          ...state,
          authenticationErrors: hasErrors ? payload.errors : null,
          isLoginModalShowing: hasErrors,
          user: hasErrors
            ? null
            : {
                ...payload.login.user,
                token: payload.login.token
              }
        };
      });
    });
  };

  handleScriptLoad = () => {
    this.setState(state => {
      const google = window.google;
      return { ...state, google };
    });
  };

  handleLocationButtonClick = data => {
    console.log(data);
  };

  handleSearchButtonClick = () => {};

  handleSignUp = (name, email, password) => {
    signUp(name, email, password).then(payload => {
      if (payload.errors) {
        this.setState(state => {
          return {
            ...state,
            authenticationErrors: payload.errors,
            user: null
          };
        });
      } else {
        this.setState(state => {
          return {
            ...state,
            isSignUpModalShowing: false,
            authenticationErrors: payload.errors,
            user: {
              ...payload.login.user,
              token: payload.login.token
            }
          };
        });
      }
    });
  };

  toggleLoginModalOpenState = () => {
    this.setState(state => {
      return {
        ...state,
        isLoginModalShowing: !state.isLoginModalShowing
      };
    });
  };

  toggleSignUpModalOpenState = () => {
    this.setState(state => {
      return {
        ...state,
        isSignUpModalShowing: !state.isSignUpModalShowing
      };
    });
  };

  toggleWriteAReviewModal = () => {
    this.setState(state => {
      return {
        ...state,
        isWriteAReviewModalShowing: !state.isWriteAReviewModalShowing
      };
    });
  };

  render() {
    return (
      <React.Fragment>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyBGc7C0LtRisG8VxJQonWDh-sL5GIoXYJU&libraries=places"
          onLoad={this.handleScriptLoad}
        />
        <div className={this.props.classes.layout}>
          <Toolbar className={this.props.classes.toolbarMain}>
            <Typography
              component="h2"
              variant="h5"
              color="inherit"
              align="center"
              noWrap
              className={this.props.classes.toolbarTitle}
            >
              Poos Reviews
            </Typography>
          </Toolbar>
          <Toolbar className={this.props.classes.toolbarSecondary}>
            <Button onClick={this.toggleWriteAReviewModal} size="small">
              Write a Review
            </Button>
            <div>
              <Button
                size="small"
                onClick={this.toggleLoginModalOpenState}
                style={{ marginRight: 10 }}
              >
                {this.state.user ? "Log out" : "Log In"}
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={this.toggleSignUpModalOpenState}
              >
                Sign Up
              </Button>
            </div>
          </Toolbar>
          <main>
            <GoogleMap
              data={this.state.data}
              google={this.state.google}
              onLocationIconClick={this.handleLocationButtonClick}
              onSearchButtonClick={this.handleSearchButtonClick}
            />
            <CompactReviewsList reviews={mockData} />
          </main>
        </div>
        {/* Modals */}
        <LoginModal
          isOpen={this.state.isLoginModalShowing}
          onClose={this.toggleLoginModalOpenState}
          onSubmit={this.handleLogin}
        />
        <SignUpModal
          isOpen={this.state.isSignUpModalShowing}
          onClose={this.toggleSignUpModalOpenState}
          onSubmit={this.handleSignUp}
        />
        <WriteAReviewModal
          google={this.state.google}
          isOpen={this.state.isWriteAReviewModalShowing}
          onClose={this.toggleWriteAReviewModal}
          token={get(this.state, "user.token")}
        />
      </React.Fragment>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
