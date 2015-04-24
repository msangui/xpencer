var React = require('react');
var PureRenderMixin = React.addons.PureRenderMixin;

var FormInput = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    var formControlClass = 'form-control ' + this.props.className;

    var error;
    if (this.props.error) {
      formControlClass += ' error';
      error = (
        <span className="error-message">{this.props.error}</span>
      );
    }
    return (
      <div className={formControlClass}>
        {this.props.children}
        {error}
      </div>
    );
  }
});

module.exports = FormInput;