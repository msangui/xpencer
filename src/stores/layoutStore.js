var AppConstants = require('../constants/appConstants');
var FluxStore = require('./fluxStore');

var _layoutData = {
  headerData: {
    title: 'Xpencer'
  }
};


const LayoutStore = new FluxStore({

  listensTo: [
    {action: AppConstants.LAYOUT.SET_HEADER, handler: 'setHeader'}
  ],

  setHeader(payload){
    _layoutData.headerData = payload.headerData;
  },

  getState() {
    return _layoutData;
  }

});


module.exports = LayoutStore;