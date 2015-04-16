const appConstants = {
  EXPENSES: {
    LOAD: 'expense::load',
    LOAD_SUCCESS: 'expense::load::success',
    LOAD_FAIL: 'expense::load::fail',
    LOAD_ALL: 'expense:loadAll',
    LOAD_ALL_SUCCESS: 'expense:loadAll::success',
    LOAD_ALL_FAIL: 'expense:loadAll::fail',
    ADD: 'expense::add',
    ADD_SUCCESS: 'expense::add::success',
    ADD_FAIL: 'expense::add::fail',
    REMOVE: 'expense::remove',
    REMOVE_SUCCESS: 'expense::remove::success',
    REMOVE_CANCELLED: 'expense::remove::cancelled',
    REMOVE_FAIL: 'expense::remove::fail',
    UPDATE: 'expense::update',
    UPDATE_SUCCESS: 'expense::update::success',
    UPDATE_FAIL: 'expense::update::fail'
  },
  NOTIFICATIONS: {
    SHOW: 'notifications::show',
    HIDE: 'notifications::show::hide'
  },
  DATABASE: {
    NAME: 'expensesDatabase'
  }
};

module.exports = appConstants;