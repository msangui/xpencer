var React = require('react/addons');

var StoreWatchMixin = require('../../mixins/storeWatchMixin');
var ExpenseActions = require('../../actions/expenseActions');
var LayoutActions = require('../../actions/layoutActions');
var CategoryActions = require('../../actions/categoryActions');

var ExpenseStore = require('../../stores/expenseStore');

var FormControl = require('../common/formControl.react');
var FormInput = require('../common/formInput.react');
var CategoryAutoComplete = require('../category/categoryAutoComplete.react.js');
var FormSelect = require('../common/formSelect.react');
var Loading = require('../loading/loading.react');
var CameraToggle = require('../common/cameraToggle.react');

var CurrencyConstants = require('../../constants/currencyConstants');
var TransitionActions = require('../../actions/transitionActions');

var merge = require('lodash/object/merge');
var moment = require('moment');

var setFormState = function() {
  var expenseId = this.context.router.getCurrentParams().expenseId;
  var storeState = ExpenseStore.getState(expenseId);

  return storeState;
};

var ExpenseForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  mixins: [new StoreWatchMixin({
    store: ExpenseStore,
    setIntialState() {
      var expenseId = this.context.router.getCurrentParams().expenseId;
      return ExpenseStore.getInitialState(expenseId);
    },
    componentWillMount() {
      var expenseId = this.context.router.getCurrentParams().expenseId;
      var storeState = ExpenseStore.getState(expenseId);

      var self = this;

      if (expenseId && !storeState.expense._id && !storeState.loading) {
        // let the component mount first
        ExpenseActions.load(expenseId);
      }


      // set layout
      LayoutActions.setHeader({
        title: expenseId ? 'Edit expense' : 'Add expense',
        navigation: {
          left: {
            icon: 'icon-nav-left',
            action: function () {
              if (expenseId) {
                TransitionActions.go({
                  route: 'viewExpense',
                  params: {
                    expenseId: expenseId
                  },
                  direction: 'back',
                  replace: true
                });
              } else {
                TransitionActions.go({
                  route: 'listExpenses',
                  direction: 'back',
                  replace: true
                });
              }
            }
          },
          right: {
            icon: 'icon-save',
            action: function () {
              self.onSubmit();
            }
          }
        }
      });
    },
    setState: setFormState
  })],

  onChange(key, value) {
    var state = {expense: this.state.expense};
    state.expense[key] = value;
    this.setState(state);
  },

  onCategoryChange(key, value) {
    var state = this.state;
    state.expense.category[key] = value;
    this.setState(state);
  },

  onViewClick() {
    CategoryActions.cleanSuggestions();
  },

  onSubmit() {
    ExpenseActions.save(this.state.expense);
  },

  render() {
    var createdAtInput;

    var currencyOptions = CurrencyConstants.map(function (currency) {
      return {name: currency.name, value: currency.code}
    });

    var validationErrors = this.state.error.validation;
    var expense = this.state.expense;

    if (expense._id) {
      createdAtInput = (
        <FormControl error={validationErrors.createdAt}>
          <FormInput
            label="Created at"
            value={moment(expense.createdAt).format('YYYY-MM-DD')}
            type="date"
            onChange={this.onChange.bind(this, 'createdAt')} />
        </FormControl>
      );
    }

    return (
      <div className="content-container" onClick={this.onViewClick}>
        <div className="expense-form box">
          <Loading show={this.state.loading}/>
          <CameraToggle src={expense.imageSrc}/>
          <div className="form-container">
            <form>
              <FormControl error={validationErrors.name}>
                <FormInput
                  label="Name"
                  value={expense.name}
                  type="text"
                  onChange={this.onChange.bind(this, 'name')} />
              </FormControl>
              <FormControl error={validationErrors.amount}>
                <FormInput id="amount"
                  label="Amount"
                  value={expense.amount}
                  type="number"
                  onChange={this.onChange.bind(this, 'amount')} />
              </FormControl>
              <FormControl error={validationErrors.currency}>
                <FormSelect
                  label="Currency"
                  value={expense.currency}
                  options={currencyOptions}
                  type="text"
                  onChange={this.onChange.bind(this, 'currency')} />
              </FormControl>
              {createdAtInput}
              <FormControl error={validationErrors.category.name} className="form-control-input-auto-complete">
                <CategoryAutoComplete
                  label="Category"
                  value={expense.category.name}
                  onChange={this.onCategoryChange.bind(this, 'name')}
                  type="text"
                />
              </FormControl>
            </form>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ExpenseForm;