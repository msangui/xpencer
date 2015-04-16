var React = require('react');
var ExpenseListStore = require('../../stores/expenseListStore');
var ExpenseActions = require('../../actions/expenseActions');
var StoreWatchMixin = require('../../mixins/storeWatchMixin');
var ExpenseListItem = require('./expenseListItem.react.js');
var Header = require('../layout/header.react');
var Loading = require('../loading/loading.react');

function setExpenseListState() {
  var storeState = ExpenseListStore.getStoreState();

  return storeState;
}

var ExpenseList = React.createClass({
  mixins: [new StoreWatchMixin(ExpenseListStore, setExpenseListState)],

  navigation: {
    right: {
      icon: 'icon-plus',
      action: function () {
        this.context.router.direction = 'forward';
        this.context.router.transitionTo('addExpense');
      }
    }
  },

  componentWillMount() {
    var storeState = ExpenseListStore.getStoreState();

    if (!storeState.expenses && !storeState.loading) {
      // no expense loaded yet!
      // let the component mount first
      ExpenseActions.loadAll();
    }
  },
  render() {
    var expenseItems;
    if (this.state.expenses) {
      expenseItems = this.state.expenses.map(function (expenseItem) {
        return (<ExpenseListItem expenseItem={expenseItem} />);
      });
    }

    return (
      <div>
        <Header title="Expenses" navigation={this.navigation} />
        <div className="content expense-list">
          <Loading show={this.state.loading}/>
          <ul className="table-view">
            {expenseItems}
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = ExpenseList;