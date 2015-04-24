var React = require('react');
var StoreWatchMixin = require('../../mixins/storeWatchMixin');
var ModalStore = require('../../stores/modalStore');
var ModalActions = require('../../actions/modalActions');
var ReactTransitionGroup = React.addons.CSSTransitionGroup;

function setModalState() {
  return ModalStore.getState();
}

var Modal = React.createClass({

  mixins: [new StoreWatchMixin({
      store: ModalStore,
      setState: setModalState
    }
  )],

  close() {
    ModalActions.close();
  },

  render() {
    var modalContent;
    var modalContainer;

    if (this.state.open) {
      if (this.state.modalData.content) {
        modalContent = this.state.modalData.content;
      }
      modalContainer = (
        <div className="modal-container" onClick={this.close}>
          <div className="modal-content box">
            {modalContent}
          </div>
        </div>
      );
    }


    return (
      <ReactTransitionGroup transitionName="modal">
        {modalContainer}
      </ReactTransitionGroup>
    );
  }

});

module.exports = Modal;