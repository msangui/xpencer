var React = require('react');
var AppConstants = require('../../constants/appConstants');
//
//var Loading = React.createClass({
//  render() {
//    return (
//      <div className={'loading-container ' + (this.props.show ? 'shown': '')}>
//        <div className="loading">
//          <div className="spinner">
//            <div className="bounce1"></div>
//            <div className="bounce2"></div>
//            <div className="bounce3"></div>
//          </div>
//        </div>
//      </div>
//    );
//  }
//
//});

var Loading = React.createClass({
  render() {
    return (
      <div className={'loading-container ' + (this.props.show ? 'shown': '')}>
        <div className="round-container">
          <div className="round-loading blue">
            <div className="Ba-cb-Gh Ba-gc">
              <div className="Ba-cb Ba-ti"></div>
            </div>
            <div className="Ba-Cm-dn">
              <div className="Ba-cb Ba-ti"></div>
            </div>
            <div className="Ba-cb-Gh Ba-Dc">
              <div className="Ba-cb Ba-ti"></div>
            </div>
          </div>
          <div className="round-loading red">
            <div className="Ba-cb-Gh Ba-gc">
              <div className="Ba-cb Ba-ti"></div>
            </div>
            <div className="Ba-Cm-dn">
              <div className="Ba-cb Ba-ti"></div>
            </div>
            <div className="Ba-cb-Gh Ba-Dc">
              <div className="Ba-cb Ba-ti"></div>
            </div>
          </div>
          <div className="round-loading yellow">
            <div className="Ba-cb-Gh Ba-gc">
              <div className="Ba-cb Ba-ti"></div>
            </div>
            <div className="Ba-Cm-dn">
              <div className="Ba-cb Ba-ti"></div>
            </div>
            <div className="Ba-cb-Gh Ba-Dc">
              <div className="Ba-cb Ba-ti"></div>
            </div>
          </div>
          <div className="round-loading green">
            <div className="Ba-cb-Gh Ba-gc">
              <div className="Ba-cb Ba-ti"></div>
            </div>
            <div className="Ba-Cm-dn">
              <div className="Ba-cb Ba-ti"></div>
            </div>
            <div className="Ba-cb-Gh Ba-Dc">
              <div className="Ba-cb Ba-ti"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Loading;



