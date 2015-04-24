var React = require('react/addons');
var TransitionActions = require('../../actions/transitionActions');
var PureRenderMixin = React.addons.PureRenderMixin;

var ExpenseListItem = React.createClass({

  mixins: [PureRenderMixin],

  viewExpense() {
    TransitionActions.go({
      route: 'viewExpense',
      params: {
        expenseId: this.props.expense._id
      }
    });
  },

  render() {
    var imageLoaded = 'col-xs-1 image-loaded';

    if (this.props.expense.imageSrc) {
      imageLoaded += ' loaded';
    }

    return (
      <li className="box expense-list-item" onClick={this.viewExpense}>
        <div className="row">
          <div className={imageLoaded}>
            <span className="icon icon-image"></span>
          </div>
          <div className="col-xs-9 details">
            <h4 className="title">{this.props.expense.name}</h4>
            <div className="row">
              <div className="col-xs-6">
                <p className="amount">${this.props.expense.amount} {this.props.expense.currency}</p>
              </div>
              <div className="col-xs-6 category">
                <span className="label">{this.props.expense.category.name}</span>
              </div>
            </div>
          </div>
          <div className="col-xs-1 nav">
            <span className="icon icon-nav-right"></span>
          </div>
          <div className="col-xs-1"></div>
        </div>
      </li>
    );
  }
});

module.exports = ExpenseListItem;