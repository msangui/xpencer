var React = require('react');

var CustomLink =
  React.createClass({

    contextTypes: {
      router: React.PropTypes.func,
      navigation: React.PropTypes.object
    },

    onClick() {
      this.context.router.direction = 'forward';

      if (this.props.back) {
        this.context.router.direction = 'back';
      }

      this.context.router.transitionTo(
        this.props.to,
        this.props.params
      );
    },

    getToHref() {
      return this.context.router.makeHref(this.props.to, this.props.params);
    },

    render() {
      return (
        <a className={this.props.className} href={this.getToHref()} onClick={this.onClick}>
        {this.props.children}
        </a>
      );
    }
  });

module.exports = CustomLink;
