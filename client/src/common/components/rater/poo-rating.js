import React from "react";
import PropTypes from "prop-types";
import Rating from "@material-ui/lab/Rating";
import PooIcon from "./poo-icon";
import PooIconEmpty from "./poo-icon-empty";

export default function PooRating({
  isReadOnly,
  max,
  name,
  precision,
  size,
  value,
  ...rest
}) {
  return (
    <Rating
      emptyIcon={<PooIconEmpty />}
      icon={<PooIcon />}
      max={max}
      name={name}
      precision={precision}
      readOnly={isReadOnly}
      size={size}
      value={value}
      {...rest}
    />
  );
}

PooRating.propTypes = {
  isReadOnly: PropTypes.bool,
  max: PropTypes.number,
  precision: PropTypes.number,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  value: PropTypes.number.isRequired
};

PooRating.defaultProps = {
  isReadOnly: false,
  max: 5,
  precision: 0.5,
  size: "small"
};
