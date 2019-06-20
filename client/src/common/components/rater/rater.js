import React from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import PoopIconFilled from "../../../poop-icon-filled.png";
import PoopIconNormal from "../../../poop-icon-normal.png";
import PoopIconHovered from "../../../poop-icon-hovered.png";

const styles = {
  disabled: {
    pointerEvents: "none"
  }
};

export default class Rater extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool,
    iconFilled: PropTypes.node,
    iconHovered: PropTypes.node,
    iconNormal: PropTypes.node,
    iconFilledRenderer: PropTypes.func,
    iconHoveredRenderer: PropTypes.func,
    iconNormalRenderer: PropTypes.func,
    itemStyle: PropTypes.object,
    itemClassName: PropTypes.object,
    max: PropTypes.number,
    onChange: PropTypes.func,
    readOnly: PropTypes.bool,
    style: PropTypes.object,
    value: PropTypes.number
  };

  static defaultProps = {
    disabled: false,
    iconFilled: <img alt="filled" src={PoopIconFilled} />,
    iconHovered: <img alt="hovered" src={PoopIconHovered} />,
    iconNormal: <img alt="normal" src={PoopIconNormal} />,
    max: 5,
    readOnly: false,
    value: 0
  };

  constructor(props) {
    super(props);
    this.state = {
      hoverValue: props.value
    };
  }

  renderIcon(i) {
    const filled = i <= this.props.value;
    const hovered = i <= this.state.hoverValue;

    if ((hovered && !filled) || (!hovered && filled)) {
      return this.props.iconHoveredRenderer
        ? this.props.iconHoveredRenderer({
            ...this.props,
            index: i
          })
        : this.props.iconHovered;
    } else if (filled) {
      return this.props.iconFilledRenderer
        ? this.props.iconFilledRenderer({
            ...this.props,
            index: i
          })
        : this.props.iconFilled;
    } else {
      return this.props.iconNormalRenderer
        ? this.props.iconNormalRenderer({
            ...this.props,
            index: i
          })
        : this.props.iconNormal;
    }
  }

  render() {
    const {
      disabled,
      itemStyle,
      itemClassName,
      max,
      onChange,
      readOnly,
      value
    } = this.props;

    const rating = [];

    for (let i = 1; i <= max; i++) {
      const style = { padding: 0, ...itemStyle };
      rating.push(
        <IconButton
          key={i}
          className={itemClassName}
          disabled={disabled}
          style={style}
          onMouseEnter={() => this.setState({ hoverValue: i })}
          onMouseLeave={() => this.setState({ hoverValue: value })}
          onClick={() => {
            if (!readOnly && onChange) {
              onChange(i);
            }
          }}
        >
          {this.renderIcon(i)}
        </IconButton>
      );
    }

    return (
      <div
        style={
          this.props.disabled || this.props.readOnly
            ? { ...styles.disabled, ...this.props.style }
            : this.props.style
        }
      >
        {rating}
      </div>
    );
  }
}
