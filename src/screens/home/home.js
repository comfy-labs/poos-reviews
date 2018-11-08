import React from "react";
import PropTypes from "prop-types";
import Script from "react-load-script";
// material-ui components
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Markdown from "../../common/components/markdown/markdown";
import post1 from "../../common/components/markdown/mock/blog-post.1.md";
import post2 from "../../common/components/markdown/mock/blog-post.2.md";
import post3 from "../../common/components/markdown/mock/blog-post.3.md";
// custom components
import LoginModal from "../../common/components/forms/authentication/loginModal";
import SignUpModal from "../../common/components/forms/authentication/signUpModal";
import ReviewModal from "../../common/components/forms/review/reviewModal";
import GoogleMap from "../../common/components/googleMap/googleMap";
// custom helpers
import login from "../../common/data/apiRequest/graphQLRequest/authentication/login";
import signUp from "../../common/data/apiRequest/graphQLRequest/authentication/signUp";

// @todo: remove
const data = [
  {
    location: {
      lat: 37.797667,
      lng: -122.429518
    }
  },
  {
    location: {
      lat: 37.7866,
      lng: -122.414149
    }
  },
  {
    location: {
      lat: 37.790941,
      lng: -122.450097
    }
  },
  {
    location: {
      lat: 37.805465,
      lng: -122.440243
    }
  },
  {
    location: {
      lat: 37.797056,
      lng: -122.400779
    }
  },
  {
    location: {
      lat: 37.780098,
      lng: -122.393572
    }
  },
  {
    location: {
      lat: 37.784033,
      lng: -122.420339
    }
  },
  {
    location: {
      lat: 37.774671,
      lng: -122.459633
    }
  },
  {
    location: {
      lat: 37.785389,
      lng: -122.434753
    }
  },
  {
    location: {
      lat: 37.803295,
      lng: -122.426688
    }
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
  mainFeaturedPost: {
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing.unit * 4
  },
  mainFeaturedPostContent: {
    padding: `${theme.spacing.unit * 6}px`,
    [theme.breakpoints.up("md")]: {
      paddingRight: 0
    }
  },
  mainGrid: {
    marginTop: theme.spacing.unit * 3
  },
  card: {
    display: "flex"
  },
  cardDetails: {
    flex: 1
  },
  cardMedia: {
    width: 160
  },
  markdown: {
    padding: `${theme.spacing.unit * 3}px 0`
  },
  sidebarAboutBox: {
    padding: theme.spacing.unit * 2,
    backgroundColor: theme.palette.grey[200]
  },
  sidebarSection: {
    marginTop: theme.spacing.unit * 3
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing.unit * 8,
    padding: `${theme.spacing.unit * 6}px 0`
  }
});

const sections = [
  "Technology",
  "Design",
  "Culture",
  "Business",
  "Politics",
  "Opinion",
  "Science",
  "Health",
  "Style",
  "Travel"
];

const featuredPosts = [
  {
    title: "Featured post",
    date: "Nov 12",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content."
  },
  {
    title: "Post title",
    date: "Nov 11",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content."
  }
];

const posts = [post1, post2, post3];

const archives = [
  "March 2020",
  "February 2020",
  "January 2020",
  "December 2019",
  "November 2019",
  "October 2019",
  "September 2019",
  "August 2019",
  "July 2019",
  "June 2019",
  "May 2019",
  "April 2019"
];

