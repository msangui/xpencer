var AppConstants = require('../constants/appConstants');
var AppDispatcher = require('../dispatchers/appDispatcher');
var CategoryAPI = require('../api/categoryApi');

const CategoryActions = {
  load(categoryId) {

    // API call started
    AppDispatcher.dispatch({
      action: AppConstants.CATEGORIES.LOAD
    });

    CategoryAPI.getCategory(categoryId).then(function(categoryData) {
      // API call succeeded
      AppDispatcher.dispatch({
        action: AppConstants.CATEGORIES.LOAD_SUCCESS,
        payload: {
          categoryData: categoryData
        }
      });
    }, function (error) {
      // API call failed
      AppDispatcher.dispatch({
        action: AppConstants.CATEGORIES.LOAD_FAIL,
        payload: {
          error: error
        }
      });
    });
  },

  getCategoriesByTerm(term) {
    // API call started
    AppDispatcher.dispatch({
      action: AppConstants.CATEGORIES.FILTER
    });

    CategoryAPI.getCategoriesByTerm(term).then(function(results) {
      // API call succeeded
      AppDispatcher.dispatch({
        action: AppConstants.CATEGORIES.FILTER_SUCCESS,
        payload: {
          categories: results.rows.map(function (row) {
            return row.doc;
          })
        }
      });

    }, function (error) {
      // API call failed
      AppDispatcher.dispatch({
        action: AppConstants.CATEGORIES.FILTER_FAIL,
        payload: {
          error: error
        }
      });
    });
  },

  cleanSuggestions() {
    AppDispatcher.dispatch({
      action: AppConstants.CATEGORIES.CLEAN_SUGGESTIONS
    });
  },

  loadAll() {

    // API call star
   CategoryAPI.getAllCategories().then(function(results) {
      // API call succeeded
      AppDispatcher.dispatch({
        action: AppConstants.CATEGORIES.LOAD_ALL_SUCCESS,
        payload: {
          categoriesData: results.rows
        }
      });

    }, function (error) {
      // API call failed
      AppDispatcher.dispatch({
        action: AppConstants.CATEGORIES.LOAD_ALL_FAIL,
        payload: {
          error: error
        }
      });
    });
  },

  add(categoryData) {

    // API call started
    AppDispatcher.dispatch({
      action: AppConstants.CATEGORIES.ADD
    });

    CategoryAPI.addCategory(categoryData).then(function(categoryData) {
      // API call succeeded
      AppDispatcher.dispatch({
        action: AppConstants.CATEGORIES.ADD_SUCCESS,
        payload: {
          categoryData: categoryData
        }
      });
    }, function (error) {
      // API call failed
      AppDispatcher.dispatch({
        action: AppConstants.CATEGORIES.ADD_FAIL,
        payload: {
          error: error
        }
      });
    });
  },

  update(categoryData){

    AppDispatcher.dispatch({
      action: AppConstants.CATEGORIES.UPDATE
    });

    CategoryAPI.updateCategory(categoryData).then(function() {
      AppDispatcher.dispatch({
        action: AppConstants.CATEGORIES.UPDATE_SUCCESS,
        payload: {
          categoryData: categoryData
        }
      });
    }, function (error) {
      AppDispatcher.dispatch({
        action: AppConstants.CATEGORIES.UPDATE_FAIL,
        payload: {
          error: error
        }
      });
    });
  },

  save(categoryData) {
    if (categoryData._id) {
      this.update(categoryData);
    } else {
      this.add(categoryData);
    }
  },

  remove(categoryId) {

    AppDispatcher.dispatch({
      action: AppConstants.CATEGORIES.REMOVE
    });

    CategoryAPI.removeCategory(categoryId).then(function() {
      AppDispatcher.dispatch({
        action: AppConstants.CATEGORIES.REMOVE_SUCCESS,
        payload: {
          categoryId: categoryId
        }

      });
    }, function (error) {
      AppDispatcher.dispatch({
        action: AppConstants.CATEGORIES.REMOVE_FAIL,
        payload: {
          error: error
        }
      });
    });
  },

  removeCancelled() {
    AppDispatcher.dispatch({
      action: AppConstants.CATEGORIES.REMOVE_CANCELLED
    });

  }

};

module.exports = CategoryActions;