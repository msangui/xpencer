var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;

var FormSelect = React.createClass({

  mixins: [PureRenderMixin],

  onChange(event) {
    console.log('select change');
    this.props.onChange(event.target.value);
  },

  onFocus(event) {
    event.stopPropagation();
  },

  render() {
    var options = this.props.options.map(function(option) {
      return (<option key={option.value} value={option.value}>{option.name}</option>);
    });

    var selectClass = !this.props.value ? ' empty' : '';

    return (
      <select className={this.props.className + selectClass}
        value={this.props.value}
        onFocus={this.onFocus}
        onChange={this.onChange}>
        <option value="">{this.props.label}</option>
        {options}
      </select>

    );
  }
});

module.exports = FormSelect;