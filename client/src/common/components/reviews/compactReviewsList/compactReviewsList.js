import React from "react";
import PropTypes from "prop-types";
// material-ui components
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    marginBottom: theme.spacing.unit * 4,
    width: "100%"
  },
  inline: {
    display: "inline"
  }
});

class CompactReviewsList extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired
      })
    ).isRequired
  };

  render() {
    const { classes, reviews } = this.props;
    return (
      <Paper>
        <List className={classes.paper}>{buildRows(reviews, classes)}</List>
      </Paper>
    );
  }
}

export default withStyles(styles)(CompactReviewsList);

function buildRow(review, classes) {
  const { description, username } = review;
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      </ListItemAvatar>
      <ListItemText
        primary={
          <React.Fragment>
            <Typography
              component="span"
              className={classes.inline}
              color="textPrimary"
            >
              {username}
            </Typography>
            {description.slice(0, 100)}
          </React.Fragment>
        }
      />
    </ListItem>
  );
}

function buildRows(reviews, classes) {
  return reviews.map((review, index) => {
    return (
      <React.Fragment>
        {index === 0 ? <Divider /> : null}
        {buildRow(review, classes)}
        <Divider />
      </React.Fragment>
    );
  });
}
