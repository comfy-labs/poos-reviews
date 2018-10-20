import React from "react";
import PropTypes from "prop-types";

export class WizardPage extends React.Component {
  static propTypes = {
    isHidden: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired
  };

  render() {
    return this.props.isHidden ? null : this.props.children;
  }
}

class Wizard extends React.Component {
  static propTypes = {
    defaultPageIndex: PropTypes.number,
    pageCount: PropTypes.number.isRequired,
    render: PropTypes.func.isRequired
  };

  state = { currentPageIndex: this.props.defaultPageIndex || 0 };

  goBack = () => {
    this.setState(state => {
      const { currentPageIndex } = state;
      return {
        currentPageIndex:
          currentPageIndex > 0 ? currentPageIndex - 1 : currentPageIndex
      };
    });
  };

  goForward = () => {
    this.setState(state => {
      const { currentPageIndex } = state;
      return {
        currentPageIndex:
          currentPageIndex === this.props.pageCount - 1
            ? currentPageIndex
            : currentPageIndex + 1
      };
    });
  };

  render() {
    return this.props.render({
      currentPageIndex: this.state.currentPageIndex,
      goBack: this.goBack,
      goForward: this.goForward
    });
  }
}

export default Wizard;
