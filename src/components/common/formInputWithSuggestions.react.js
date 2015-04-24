var React = require('react/addons');
var ReactTransitionGroup = React.addons.CSSTransitionGroup;

var FormInputWithSuggestions = React.createClass({

  onChange(event) {
    this.props.onChange(event.target.value);
  },

  onSelectSuggestion(suggestion) {
    this.props.onSuggestionSelected(suggestion)
  },

  onBlur() {
    this.props.onBlur();
  },

  render() {
    var suggestions;
    var suggestionList;
    var self = this;
    if (this.props.suggestions) {
      suggestions = this.props.suggestions.map(function (suggestion, index) {
        return (
          <li onClick={self.onSelectSuggestion.bind(self, suggestion)}
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

    var formControlClass = 'form-input-with-suggestions form-control';

    var error;
    if (this.props.error) {
      formControlClass += ' error';
      error = (
        <span className="error-message">{this.props.error}</span>
      );
    }

    return (
      <div className={formControlClass}>
        <input className={this.props.className}
          value={this.props.value}
          type={this.props.type}
          placeholder={this.props.label}
          onBlur={this.onBlur}
          onChange={this.onChange}>
            <div className="suggestion-container">
            {suggestionList}
            </div>
        </input>
        {error}
      </div>
    );
  }
});

module.exports = FormInputWithSuggestions;