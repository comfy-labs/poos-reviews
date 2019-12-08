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
import CompactLocationsList from "../../common/components/locations/compactLocationsList/compactLocationsList";
import CompleteReviewModal from "../../common/components/reviews/completeReview/completeReview";
import GoogleMap from "../../common/components/googleMap/googleMap";
import LoginModal from "../../common/components/forms/authentication/loginModal";
import SignUpModal from "../../common/components/forms/authentication/signUpModal";
import WriteAReviewModal from "../../common/components/forms/review/writeAReviewModal";
// custom helpers
import login from "../../common/data/apiRequest/graphQLRequest/authentication/login";
import signUp from "../../common/data/apiRequest/graphQLRequest/authentication/signUp";
import serverRequest from "../../common/data/apiRequest/serverRequest/serverRequest";

// @todo: remove
const mockCompleteReviewData = {
  accessibility: "test",
  cleanliness: "test",
  description: "test",
  image:
    "https://kingfisher.scene7.com/is/image/Kingfisher/Category_Image_Bathroom_Suites?$PROMO_460_460$",
  name: "test",
  numStalls: "test",
  privacy: "test",
  rating: 4,
  reviewText: "test",
  tpQuality: 5
};

const mockLocations = [
  {
    description: "Fake Location 1",
    location: {
      lat: 37.797667,
      lng: -122.429518
    },
    name: "Fake Location Name 1",
    rating: 3
  },
  {
    description: "Fake Location 2",
    location: {
      lat: 37.7866,
      lng: -122.414149
    },
    name: "Fake Location Name 2",
    rating: 4
  },
  {
    description: "Fake Location 3",
    location: {
      lat: 37.790941,
      lng: -122.450097
    },
    name: "Fake Location Name 3",
    rating: 5
  },
  {
    description: "Fake Location 4",
    location: {
      lat: 37.805465,
      lng: -122.440243
    },
    name: "Fake Location Name 4",
    rating: 1
  },
  {
    description: "Fake Location 5",
    location: {
      lat: 37.797056,
      lng: -122.400779
    },
    name: "Fake Location Name 5",
    rating: 3
  },
  {
    description: "Fake Location 6",
    location: {
      lat: 37.780098,
      lng: -122.393572
    },
    name: "Fake Location Name 6",
    rating: 3
  },
  {
    description: "Fake Location 7",
    location: {
      lat: 37.784033,
      lng: -122.420339
    },
    name: "Fake Location Name 7",
    rating: 2
  },
  {
    description: "Fake Location 8",
    location: {
      lat: 37.774671,
      lng: -122.459633
    },
    name: "Fake Location Name 8",
    rating: 2
  },
  {
    description: "Fake Location 9",
    location: {
      lat: 37.785389,
      lng: -122.434753
    },
    name: "Fake Location Name 9",
    rating: 5
  },
  {
    description: "Fake Location 10",
    location: {
      lat: 37.803295,
      lng: -122.426688
    },
    name: "Fake Location Name 10",
    rating: 1
  }
];

const styles = theme => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(1100 + theme.spacing(6))]: {
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
    marginTop: theme.spacing(3)
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(8),
    padding: `${theme.spacing(6)}px 0`
  }
});

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // modal state
      isCompleteReviewModalShowing: false,
      isLoginModalLoading: false,
      isLoginModalShowing: false,
      isSignUpModalShowing: false,
      isWriteAReviewModalShowing: false,
      // authentication state
      authenticationErrors: null,
      user: null,
      // google map state
      google: null,
      // review state
      data: mockLocations // @todo: remove when real data can be populated
    };
  }

  handleLogin = (email, password) => {
    this.setState(
      state => {
        return { ...state, isLoginModalLoading: true };
      },
      () => {
        login(email, password)
          .then(payload => {
            this.setState(state => {
              return {
                ...state,
                authenticationErrors: null,
                isLoginModalLoading: false,
                isLoginModalShowing: false,
                user: { ...payload.login.user, token: payload.login.token }
              };
            });
          })
          .catch(errors => {
            this.setState(state => {
              return {
                ...state,
                authenticationErrors: errors,
                isLoginModalLoading: false,
                isLoginModalShowing: true,
                user: null
              };
            });
          });
      }
    );
  };

  handleSubmitImageClick = event => {
    const imageFile = event.target.files[0];
    serverRequest(imageFile);
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
      this.setState(state => {
        const hasErrors = !!payload.errors;
        return {
          ...state,
          authenticationErrors: hasErrors ? payload.errors : false,
          isSignUpModalShowing: hasErrors,
          user: hasErrors
            ? null
            : {
                ...payload.signup.user,
                token: payload.signup.token
              }
        };
      });
    });
  };

  toggleCompleteReviewModalOpenState = () => {
    this.setState(state => {
      return {
        ...state,
        isCompleteReviewModalShowing: !state.isCompleteReviewModalShowing
      };
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
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyBo-Jx7q5tVqEhxtKm9AlnWfdTkv3kNUNo&libraries=places"
          onLoad={this.handleScriptLoad}
        />
        <div className={this.props.classes.layout}>
          <Toolbar className={this.props.classes.toolbarMain} variant="dense">
            <Typography
              component="h5"
              variant="h5"
              color="inherit"
              align="center"
              noWrap
              className={this.props.classes.toolbarTitle}
            >
              Poos Reviews
            </Typography>
          </Toolbar>
          <Toolbar
            className={this.props.classes.toolbarSecondary}
            variant="dense"
          >
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
            <CompactLocationsList locations={this.state.data} />
            <Button
              variant="outlined"
              size="small"
              onClick={this.toggleCompleteReviewModalOpenState}
            >
              Open Demo Review
            </Button>
            <input
              id="myInput"
              ref="input"
              type="file"
              style={{ display: "none" }}
              onChange={this.handleSubmitImageClick}
            />
            <Button
              variant="contained"
              onClick={() => {
                this.refs.input.click();
              }}
            >
              Submit an Image
            </Button>
          </main>
        </div>
        {/* Modals */}
        <CompleteReviewModal
          data={mockCompleteReviewData}
          isOpen={this.state.isCompleteReviewModalShowing}
          onClose={this.toggleCompleteReviewModalOpenState}
        />
        <LoginModal
          isLoading={this.state.isLoginModalLoading}
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
