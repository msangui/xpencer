var StoreWatchMixin = function(config){
  var {store, setInitialState, componentWillMount, componentWillUnmount, setState, replace} = config;
  return {
    getInitialState(){
      var initialState = {};

      if (setInitialState) {
        initialState = setInitialState.apply(this, arguments);
      } else if (setState) {
        initialState = setState.apply(this, arguments);
      }

      return initialState;
    },
    componentWillMount(){
      if (store) {
        store.addChangeListener(this._onChange)
      }
      if (componentWillMount) {
        componentWillMount.apply(this);
      }
    },
    componentWillUnmount(){
      if (store) {
        store.removeChangeListener(this._onChange)
      }
      if (componentWillUnmount) {
        componentWillUnmount.apply(this);
      }
    },
    _onChange(){
      var state = {};

      if (setState) {
        state = setState.apply(this, arguments);
      }

      if (replace) {
        this.replaceState(state);
      } else {
        this.setState(state);
      }

    }
  }
};

module.exports = StoreWatchMixin;
