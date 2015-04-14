var React = require('react');
var Header = require('../layout/header.react');
var ExpenseActions = require('../../actions/expenseActions');
var ExpenseStore = require('../../stores/expenseStore');
var StoreWatchMixin = require('../../mixins/storeWatchMixin');

var getExpenseItemState = function(component) {
  var routerParams = component.context.router.getCurrentParams();

  return {
    expenseItem: ExpenseStore.getExpense(routerParams.expenseId)
  };
};

var ExpenseItem = React.createClass({

  mixins: [new StoreWatchMixin(getExpenseItemState, ExpenseStore)],

  contextTypes: {
    router: React.PropTypes.func,
    navigation: React.PropTypes.object
  },

  navigation: {
    left: {
      icon: 'icon-left-nav',
      action: function () {
        this.context.router.direction = 'back';
        this.context.router.goBack();
      }
    },
    right: {
      icon: 'icon-edit',
      action: function () {
        var routerParams = this.context.router.getCurrentParams();

        this.context.router.direction = 'forward';
        this.context.router.transitionTo('editExpense', {expenseId: routerParams.expenseId});
      }
    }
  },

  render() {
    return (
      <div>
        <Header title={this.state.expenseItem.name} navigation={this.navigation} />
        <div className="content">
          <div className="expense-item">
            <ul className="table-view">
              <li className="table-view-cell">Name: {this.state.expenseItem.name}</li>
              <li className="table-view-cell">Amount: {this.state.expenseItem.amount}</li>
              <li className="table-view-cell">Currency: {this.state.expenseItem.currency}</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ExpenseItem;