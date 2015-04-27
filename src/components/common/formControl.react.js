var React = require('react');
var PureRenderMixin = React.addons.PureRenderMixin;

var FormInput = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    var error;
    if (this.props.error) {
      error = (
        <span className="error-message">{this.props.error}</span>
      );
    }
    return (
      <div className={`form-control ${this.props.className || ''} ${this.props.error ? 'error' : ''}`}>
        {this.props.children}
        {error}
      </div>
    );
  }
});

module.exports = FormInput;