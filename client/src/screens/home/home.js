import React from "react";
import PropTypes from "prop-types";
import Script from "react-load-script";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import CompactLocationsList from "../../common/components/locations/compactLocationsList/compactLocationsList";
import CompleteReviewModal from "../../common/components/reviews/completeReviewModal/completeReviewModal";
import GoogleMap from "../../common/components/googleMap/googleMap";
import LocationModal from "../../common/components/locations/location-modal/location-modal";
import NavBar from "../../common/components/nav-bar/nav-bar";
import serverRequest from "../../common/data/apiRequest/serverRequest/serverRequest";
import getStyles from "./home-styles";
// @todo: remove mock data
import mockLocationsResponse from "../../common/data/mock/mock-locations-response.json";
import mockCompleteReviewResponse from "../../common/data/mock/mock-complete-review-response.json";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCompleteReviewModalShowing: false,
      isLocationModalShowing: false,
      selectedLocation: null,
      authenticationErrors: null,
      user: null,
      google: null,
      data: [...mockLocationsResponse.data]
    };
  }

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

  handleLocationSelect = selectedLocation => {
    this.setState(state => {
      return { ...state, isLocationModalShowing: true, selectedLocation };
    });
  };

  toggleLocationModalOpenState = () => {
    this.setState(state => {
      return {
        ...state,
        isLocationModalShowing: !state.isLocationModalShowing
      };
    });
  };

  handleSearchButtonClick = () => {};

  toggleCompleteReviewModalOpenState = () => {
    this.setState(state => {
      return {
        ...state,
        isCompleteReviewModalShowing: !state.isCompleteReviewModalShowing
      };
    });
  };

  handleLogin = ({ errors, user, token }) => {
    this.setState(state => {
      return { ...state, user };
    });
  };

  handleSignUp = ({ errors, user, token }) => {
    this.setState(state => {
      return { ...state, user };
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
          <NavBar
            google={this.state.google}
            onLogin={this.handleLogin}
            onSignUp={this.handleSignUp}
          />
          <main style={{ marginTop: 20 }}>
            <GoogleMap
              data={this.state.data}
              google={this.state.google}
              onLocationIconClick={this.handleLocationButtonClick}
              onSearchButtonClick={this.handleSearchButtonClick}
            />
            <CompactLocationsList
              locations={this.state.data}
              onSelect={this.handleLocationSelect}
            />
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
          data={{ ...mockCompleteReviewResponse.data[0] }}
          isOpen={this.state.isCompleteReviewModalShowing}
          onClose={this.toggleCompleteReviewModalOpenState}
        />
        <LocationModal
          data={{ ...mockCompleteReviewResponse.data[0] }}
          isOpen={this.state.isLocationModalShowing}
          onClose={this.toggleLocationModalOpenState}
        />
      </React.Fragment>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(getStyles)(Home);
