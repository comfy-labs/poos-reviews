import React from "react";
import PropTypes from "prop-types";
// material-ui components
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import Rater from "../../rater/rater";

function buildRow(location, classes) {
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Rater value={location.rating} max={5} readOnly />
      </ListItemAvatar>
      <ListItemText
        primary={
          <React.Fragment>
            <Typography component="div" color="textPrimary" inline variant="h6">
              {location.name}
            </Typography>
            <Typography
              component="div"
              color="textSecondary"
              inline
              noWrap
              variant="h6"
            >
              {location.description.slice(0, 100)}
            </Typography>
          </React.Fragment>
        }
      />
    </ListItem>
  );
}

function buildRows(locations, classes) {
  return locations.map((location, index) => {
    return (
      <div key={index}>
        {index === 0 ? <Divider /> : null}
        {buildRow(location, classes)}
        <Divider />
      </div>
    );
  });
}

class CompactReviewsList extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    locations: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired
      })
    ).isRequired
  };

  render() {
    return (
      <Paper>
        <List className={this.props.classes.paper}>
          {buildRows(this.props.locations, this.props.classes)}
        </List>
      </Paper>
    );
  }
}

export default withStyles(theme => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    marginBottom: theme.spacing.unit * 4,
    width: "100%"
  },
  inline: {
    display: "inline"
  }
}))(CompactReviewsList);
