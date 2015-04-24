var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var OptionList = require('./optionList.react.js');
var ModalActions = require('../../actions/modalActions');

var CameraToggle = React.createClass({

  mixins: [PureRenderMixin],

  onClick() {
    var self = this;
    ModalActions.open({
      content: (
        <div className="camera-source-modal">
          <h4>Select image source</h4>
          <OptionList options={self.cameraOptions} onOptionSelected={self.onCameraOptionSelected}/>
        </div>
      )
    });
  },

  cameraOptions: [
    {
      label: 'From camera',
      handler: function () {
        console.log('took picture from camera');
      }
    },
    {
      label: 'From library',
      handler: function () {
        console.log('took picture from library');
      }
    }
  ],


  onCameraOptionSelected(option) {
    option.handler.bind(this)();
  },

  render() {
    return (
      <div className="camera-toggle-container">
        <div className="camera-toggle" onClick={this.onClick}>
          <span className="icon icon-camera"></span>
        </div>
      </div>
    );
  }
});

module.exports = CameraToggle;