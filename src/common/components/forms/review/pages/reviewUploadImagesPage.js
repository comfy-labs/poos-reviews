import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

// material-ui
import Button from "@material-ui/core/Button";
import CameraAlt from "@material-ui/icons/CameraAlt";
import CloudUpload from "@material-ui/icons/CloudUpload";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

// custom
import getMedia from "../../../../data/deviceRequest/media/getMedia";

const styles = theme => {
  // console.log("theme: ", theme);
  return {
    button: {
      margin: theme.spacing.unit
    },
    leftIcon: {
      marginRight: theme.spacing.unit
    },
    rightIcon: {
      marginLeft: theme.spacing.unit
    },
    iconSmall: {
      fontSize: 20
    },
    toolbar: {
      alignItems: "center",
      backgroundColor: theme.palette.primary.light,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    }
  };
};

class ReviewUploadImagesPage extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  constructor() {
    super();
    this.stream = null;
    this.state = {
      errors: null,
      isStreaming: false
    };
  }

  componentDidMount() {
    const videoNode = this.getNode("video");
    videoNode.addEventListener(
      "canplay",
      event => {
        if (!this.state.isStreaming) {
          const videoContainerNode = this.getNode("videoContainer");
          const width = videoContainerNode.offsetWidth;
          const canvasNode = this.getNode("canvas");
          const height = videoNode.videoHeight / (videoNode.videoWidth / width);

          videoNode.setAttribute("width", width);
          videoNode.setAttribute("height", height);
          canvasNode.setAttribute("width", width);
          canvasNode.setAttribute("height", height);

          this.setState(state => {
            return { ...state, isStreaming: true };
          });
        }
      },
      false
    );
  }

  componentWillUnmount() {
    this.stop();
  }

  getNode = refName => {
    return ReactDOM.findDOMNode(this.refs[refName]);
  };

  stop = () => {
    // close stream
    if (this.stream) {
      this.stream.getTracks()[0].stop();
    }

    // clear video element
    const videoNode = this.getNode("video");
    if (videoNode) {
      videoNode.srcObject = null;
    }
  };

  clearPhoto = () => {
    const canvas = this.getNode("canvas");
    const photo = this.getNode("photo");
    const context = canvas.getContext("2d");

    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    const data = canvas.toDataURL("image/png");
    photo.setAttribute("src", data);
  };

  handleRecordButtonClick = () => {
    const video = this.getNode("video");
    const height = video.offsetHeight;
    const width = video.offsetWidth;

    if (width && height) {
      const canvas = this.getNode("canvas");
      const context = canvas.getContext("2d");
      const photo = this.getNode("photo");

      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);

      const data = canvas.toDataURL("image/png");
      photo.setAttribute("src", data);
    } else {
      this.clearPhoto();
    }
  };

  handleTakePhotoClick = () => {
    getMedia().then(payload => {
      if (payload.errors) {
        this.setState(state => {
          return { ...state, errors: payload.errors };
        });
      } else {
        // cache stream
        this.stream = payload;

        // start stream
        const node = this.getNode("video");
        node.srcObject = this.stream;
        node.play();
      }
    });
  };

  renderCamera = () => {
    const { classes } = this.props;
    const { isStreaming } = this.state;
    return (
      <div
        ref="videoContainer"
        style={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          visibility: isStreaming ? "visible" : "hidden",
          width: "100%"
        }}
      >
        <video ref="video" style={{ border: "1px solid black", width: "100%" }}>
          Video stream not available.
        </video>
        <Toolbar className={classes.toolbar} color="primary">
          <IconButton onClick={this.handleRecordButtonClick}>
            <FiberManualRecord color="error" fontSize="large" />
          </IconButton>
        </Toolbar>
      </div>
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Upload Images
        </Typography>
        <Grid container spacing={8}>
          <Grid item xs={12} sm={6}>
            <Button
              onClick={this.handleTakePhotoClick}
              size="small"
              variant="outlined"
            >
              Take a Photo
              <CameraAlt className={classes.rightIcon} />
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button size="small" variant="outlined">
              Upload a Photo
              <CloudUpload className={classes.rightIcon} />
            </Button>
          </Grid>
        </Grid>
        {this.renderCamera()}
        <canvas ref="canvas" style={{ display: "none" }} />
        <div className="output">
          <img ref="photo" alt="The screen capture will appear in this box." />
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(ReviewUploadImagesPage);
