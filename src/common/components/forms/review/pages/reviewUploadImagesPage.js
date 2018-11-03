import React from "react";
import PropTypes from "prop-types";

// material-ui
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

// custom
import UploadedImageListItem from "../uploadedImageListItem";

const styles = theme => {
  return {
    button: {
      margin: theme.spacing.unit
    },
    container: {
      minWidth: 320
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
    this.state = { imageFiles: [] };
  }

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
    const isSubmitButtonDisabled = imageFiles.length > 4;
    return (
      <div className={this.props.classes.container}>
        <Typography variant="h6" gutterBottom>
          Upload Images
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
              <div key={index}>
                <UploadedImageListItem
                  imageFile={imageFile}
                  onDeleteClick={this.makeHandleOnDeleteImageClick(index)}
                />
                {index < imageFiles.length - 1 ? <Divider /> : null}
              </div>
            );
          })}
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(ReviewUploadImagesPage);
