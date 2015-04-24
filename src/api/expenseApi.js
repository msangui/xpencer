'use strict';

var db = require('./db');
var AppConstants = require('../constants/appConstants');
var CategoryAPI = require('./categoryApi');
var Q = require('q');
var revalidator = require('revalidator');

const formValidations = {
  properties: {
    name: {
      description: 'the name of the expense',
      type: 'string',
      required: true,
      allowEmpty: false
    },
    amount: {
      description: 'the amount of the expense',
      type: 'number',
      required: true,
      allowEmpty: false
    },
    currency: {
      description: 'the currency of the expense',
      type: 'string',
      pattern: '^[A-Z]{3}$',
      required: true
    },
    category: {
      type: 'object',
      required: true,
      properties: {
        name: {
          required: true,
          allowEmpty: false
        }
      }
    }
  }
};

function validate(expenseData) {
  var validation = revalidator.validate(expenseData, formValidations);

  var deferred = Q.defer();
  var errors = false;

  if (validation.valid) {
    deferred.resolve();
  } else {
    errors = {category: {}};

    validation.errors.forEach(function (error){
      var properties = error.property.split('.');
      var errorProperty = errors;

      properties.forEach(function (property) {
        errorProperty[property] = errorProperty[property] || {};
        errorProperty = errorProperty[property];
      });

      errorProperty.message = error.message;
    });
    deferred.reject({error: true, validation: errors, message: 'Some fields are invalid'});
  }

  return deferred.promise;
}

function getOrCreateCategory(categoryName) {

  return CategoryAPI.getCategoryByName(categoryName).then(function (result) {
    if (result.rows.length) {
      return result.rows[0].id;
    } else {
      return CategoryAPI.addCategory({name: categoryName}).then(function (categoryData) {
        return categoryData._id;
      });
    }
  });

}

function getExpenseSaveData(expenseData) {
  var expense =  {
    _id: expenseData._id || Date.now().toString(),
    name: expenseData.name,
    description: expenseData.description,
    doctype: AppConstants.DATABASE.EXPENSE_DOCTYPE,
    createdAt: expenseData.createdAt || Date.now(),
    currency: expenseData.currency,
    amount: parseFloat(expenseData.amount),
    categoryId: expenseData.categoryId
  };

  if (expenseData._rev) {
    expense._rev = expenseData._rev
  }

  return expense;
}

function getExpenseListItemDisplayData(rowData) {
  return {
    _id: rowData.value.expense._id,
    name: rowData.value.expense.name,
    description: rowData.value.expense.description,
    doctype: rowData.value.expense.doctype,
    createdAt: rowData.value.expense.createdAt,
    currency: rowData.value.expense.currency,
    amount: parseFloat(rowData.value.expense.amount),
    categoryId: rowData.value.expense.categoryId,
    category: rowData.doc
  }
}

function saveExpense(expenseData) {
  return validate(expenseData).then(function () {
    return getOrCreateCategory(expenseData.category.name).then(function (categoryId) {
      expenseData.categoryId = categoryId;
      return db.put(getExpenseSaveData(expenseData)).then(function (expenseData) {
        return getExpense(expenseData.id);
      });
    });
  });
}

function getExpense(expenseId) {
  return db.get(expenseId).then(function (expenseData) {
    return db.get(expenseData.categoryId).then(function (categoryData) {
      expenseData.category = categoryData;
      return expenseData;
    });
  });
}

const ExpenseAPI = {
  addExpense(expenseData) {

    return saveExpense(expenseData);

  },

  updateExpense(expenseData) {
    return db.get(expenseData._id).then(function (storedExpenseDate) {
      expenseData._rev = storedExpenseDate._rev;

      return saveExpense(expenseData);

    });
  },

  removeExpense(expenseId) {
    return db.get(expenseId).then(function(doc) {
      return db.remove(doc);
    });
  },

  getExpense(expenseId) {
    return getExpense(expenseId);
  },

  getAllExpenses(month) {
    function map(doc, emit) {
      if (doc.doctype === AppConstants.DATABASE.EXPENSE_DOCTYPE) {
        let docMonth = new Date(doc.createdAt).getMonth() + 1;
        if (!month || month === docMonth){
          emit(doc.name, {_id: doc.categoryId, expense: doc});
        }
      }
    }

    return db.query(map, {include_docs: true}).then(function (results) {
      return results.rows.map(function (rowData) {
        return getExpenseListItemDisplayData(rowData);
      });
    });
  }
};

module.exports = ExpenseAPI;