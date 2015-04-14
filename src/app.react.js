var React = require('react/addons');
var Router = require('react-router');
var {RouteHandlerMixin, State, DefaultRoute, Route, RouteHandler, Link } = Router;
var ReactTransitionGroup = React.addons.CSSTransitionGroup;

var ExpenseList = require('./components/expense/expenseList.react');
var ExpenseForm = require('./components/expense/expenseForm.react');
var ExpenseItem = require('./components/expense/expenseItem.react');


var App = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  render() {
    var name = this.context.router.getCurrentPath();
    return (
      <ReactTransitionGroup transitionName={this.context.router.direction} component="div">
        <RouteHandler key={name}/>
      </ReactTransitionGroup>
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
