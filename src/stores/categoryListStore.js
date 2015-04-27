var AppConstants = require('../constants/appConstants');
var FluxStore = require('./fluxStore');


const CategoryFilterListStore = new FluxStore({

  categories: [],

  listensTo: [
    {action: AppConstants.CATEGORIES.FILTER, handler: 'start'},
    {action: AppConstants.CATEGORIES.FILTER_SUCCESS, handler: 'filterSuccess'},
    {action: [
      AppConstants.CATEGORIES.FILTER_FAIL,
      AppConstants.CATEGORIES.CLEAN_SUGGESTIONS
    ], handler: 'clean'}
  ],

  start(){
    this.categories = [];
  },

  filterSuccess(payload){
    this.categories = payload.categories;
  },

  clean(){
    this.categories = [];
  },

  getInitialState() {
    return {
      categories: []
    }
  },

  getState() {
    return {
      categories: this.categories
    }
  }

});


module.exports = CategoryFilterListStore;