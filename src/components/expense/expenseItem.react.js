var React = require('react');
var Header = require('../layout/header.react');
var ExpenseDetailsStore = require('../../stores/expenseDetailsStore');
var StoreWatchMixin = require('../../mixins/storeWatchMixin');
var ExpenseActions = require('../../actions/expenseActions');
var Loading = require('../loading/loading.react');
var TransitionManager = require('../../utils/transitionManager');

var setExpenseDetailsState = function(component) {
  var routerParams = component.context.router.getCurrentParams();

  return ExpenseDetailsStore.getStoreState(routerParams.expenseId);
};

var ExpenseItem = React.createClass({

  mixins: [new StoreWatchMixin(ExpenseDetailsStore, setExpenseDetailsState)],

  contextTypes: {
    router: React.PropTypes.func
  },

  componentWillMount() {
    var routerParams = this.context.router.getCurrentParams();
    var storeState = ExpenseDetailsStore.getStoreState(routerParams.expenseId);

    if (!storeState.expense.id && !storeState.loading) {
      // let the component mount first
      ExpenseActions.load(routerParams.expenseId);
    }
  },

  navigation: {
    left: {
      icon: 'icon-left-nav',
      action: function () {
        TransitionManager.go(this.context.router, {
          route: 'listExpenses',
          direction: 'back',
          replace: true
        });
      }
    },
    right: {
      icon: 'icon-edit',
      action: function () {
        var routerParams = this.context.router.getCurrentParams();
        TransitionManager.go(this.context.router, {
          route: 'editExpense',
          params: {
            expenseId: routerParams.expenseId
          }
        });
      }
    }
  },

  render() {

    return (
      <div>
        <Header title={this.state.expense.name || 'Loading...'} navigation={this.navigation} />
        <div className="content">
          <Loading show={this.state.loading}/>
          <div className="expense-item">
            <ul className="table-view">
              <li className="table-view-cell">Name: {this.state.expense.name}</li>
              <li className="table-view-cell">Amount: {this.state.expense.amount}</li>
              <li className="table-view-cell">Currency: {this.state.expense.currency}</li>
              <li className="table-view-cell">Created: {this.state.expense.createdAt}</li>
              <li className="table-view-cell">Update: {this.state.expense.updatedAt}</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ExpenseItem;