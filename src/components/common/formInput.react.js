var React = require('react');

var FormInput = React.createClass({
  onChange(event) {
    this.props.onChange(this.props.id, event.target.value);
  },

  render() {
    return (
      <input className={this.props.className}
        value={this.props.value}
        type={this.props.type}
        placeholder={this.props.label}
        onChange={this.onChange} />
    );
  }
});

module.exports = FormInput;