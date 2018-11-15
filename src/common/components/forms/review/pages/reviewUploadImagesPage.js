import React from "react";
import PropTypes from "prop-types";

// material-ui
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

// custom
import UploadedImageListItem from "../uploadedImageListItem";

const styles = theme => {
  return {
    button: {
      marginTop: theme.spacing.unit * 3,
      marginLeft: theme.spacing.unit
    },
    buttons: {
      display: "flex",
      justifyContent: "flex-end"
    },
    container: {
      width: "100%"
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
    goBack: PropTypes.func.isRequired,
    goForward: PropTypes.func.isRequired,
    onSavePageState: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
  };

  constructor() {
    super();
    this.state = { imageFiles: [] };
  }

  handleBackClick = () => {
    this.props.onSavePageState(this.state);
    this.props.goBack();
  };

  handleNextClick = () => {
    this.props.onSavePageState(this.state);
    this.props.goForward();
  };

  handleSubmitImageClick = event => {
    const imageFile = event.target.files[0];
    this.setState(state => {
      const imageFiles = [...state.imageFiles, imageFile];
      return { ...state, imageFiles };
    });
  };

  makeHandleOnDeleteImageClick = deletedIndex => () => {
    this.setState(state => {
      const imageFiles = state.imageFiles.reduce(
        (newImageFiles, imageFile, index) => {
          if (index !== deletedIndex) {
            newImageFiles.push(imageFile);
          }
          return newImageFiles;
        },
        []
      );
      return { ...state, imageFiles };
    });
  };

  render() {
    const { imageFiles } = this.state;
    const { classes } = this.props;
    const isSubmitButtonDisabled = imageFiles.length > 4;
    return (
      <div className={classes.container}>
        <Typography variant="h6" gutterBottom>
          Upload Images (Under Construction)
        </Typography>
        <div>
          <input
            id="myInput"
            ref="input"
            type="file"
            style={{ display: "none" }}
            onChange={this.handleSubmitImageClick}
          />
          <Button
            disabled={isSubmitButtonDisabled}
            variant="contained"
            onClick={() => {
              this.refs.input.click();
            }}
          >
            {imageFiles.length === 0
              ? "Submit an Image"
              : "Submit another Image"}
          </Button>
        </div>
        <List>
          {imageFiles.map((imageFile, index) => {
            return (
              <div key={index} style={{ width: "100%" }}>
                <UploadedImageListItem
                  imageFile={imageFile}
                  onDeleteClick={this.makeHandleOnDeleteImageClick(index)}
                />
                {index < imageFiles.length - 1 ? <Divider /> : null}
              </div>
            );
          })}
        </List>
        {/* buttons */}
        <DialogActions className={classes.buttons}>
          <Button onClick={this.handleBackClick} className={classes.button}>
            Back
          </Button>
          <Button
            onClick={this.handleNextClick}
            className={classes.button}
            color="primary"
            autoFocus
            variant="contained"
          >
            Next
          </Button>
        </DialogActions>
      </div>
    );
  }
}

export default withStyles(styles)(ReviewUploadImagesPage);
