var React = require('react');

var StoreWatchMixin = require('../../mixins/storeWatchMixin');
var CategoryActions = require('../../actions/categoryActions');
var CategoryListStore = require('../../stores/categoryListStore');

var FormInputAutoComplete = require('../common/formInputAutoComplete.react');

function setCategoryAutoCompleteState() {
  return {
    suggestions: CategoryListStore.getState().categories.map(function (category) {
      return category.name;
    })
  };
}

var categoryInputTimeoutToken;

var CategoryAutoComplete = React.createClass({
  mixins: [new StoreWatchMixin({
    store: CategoryListStore,
    setInitialState: CategoryListStore.getInitialState,
    setState: setCategoryAutoCompleteState
  })],

  onChange(value) {

    if (categoryInputTimeoutToken) {
      clearTimeout(categoryInputTimeoutToken);
    }

    if (value) {
      categoryInputTimeoutToken = setTimeout(function () {
        CategoryActions.getCategoriesByTerm(value);
      }, 400);
    }

    this.props.onChange(value);
  },

  onFocus(event) {
    var value = event.target.value;
    event.stopPropagation();
    this.onChange(value);
  },

  onSelect(suggestion, event) {
    event.stopPropagation();
    this.setState({
      suggestions: []
    });
    this.props.onChange(suggestion);
  },

  render() {
    var {onChange, ...other} = this.props;
    return (
      <FormInputAutoComplete
        {...other}
        onFocus={this.onFocus}
        suggestions={this.state.suggestions}
        onChange={this.onChange}
        onSelect={this.onSelect}/>
    );
  }
});

module.exports = CategoryAutoComplete;

