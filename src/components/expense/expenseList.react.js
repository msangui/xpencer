var React = require('react');
var ExpenseListStore = require('../../stores/expenseListStore');
var ExpenseActions = require('../../actions/expenseActions');
var LayoutActions = require('../../actions/layoutActions');
var TransitionActions = require('../../actions/transitionActions');

var StoreWatchMixin = require('../../mixins/storeWatchMixin');
var PureRenderMixin = React.addons.PureRenderMixin;

var ExpenseListItem = require('./expenseListItem.react.js');
var Header = require('../layout/header.react');
var Loading = require('../loading/loading.react');

function setExpenseListState() {
  return ExpenseListStore.getState(new Date().getMonth() + 1);
}

var ExpenseList = React.createClass({
  mixins: [new StoreWatchMixin({
    store: ExpenseListStore,
    setState: setExpenseListState,
    componentWillMount() {
      var storeState = ExpenseListStore.getState();

      if (!storeState.expenses && !storeState.loading) {
        // no expense loaded yet!
        // let the component mount first
        ExpenseActions.loadAll(new Date().getMonth() + 1);
      }

      // set layout
      LayoutActions.setHeader({
        title: 'Expenses',
        navigation: {
          right: {
            icon: 'icon-plus',
            action: function () {
              TransitionActions.go({
                direction: 'forward',
                route: 'addExpense'
              });
            }
          }
        }
      });
    }
  }), PureRenderMixin],

  render() {
    var expenses;
    var expenseList;
    if (this.state.expenses) {
      expenses = this.state.expenses.map(function (expense) {
        return (<ExpenseListItem key={expense._id} expense={expense} />);
      });
      expenseList = (
        <ul>
          {expenses}
        </ul>
      )
    }

    return (
      <div className="content-container">
        <Loading show={this.state.loading}/>
        <div className="expense-list">
          {expenseList}
        </div>
      </div>
    );
  }
});

module.exports = ExpenseList;