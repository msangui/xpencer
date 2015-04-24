var React = require('react/addons');

var OptionList = React.createClass({
  onOptionSelected(option) {
    this.props.onOptionSelected(option);
  },

  render() {
    var self = this;
    var options = this.props.options.map(function (option, index) {
      return (<li className="item"
        key={index}
        onClick={self.onOptionSelected.bind(self, option)}>{option.label}</li>)
    });

    return (
      <div className="option-list">
        <ul className="details-list">
          {options}
        </ul>
      </div>
    );
  }
});

module.exports = OptionList;