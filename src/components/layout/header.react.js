var React = require('react');
var Hammer = require('react-hammerjs');

var Header = React.createClass({

  contextTypes: {
    router: React.PropTypes.func,
    navigation: React.PropTypes.object
  },

  render() {
    var left;
    var right;
    var navigation = this.props.navigation;
    if (navigation) {
      if (navigation.left) {
        left = <Hammer component="a"
          className={"icon pull-left " + navigation.left.icon}
          onTap={navigation.left.action.bind(this)}></Hammer>
      }
      if (navigation.right) {
        right = <Hammer component="a"
          className={"icon pull-right " + navigation.right.icon}
          onTap={navigation.right.action.bind(this)}></Hammer>
      }
    }

    return (
      <header className="bar bar-nav">
        {left}
        {right}
        <h1 className="title">
          {this.props.title}
        </h1>
      </header>
    );
  }
});

module.exports = Header;