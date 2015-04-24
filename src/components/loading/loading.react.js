var React = require('react');
var AppConstants = require('../../constants/appConstants');

var Loading = React.createClass({
  render() {
    var loading;
    var loadingContainerClassName;
    var size = this.props.size || 'large';
    if (this.props.show) {
      loadingContainerClassName = 'loading-container ' + (this.props.local ? 'local' : 'overlay');
      loading = (
        <div className={'round-container ' + size}>
          <div className="round-loading blue">
            <div className="inner-section left-section">
              <div className="inner-round"></div>
            </div>
            <div className="inner-axis">
              <div className="inner-round"></div>
            </div>
            <div className="inner-section right-section">
              <div className="inner-round"></div>
            </div>
          </div>
          <div className="round-loading red">
            <div className="inner-section left-section">
              <div className="inner-round"></div>
            </div>
            <div className="inner-axis">
              <div className="inner-round"></div>
            </div>
            <div className="inner-section right-section">
              <div className="inner-round"></div>
            </div>
          </div>
          <div className="round-loading yellow">
            <div className="inner-section left-section">
              <div className="inner-round"></div>
            </div>
            <div className="inner-axis">
              <div className="inner-round"></div>
            </div>
            <div className="inner-section right-section">
              <div className="inner-round"></div>
            </div>
          </div>
          <div className="round-loading green">
            <div className="inner-section left-section">
              <div className="inner-round"></div>
            </div>
            <div className="inner-axis">
              <div className="inner-round"></div>
            </div>
            <div className="inner-section right-section">
              <div className="inner-round"></div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className={loadingContainerClassName}>
        {loading}
      </div>
    );
  }
});

module.exports = Loading;



