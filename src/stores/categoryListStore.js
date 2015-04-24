var AppConstants = require('../constants/appConstants');
var FluxStore = require('./fluxStore');


const CategoryFilterListStore = new FluxStore({

  categories: [],

  listensTo: [
    {action: AppConstants.CATEGORIES.FILTER, handler: 'start'},
    {action: AppConstants.CATEGORIES.FILTER_SUCCESS, handler: 'filterSuccess'},
    {action: AppConstants.CATEGORIES.FILTER_FAIL, handler: 'filterFail'}
  ],

  start(){
    this.categories = [];
  },

  filterSuccess(payload){
    this.categories = payload.categories;
  },

  filterFail(){
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