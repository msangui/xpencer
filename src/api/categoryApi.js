'use strict';

var db = require('./db');
var AppConstants = require('../constants/appConstants');

const CategoryApi = {
  addCategory(categoryData) {
    categoryData._id = Date.now().toString();
    categoryData.doctype = AppConstants.DATABASE.CATEGORY_DOCTYPE;
    return db.put(categoryData).then(function (categoryData) {
      return db.get(categoryData.id)
    });
  },

  getCategoryByName(name){
    return db.query(function(doc, emit){
      if (doc.doctype === AppConstants.DATABASE.CATEGORY_DOCTYPE) {
        if (doc.name === name) {
          emit();
        }
      }
    }, {include_docs : true, limit: 1});
  },

  getAllCategories() {

    return db.query(function(doc, emit){
      if (doc.doctype === AppConstants.DATABASE.CATEGORY_DOCTYPE) {
        emit();
      }
    }, {include_docs : true});
  },

  getCategoriesByTerm(term) {

    return db.query(function(doc, emit){
      if (doc.doctype === AppConstants.DATABASE.CATEGORY_DOCTYPE && term) {
        let categoryName = doc.name.toLowerCase();
        term = term.toLowerCase();
        if (categoryName.indexOf(term) > -1) {
          emit();
        }
      }
    }, {include_docs : true, limit: 3});
  },
  getCategory(categoryId) {
    return db.get(categoryId);
  }
};

module.exports = CategoryApi;