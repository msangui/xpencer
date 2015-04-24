var React = require('react/addons');
var Router = require('react-router');
var FastClick = require('fastclick');
var {RouteHandlerMixin, State, DefaultRoute, Route, RouteHandler, Link } = Router;
var ReactTransitionGroup = React.addons.CSSTransitionGroup;

var ExpenseList = require('./components/expense/expenseList.react');
var ExpenseForm = require('./components/expense/expenseForm.react');
var ExpenseItem = require('./components/expense/expenseItem.react');
var Notification = require('./components/notification/notification.react');
var Modal = require('./components/common/modal.react');
var ContextMenu = require('./components/common/contextMenu.react');
var Header = require('./components/layout/header.react');

var TransitionStore = require('./stores/transitionStore');
var TransitionManager = require('./common/utils/transitionManager');
var TransitionActions = require('./actions/transitionActions');


FastClick(document.body);

var App = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  componentWillMount(){
    TransitionStore.addChangeListener(this._onTransition);
  },

  componentWillUnmount(){
    TransitionStore.removeChangeListener(this._onTransition);
  },

  _onTransition(){
    var transition = TransitionStore.getTransition();
    if (transition) {
      TransitionManager.go(this.context.router, transition);
    }
  },

  statics: {
    willTransitionTo: function () {
      TransitionActions.went();
    }
  },

  render() {
    var name = this.context.router.getCurrentPath();
    return (
      <div className="container">
        <Notification />
        <Header />
        <ContextMenu />
        <Modal />
        <ReactTransitionGroup transitionName={this.context.router.direction || 'forward'}>
          <RouteHandler key={name}/>
        </ReactTransitionGroup>
      </div>
    );
  }

});

var routes = (
  <Route handler={App}>
    <DefaultRoute handler={ExpenseList} />
    <Route name="listExpenses" path="/expenses" handler={ExpenseList} />
    <Route name="addExpense" path="/expenses/new" handler={ExpenseForm} />
    <Route name="editExpense" path="/expenses/:expenseId/edit" handler={ExpenseForm} />
    <Route name="viewExpense" path="/expenses/:expenseId" handler={ExpenseItem} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});
