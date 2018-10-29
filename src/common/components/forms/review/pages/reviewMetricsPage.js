// import React from "react";
// import Grid from "@material-ui/core/Grid";
// import Typography from "@material-ui/core/Typography";
// import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";

// import PropTypes from 'prop-types';
// import classNames from 'classnames';
// import MenuItem from "@material-ui/core/MenuItem";




// function ReviewMetricsPage() {

//   const { classes } = this.props;
//   const accessibilities = [
//     {
//       value: 'USD',
//       label: '$',
//     },
//     {
//       value: 'EUR',
//       label: '€',
//     },
//     {
//       value: 'BTC',
//       label: '฿',
//     },
//     {
//       value: 'JPY',
//       label: '¥',
//     },
//   ];

//   return (
//     <React.Fragment>
//       <Typography variant="h6" gutterBottom>
//         Write a Review
//       </Typography>
//       <Grid container spacing={24}>
//         <Grid item xs={12}>
//           <TextField
//             required
//             id="bathroomName"
//             name="bathroomName"
//             label="Bathroom Name"
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             required
//             id="geoocation"
//             name="geoocation"
//             label="Bathroom Location"
//             fullWidth
//           />
//         {/*
//             field should be populated with location ID used with maps
//             and a "current location" option
//             how to make this selectable? library we can use?
//         */}
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             required
//             id="reviewText"
//             name="reviewText"
//             label="Review / Description"
//             fullWidth
//             multiline
//             rows="4"
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             id="accessibility"
//             name="accessibility"
//             label="Accessibility"
//             fullWidth


//             select

//           className={classes.textField}
//           value={this.state.accessibility}
//           SelectProps={{
//             native: true,
//             MenuProps: {
//               className: classes.menu,
//             },
//           }}
//           helperText="Please select your accessibility"
//           margin="normal"
//           variant="filled"
//         />
//           {accessibilities.map(option => (
//             <option key={option.value} value={option.value}>
//               {option.label}
//             </option>
//           ))}




//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             required
//             id="city"
//             name="city"
//             label="City"
//             fullWidth
//             autoComplete="billing address-level2"
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             id="state"
//             name="state"
//             label="State/Province/Region"
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             required
//             id="zip"
//             name="zip"
//             label="Zip / Postal code"
//             fullWidth
//             autoComplete="billing postal-code"
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             required
//             id="country"
//             name="country"
//             label="Country"
//             fullWidth
//             autoComplete="billing country"
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <FormControlLabel
//             control={
//               <Checkbox color="secondary" name="saveAddress" value="yes" />
//             }
//             label="Use this address for payment details"
//           />
//         </Grid>
//       </Grid>
//     </React.Fragment>
//   );
// }

// export default ReviewMetricsPage;














import React from 'react';
import Typography from "@material-ui/core/Typography";

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});

const accessibilities = [
  {
    value: 'public',
    label: 'Open to Public',
  },
  {
    value: 'customers',
    label: 'Customers Only',
  },
  {
    value: 'private',
    label: 'Privately Owned',
  },
];

const privacies = [
  {
    value: '1',
    label: 'Not Private',
  },
  {
    value: '2',
    label: 'Kinda Private',
  },
  {
    value: '3',
    label: 'Mostly Private',
  },
  {
    value: '4',
    label: 'Absolutely Private',
  },
];

const cleanlinesses = [
  {
    value: '1',
    label: 'Very Unclean',
  },
  {
    value: '2',
    label: 'Not Very Clean',
  },
  {
    value: '3',
    label: 'Mostly Clean',
  },
  {
    value: '4',
    label: 'Sparkling Clean',
  },
];

const tpQualities = [
  {
    value: '1',
    label: 'Poor',
  },
  {
    value: '2',
    label: 'Not Good',
  },
  {
    value: '3',
    label: 'Good',
  },
  {
    value: '4',
    label: 'Great',
  },
];


class FilledTextFields extends React.Component {
  state = {
    name: 'Cat in the Hat',
    age: '',
    multiline: 'Controlled',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (

     <React.Fragment>
      <form className={classes.container} noValidate autoComplete="off">

        <Typography variant="h6" gutterBottom>
          Write a Review
        </Typography>
         <Grid item xs={12}>
           <TextField
            required
            id="bathroomName"
            name="bathroomName"
            label="Bathroom Name"
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="geoocation"
            name="geoocation"
            label="Bathroom Location"
            fullWidth
            margin="normal"
          />
        </Grid>
        <br/>
        <Grid item xs={12}>
          <TextField
            id="accessibility"
            select
            fullWidth
            label="Accessibility"
            className={classes.textField}
            value={this.state.accessibility}
            onChange={this.handleChange('accessibility')}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            helperText="Is this bathroom available to the public?"
            margin="normal"
          >
            {accessibilities.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>


        <Grid item xs={12}>

          <TextField
            id="privacy"
            select
            fullWidth
            label="Privacy"
            className={classes.textField}
            value={this.state.privacy}
            onChange={this.handleChange('privacy')}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            helperText="Rate the privacy of this bathroom."
            margin="normal"

          >
            {privacies.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>


        <Grid item xs={12}>

          <TextField
            id="numStalls"
            label="Number of Stalls"
            value={this.state.numStalls}
            onChange={this.handleChange('numStalls')}
            type="number"
            className={classes.textField}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />


        </Grid>
        <Grid item xs={12}>

        <TextField
          id="cleanliness"
          select
          label="Cleanliness"
          className={classes.textField}
          value={this.state.cleanliness}
          onChange={this.handleChange('cleanliness')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="How clean is this bathroom?"
          margin="normal"

        >
          {cleanlinesses.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        </Grid>

        <Grid item xs={12} >

          <TextField
            id="tpQuality"
            select
            label="Toilet Paper Quality"
            className={classes.textField}
            value={this.state.tpQuality}
            onChange={this.handleChange('tpQuality')}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            helperText="How good or bad was the toilet paper."
            margin="normal"

          >
            {tpQualities.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>


        <Grid item xs={12}>
          <TextField
            required
            id="reviewText"
            name="reviewText"
            label="Review / Description"
            fullWidth
            multiline
            rows="4"
            margin="normal"
          />
        </Grid>
      </form>

     </React.Fragment>
    );
  }
}

FilledTextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FilledTextFields);
