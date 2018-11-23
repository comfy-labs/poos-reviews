import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Delete from "@material-ui/icons/Delete";

class UploadedImageListItem extends React.Component {
  static propTypes = {
    imageFile: PropTypes.any,
    onDeleteClick: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { fullSizeImage: null, thumbnailSrc: null };
  }

  componentDidMount() {
    if (this.props.imageFile) {
      this.readFileAsDataURL(this.props.imageFile).then(dataURL => {
        this.createImageFromDataURL(dataURL).then(image => {
          const thumbnailSrc = this.getResizedDataURL(image);
          this.setState(state => {
            return { ...state, fullSizeImage: image, thumbnailSrc };
          });
        });
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (
      !this.state.fullSizeImage &&
      this.props.imageFile &&
      this.props.imageFile !== prevProps.imageFile
    ) {
      this.readFileAsDataURL(this.props.imageFile).then(dataURL => {
        this.createImageFromDataURL(dataURL).then(image => {
          const thumbnailSrc = this.getResizedDataURL(image);
          this.setState(state => {
            return { ...state, fullSizeImage: image, thumbnailSrc };
          });
        });
      });
    }
  }

  createImageFromDataURL(dataURL) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        resolve(image);
      };
      image.src = dataURL;
    });
  }

  readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(file);
    });
  }

  getResizedDataURL(image) {
    // draw to canvas
    const canvas = this.refs.canvas;
    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);

    // return src
    return canvas.toDataURL("image/png");
  }

  render() {
    return (
      <React.Fragment>
        <ListItem>
          <Avatar src={this.state.thumbnailSrc} />
          <ListItemText primary="Item" />
          <ListItemSecondaryAction>
            <Button onClick={this.props.onDeleteClick}>
              <Delete color="primary" variant="fab" />
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
        <canvas ref="canvas" style={{ display: "none" }} />
      </React.Fragment>
    );
  }
}

export default UploadedImageListItem;
