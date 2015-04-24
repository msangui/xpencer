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
  CATEGORIES: {
    FILTER: 'category::filter',
    FILTER_SUCCESS: 'category::filter::success',
    FILTER_FAIL: 'category::filter::fail',
    LOAD: 'category::load',
    LOAD_SUCCESS: 'category::load::success',
    LOAD_FAIL: 'category::load::fail',
    LOAD_ALL: 'category:loadAll',
    LOAD_ALL_SUCCESS: 'category:loadAll::success',
    LOAD_ALL_FAIL: 'category:loadAll::fail',
    ADD: 'category::add',
    ADD_SUCCESS: 'category::add::success',
    ADD_FAIL: 'category::add::fail',
    REMOVE: 'category::remove',
    REMOVE_SUCCESS: 'category::remove::success',
    REMOVE_CANCELLED: 'category::remove::cancelled',
    REMOVE_FAIL: 'category::remove::fail',
    UPDATE: 'category::update',
    UPDATE_SUCCESS: 'category::update::success',
    UPDATE_FAIL: 'category::update::fail'
  },
  LAYOUT: {
    SET_HEADER: 'layout::setHeader'
  },
  NOTIFICATIONS: {
    SHOW: 'notifications::show',
    HIDE: 'notifications::show::hide'
  },
  MODAL: {
    OPEN: 'modal::open',
    CLOSE: 'modal::close'
  },
  CONTEXT_MENU: {
    OPEN: 'contextMenu::open',
    CLOSE: 'contextMenu::close'
  },
  TRANSITIONS: {
    GO: 'transitions::go',
    WENT: 'transitions::went'
  },
  GOOGLE: {
    CLIENT_ID: '440092196371-ec85f8eg91rhrd0cfjfuvfkp0qpmcj6k.apps.googleusercontent.com',
    CLIENT_SECRET: '7kcS1gsgWZ9xHHa4kbnhMu2r',
    LOGIN_URI: 'https://accounts.google.com/o/oauth2/auth'
  },
  LOGIN: {
    LOGIN: 'login::login',
    LOGIN_SUCCESS: 'login::success',
    LOGIN_FAIL: 'login::fail'
  },
  DATABASE: {
    NAME: 'xpencer::db',
    EXPENSE_DOCTYPE: 'expense',
    CATEGORY_DOCTYPE: 'category'
  }
};

module.exports = appConstants;