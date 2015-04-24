var React = require('react/addons');
var Loading = require('../loading/loading.react');
var ReactTransitionGroup = React.addons.CSSTransitionGroup;

var ExpenseImage = React.createClass({
  getInitialState() {
    return {
      loading: true,
      error: false
    };
  },

  imageSuccess() {
    this.setState({
      loading: false,
      error: false
    })
  },

  imageError() {
    this.setState({
      loading: false,
      error: true
    })
  },


  render() {
    var image;
    if (this.state.loading) {
      var img = new Image();
      img.onload = this.imageSuccess;
      img.onerror = this.imageError;

      img.src = this.props.src;
    } else if (this.state.error) {
      image = (
        <span className="icon icon-image"></span>
      );
    } else {
      image = (
        <img src={this.props.src} />
      );
    }


    return (
      <div className="expense-image">
        <Loading show={this.state.loading} size="medium"/>
        <ReactTransitionGroup transitionName="expense-image" transitionLeave={false}>
          {image}
        </ReactTransitionGroup>
      </div>
    );
  }
});

module.exports = ExpenseImage;