var React = require('react');
var ExpenseStore = require('../../stores/expenseStore');
var ExpenseListItem = require('./expenseListItem.react.js');
var StoreWatchMixin = require('../../mixins/storeWatchMixin');
var Header = require('../layout/header.react');

var getExpenseListState = function() {
  return {
    expenseItems: ExpenseStore.getAllExpenses()
  }
};

var ExpenseList = React.createClass({
  mixins: [new StoreWatchMixin(getExpenseListState, ExpenseStore)],

  navigation: {
    right: {
      icon: 'icon-plus',
      action: function () {
        this.context.router.direction = 'forward';
        this.context.router.transitionTo('addExpense');
      }
    }
  },

  render() {
    var expenseItems = this.state.expenseItems.map(function (expenseItem) {
      return (<ExpenseListItem expenseItem={expenseItem} />);
    });
    return (
      <div>
        <Header title="Expenses" navigation={this.navigation} />
        <div className="content expense-list">
          <ul className="table-view">
          {expenseItems}
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = ExpenseList;