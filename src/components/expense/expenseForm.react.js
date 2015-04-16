var React = require('react');
var ExpenseActions = require('../../actions/expenseActions');
var NotificationActions = require('../../actions/notificationActions');

var ExpenseDetailsStore = require('../../stores/expenseDetailsStore');
var StoreWatchMixin = require('../../mixins/storeWatchMixin');

var Header = require('../layout/header.react');
var FormInput = require('../common/formInput.react');
var Loading = require('../loading/loading.react');

var AppConstants = require('../../constants/appConstants');
var TransitionManager = require('../../utils/transitionManager');

var revalidator = require('revalidator');
var merge = require('lodash/object/merge');

var setExpenseFormState = function(component) {
  var expenseId = component.context.router.getCurrentParams().expenseId;
  var storeState = ExpenseDetailsStore.getStoreState(expenseId);

  if (storeState.transition) {
    TransitionManager.go(component.context.router, storeState.transition);
    return;
  }

  return storeState;
};

var formValidations = {
  properties: {
    name: {
      description: 'the name of the expense',
      type: 'string',
      required: true
    },
    amount: {
      description: 'the amount of the expense',
      type: 'any',
      pattern: '^[0-9]*$',
      required: true
    },
    currency: {
      description: 'the currency of the expense',
      type: 'string',
      required: true
    }
  }
};

var ExpenseForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  mixins: [new StoreWatchMixin(ExpenseDetailsStore, setExpenseFormState)],

  componentWillMount() {
    var expenseId = this.context.router.getCurrentParams().expenseId;
    var storeState = ExpenseDetailsStore.getStoreState(expenseId);

    if (expenseId) {
      // expense remove action through notification
      this.navigation.right = {
        icon: 'icon-trash negative',
        action: function () {
          NotificationActions.show({
            title: 'Delete',
            message: 'Are you sure?',
            cancelable: true,
            acceptCallbackAction: ExpenseActions.remove.call(null, expenseId),
            rejectCallbackAction: ExpenseActions.removeCancelled
          });
        }
      };

      if (!storeState.expense.id && !storeState.loading) {
        // let the component mount first
        ExpenseActions.load(expenseId);
      }

    } else {
      this.navigation.right = false;
    }

  },

  onChange(key, value) {
    var state = merge({}, this.state);
    state.expense[key] = value;
    this.setState(state);
  },

  onSubmit() {
    ExpenseActions.save(this.state.expense);
  },

  navigation: {
    left: {
      icon: 'icon-left-nav',
      action: function () {
        var expenseId = this.context.router.getCurrentParams().expenseId;
        if (expenseId) {
          TransitionManager.go(this.context.router, {
            route: 'viewExpense',
            params: {
              expenseId: expenseId
            },
            direction: 'back',
            replace: true
          });
        } else {
          TransitionManager.go(this.context.router, {
            route: 'listExpenses',
            direction: 'back',
            replace: true
          });
        }
      }
    }
  },

  render() {
    var title = this.state.expense.id ? this.state.expense.name : 'Add new expense';

    var validation = revalidator.validate(this.state.expense, formValidations);

    return (
      <div>
        <Header title={title} navigation={this.navigation} />
        <section className="content">
          <Loading show={this.state.loading}/>
          <div className="content-padded">
            <form>
              <FormInput id="name"
                label="Name"
                value={this.state.expense.name}
                type="text" onChange={this.onChange} />
              <FormInput id="amount"
                label="Amount"
                value={this.state.expense.amount}
                type="number" onChange={this.onChange} />
              <FormInput id="currency"
                label="Currency"
                value={this.state.expense.currency}
                type="text" onChange={this.onChange} />
              <button type="button"
                disabled={!validation.valid}
                className="btn btn-positive btn-block"
                onClick={this.onSubmit}>
              Save
              </button>
            </form>
          </div>
        </section>
      </div>
    );
  }
});

module.exports = ExpenseForm;