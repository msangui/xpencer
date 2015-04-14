var React = require('react');
var FormInput = require('../common/formInput.react');
var ExpenseActions = require('../../actions/expenseActions');
var ExpenseStore = require('../../stores/expenseStore');
var StoreWatchMixin = require('../../mixins/storeWatchMixin');
var Header = require('../layout/header.react');

var getExpenseFormState = function(component) {
  var routerParams = component.context.router.getCurrentParams();

  if (routerParams.expenseId) {

    component.navigation.right = {
      icon: 'icon-trash negative',
        action: function () {
        var routerParams = component.context.router.getCurrentParams();
        ExpenseActions.remove(routerParams.expenseId);
        this.context.router.transitionTo('listExpenses');
      }
    };

    return {
      expenseItem: ExpenseStore.getExpense(routerParams.expenseId)
    };
  } else {
    return {
      expenseItem: {
        name: '',
        amount: 0,
        currency: 'USD'
      }
    };
  }
};

var ExpenseForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.func,
    navigation: React.PropTypes.object
  },

  mixins: [new StoreWatchMixin(getExpenseFormState, ExpenseStore)],

  onChange(key, value) {
    var expenseItem = this.state.expenseItem;
    expenseItem[key] = value;

    this.setState({expenseItem: expenseItem});
  },

  onSubmit() {
    this.context.router.direction = 'back';
    if (this.state.expenseItem.id) {
      ExpenseActions.update(this.state.expenseItem);
    } else {
      ExpenseActions.add(this.state.expenseItem);
    }
    this.context.router.goBack();
  },

  navigation: {
    left: {
      icon: 'icon-left-nav',
      action: function () {
        this.context.router.direction = 'back';
        this.context.router.goBack();
      }
    }
  },


  render() {
    var title = this.state.expenseItem.name;
    if (!title) {
      title = 'Add expense'
    }
    return (
      <div>
        <Header title={title} navigation={this.navigation} />
        <section className="content">
          <div className="content-padded">
            <form>
              <FormInput id="name"
                label="Name"
                value={this.state.expenseItem.name}
                type="text" onChange={this.onChange} />
              <FormInput id="amount"
                label="Amount"
                value={this.state.expenseItem.amount}
                type="number" onChange={this.onChange} />
              <FormInput id="currency"
                label="Currency"
                value={this.state.expenseItem.currency}
                type="text" onChange={this.onChange} />
              <button type="button" className="btn btn-positive btn-block" onClick={this.onSubmit}>
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