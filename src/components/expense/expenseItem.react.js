var React = require('react/addons');

var ExpenseStore = require('../../stores/expenseStore');
var StoreWatchMixin = require('../../mixins/storeWatchMixin');
var PureRenderMixin = React.addons.PureRenderMixin;

var TransitionActions = require('../../actions/transitionActions');
var ExpenseActions = require('../../actions/expenseActions');
var ContextMenuAction = require('../../actions/contextMenuActions');
var LayoutActions = require('../../actions/layoutActions');
var NotificationActions = require('../../actions/notificationActions');

var Loading = require('../loading/loading.react');
var OptionList = require('../common/optionList.react');
var ExpenseImage = require('../expense/expenseImage.react');


var moment = require('moment');

var setExpenseState = function(transition) {
  var routerParams = this.context.router.getCurrentParams();

  if (transition) {
    TransitionActions.go(transition);
    return;
  }

  return ExpenseStore.getState(routerParams.expenseId);
};

var ExpenseItem = React.createClass({

  mixins: [new StoreWatchMixin({
    store: ExpenseStore,
    setState: setExpenseState,
    componentWillMount() {
      var expenseId = this.context.router.getCurrentParams().expenseId;
      var storeState = ExpenseStore.getState(expenseId);

      if (storeState.expense && !storeState.expense._id && !storeState.loading) {
        // let the component mount first
        ExpenseActions.load(expenseId);
      }

      // set layout
      LayoutActions.setHeader({
        title: 'Expense details',
        navigation: {
          left: {
            icon: 'icon-nav-left',
            action: function () {
              TransitionActions.go({
                route: 'listExpenses',
                direction: 'back',
                replace: true
              });
            }
          },
          right: {
            icon: 'icon-more-vert inactive',
            action: function () {
              var options = [
                {
                  label: (
                    <div>
                      <span className="icon icon-edit"></span>
                      <span className="context-menu-item-title">Edit</span>
                    </div>
                  ),
                  handler: function () {
                    TransitionActions.go({
                      route: 'editExpense',
                      params: {
                        expenseId: expenseId
                      },
                      direction: 'forward'
                    });
                  }
                },
                {
                  label: (
                    <div>
                      <span className="icon icon-trash"></span>
                      <span className="context-menu-item-title">Delete</span>
                    </div>
                  ),
                  handler: function () {
                    NotificationActions.show({
                      title: 'Delete',
                      message: 'Are you sure?',
                      cancelable: true,
                      acceptCallbackAction: ExpenseActions.remove.bind(null, expenseId),
                      rejectCallbackAction: ExpenseActions.removeCancelled
                    });
                  }
                }
              ];

              function onSelect(option) {
                option.handler.bind(this)();
              }

              ContextMenuAction.open({
                position: 'right-position',
                content: (
                  <div>
                    <span className="icon icon-more-vert action-icon"></span>
                    <OptionList options={options} onOptionSelected={onSelect}/>
                  </div>
                )
              })
            }
          }
        }
      });
    }
  }), PureRenderMixin],

  contextTypes: {
    router: React.PropTypes.func
  },

  render() {
    return (
      <div className="content-container">
        <Loading show={this.state.loading}/>
        <div className="box expense-item">
          <ul className="details-list">
            <li>
              <ExpenseImage src={this.state.expense.imageSrc} />
            </li>
            <li className="item">
              <h4>Name</h4>
              <p>{this.state.expense.name}</p>
            </li>
            <li className="item">
              <h4>Amount</h4>
              <p>{this.state.expense.amount}</p>

            </li>
            <li className="item">
              <h4>Currency</h4>
              <p>{this.state.expense.currency}</p>
            </li>
            <li className="item">
              <h4>Date</h4>
              <p>{moment(this.state.expense.createdAt).format('dddd, MMMM Do YYYY, h:mm:ss a')}</p>
            </li>
            <li className="item">
              <h4>Category</h4>
              <p>{this.state.expense.category.name}</p>
            </li>
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = ExpenseItem;