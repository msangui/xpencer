var React = require('react/addons');
var ReactTransitionGroup = React.addons.CSSTransitionGroup;
var FormInput = require('./formInput.react');

var FormInputAutoComplete = React.createClass({


  onSelect(suggestion) {
    this.props.onSelect(suggestion)
  },

  render() {
    var suggestions;
    var suggestionList;
    var self = this;

    if (this.props.suggestions) {
      suggestions = this.props.suggestions.map(function (suggestion, index) {
        return (
          <li onClick={self.onSelect.bind(self, suggestion)}
            className="suggestion"
            key={'suggestion-' + index}>
          {suggestion}
          </li>
        );
      });
      suggestionList = (
        <ReactTransitionGroup component="ul" className="suggestion-list" transitionName="suggestion-list">
        {suggestions}
        </ReactTransitionGroup>
      );
    }


    return (
      <div className="form-input-auto-complete">
        <FormInput
          {...this.props}/>
        <div className="suggestion-container">{suggestionList}</div>
      </div>
    );
  }
});

module.exports = FormInputAutoComplete;