const social = ["GitHub", "Twitter", "Facebook"];

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // modal state
      isLoginModalShowing: false,
      isSignUpModalShowing: false,
      isWriteAReviewModalShowing: false,
      // authentication
      authenticationErrors: null,
      user: null,
      // @todo: remove this when google is served from server
      google: null
    };
  }

  handleLogin = (email, password) => {
    login(email, password).then(payload => {
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
            isLoginModalShowing: false,
            authenticationErrors: payload.errors,
            user: payload.login.user
          };
        });
      }
    });
  };

  handleScriptLoad = () => {
    this.setState(state => {
      const google = window.google;
      return { ...state, google };
    });
  };

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
            user: payload.signup.user
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
    const { classes } = this.props;
    const { user } = this.state;

    return (
      <React.Fragment>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyBGc7C0LtRisG8VxJQonWDh-sL5GIoXYJU&libraries=places"
          onLoad={this.handleScriptLoad}
        />
        <div className={classes.layout}>
          <Toolbar className={classes.toolbarMain}>
            <Button onClick={this.toggleWriteAReviewModal} size="small">
              Write a Review
            </Button>
            <Typography
              component="h2"
              variant="h5"
              color="inherit"
              align="center"
              noWrap
              className={classes.toolbarTitle}
            >
              Poos Reviews
            </Typography>
            <Button
              size="small"
              onClick={this.toggleLoginModalOpenState}
              style={{ marginRight: 10 }}
            >
              Log In
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={this.toggleSignUpModalOpenState}
            >
              Sign Up
            </Button>
          </Toolbar>
          <Toolbar variant="dense" className={classes.toolbarSecondary}>
            {sections.map(section => (
              <Typography color="inherit" noWrap key={section}>
                {section}
              </Typography>
            ))}
          </Toolbar>
          <main>
            {/* Main featured post */}
            <Paper className={classes.mainFeaturedPost}>
              <Grid container>
                <Grid item md={6}>
                  <div className={classes.mainFeaturedPostContent}>
                    <Typography
                      component="h1"
                      variant="h3"
                      color="inherit"
                      gutterBottom
                    >
                      {user ? `Hi ${user.name}!` : "Not logged in."}
                    </Typography>
                    <Typography variant="h5" color="inherit" paragraph>
                      Multiple lines of text that form the lede, informing new
                      readers quickly and efficiently about what&apos;s most
                      interesting in this post&apos;s contents…
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </Paper>
            {/* End main featured post */}
            <GoogleMap data={data} google={this.state.google} />
            <Grid container spacing={40} className={classes.cardGrid}>
              {featuredPosts.map(post => (
                <Grid item key={post.title} xs={12} md={6}>
                  <Card className={classes.card}>
                    <div className={classes.cardDetails}>
                      <CardContent>
                        <Typography component="h2" variant="h5">
                          {post.title}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                          {post.date}
                        </Typography>
                        <Typography variant="subtitle1" paragraph>
                          {post.description}
                        </Typography>
                        <Typography variant="subtitle1" color="primary">
                          Continue reading...
                        </Typography>
                      </CardContent>
                    </div>
                    <Hidden xsDown>
                      <CardMedia
                        className={classes.cardMedia}
                        image="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_164edaf95ee%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_164edaf95ee%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.32500076293945%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" // eslint-disable-line max-len
                        title="Image title"
                      />
                    </Hidden>
                  </Card>
                </Grid>
              ))}
            </Grid>
            {/* End sub featured posts */}
            <Grid container spacing={40} className={classes.mainGrid}>
              {/* Main content */}
              <Grid item xs={12} md={8}>
                <Typography variant="h6" gutterBottom>
                  From the Firehose
                </Typography>
                <Divider />
                {posts.map(post => (
                  <Markdown
                    className={classes.markdown}
                    key={post.substring(0, 40)}
                  >
                    {post}
                  </Markdown>
                ))}
              </Grid>
              {/* End main content */}
              {/* Sidebar */}
              <Grid item xs={12} md={4}>
                <Paper elevation={0} className={classes.sidebarAboutBox}>
                  <Typography variant="h6" gutterBottom>
                    About
                  </Typography>
                  <Typography>
                    Etiam porta sem malesuada magna mollis euismod. Cras mattis
                    consectetur purus sit amet fermentum. Aenean lacinia
                    bibendum nulla sed consectetur.
                  </Typography>
                </Paper>
                <Typography
                  variant="h6"
                  gutterBottom
                  className={classes.sidebarSection}
                >
                  Archives
                </Typography>
                {archives.map(archive => (
                  <Typography key={archive}>{archive}</Typography>
                ))}
                <Typography
                  variant="h6"
                  gutterBottom
                  className={classes.sidebarSection}
                >
                  Social
                </Typography>
                {social.map(network => (
                  <Typography key={network}>{network}</Typography>
                ))}
              </Grid>
              {/* End sidebar */}
            </Grid>
          </main>
        </div>
        {/* Footer */}
        <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
            Footer
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            component="p"
          >
            Something here to give the footer a purpose!
          </Typography>
        </footer>

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
        <ReviewModal
          google={this.state.google}
          isOpen={this.state.isWriteAReviewModalShowing}
          onClose={this.toggleWriteAReviewModal}
        />
      </React.Fragment>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
