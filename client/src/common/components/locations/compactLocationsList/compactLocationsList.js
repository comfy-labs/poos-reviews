import React from "react";
import PropTypes from "prop-types";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import Rater from "../../rater/rater";

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
    const { classes, locations } = this.props;
    return (
      <Paper>
        <List className={classes.paper} dense>
          {locations.map((location, index) => {
            return (
              <div key={index}>
                {index === 0 ? <Divider /> : null}
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Rater value={location.rating} max={5} readOnly />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <React.Fragment>
                        <Typography
                          component="div"
                          color="textPrimary"
                          display="inline"
                          variant="h6"
                        >
                          {location.name}
                        </Typography>
                        <Typography
                          component="div"
                          color="textSecondary"
                          display="inline"
                          noWrap
                          variant="h6"
                        >
                          {location.description.slice(0, 100)}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider />
              </div>
            );
          })}
        </List>
      </Paper>
    );
  }
}

export default withStyles(theme => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    marginBottom: theme.spacing(4),
    width: "100%"
  },
  inline: {
    display: "inline"
  }
}))(CompactReviewsList);
