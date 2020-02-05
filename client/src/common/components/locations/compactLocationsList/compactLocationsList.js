import React from "react";
import PropTypes from "prop-types";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { ListSubheader } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import PooRating from "../../rater/poo-rating";

class CompactLocationsList extends React.Component {
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
        <List
          className={classes.paper}
          dense
          subheader={
            <ListSubheader component="div">Places to Poo</ListSubheader>
          }
        >
          {locations.map((location, index) => {
            return (
              <div key={index}>
                {index === 0 ? <Divider /> : null}
                <ListItem alignItems="center">
                  <ListItemAvatar>
                    <PooRating isReadOnly value={location.rating} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        component="div"
                        color="textPrimary"
                        display="block"
                        noWrap
                        style={{ marginLeft: 10 }}
                        variant="subtitle1"
                      >
                        {location.name}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        component="div"
                        color="textSecondary"
                        display="block"
                        noWrap
                        style={{ marginLeft: 10 }}
                        variant="subtitle1"
                      >
                        {location.description.slice(0, 100)}
                      </Typography>
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
}))(CompactLocationsList);
