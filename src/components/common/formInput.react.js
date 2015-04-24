var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;

var FormInput = React.createClass({

  mixins: [PureRenderMixin],

  onChange(event) {
    var value = event.target.value;
    if (value && this.props.type === 'number') {
      value = parseFloat(value);
    }
    this.props.onChange(value);
  },

  onBlur() {
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  },

  onFocus() {
    if (this.props.onFocus) {
      this.props.onFocus();
    }
  },

  render() {
    return (
      <input className={this.props.className}
        value={this.props.value}
        type={this.props.type}
        placeholder={this.props.label}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onChange={this.onChange} />
    );
  }
});

module.exports = FormInput;