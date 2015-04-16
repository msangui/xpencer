var React = require('react');
var Hammer = require('react-hammerjs');
var TransitionManager = require('../../utils/transitionManager');

var ExpenseListItem = React.createClass({
  contextTypes: {
    router: React.PropTypes.func,
    navigation: React.PropTypes.object
  },

  viewExpense() {
    TransitionManager.go(this.context.router, {
      route: 'viewExpense',
      params: {
        expenseId: this.props.expenseItem.id
      }
    });
  },

  render() {
    return (
      <Hammer component="li" className="table-view-cell media" onTap={this.viewExpense}>
        <a className="navigate-right">
          <div class="media-body">
            {this.props.expenseItem.name}
            <p>
             {this.props.expenseItem.amount} - {this.props.expenseItem.currency}
            </p>
          </div>
        </a>
      </Hammer>
    );
  }
});

module.exports = ExpenseListItem;