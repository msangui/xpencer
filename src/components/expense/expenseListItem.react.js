var React = require('react');
var Hammer = require('react-hammerjs');


var ExpenseListItem = React.createClass({
  contextTypes: {
    router: React.PropTypes.func,
    navigation: React.PropTypes.object
  },

  viewExpense() {
    this.context.router.direction = 'forward';
    this.context.router.transitionTo('viewExpense', {expenseId: this.props.expenseItem.id});
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