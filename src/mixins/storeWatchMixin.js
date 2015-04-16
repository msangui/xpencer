var StoreWatchMixin = function(store, setComponentState){
  return {
    getInitialState(){
      return setComponentState(this);
    },
    componentWillMount(){
      store.addChangeListener(this._onChange)
    },
    componentWillUnmount(){
      store.removeChangeListener(this._onChange)
    },
    _onChange(){
      this.setState(setComponentState(this));
    }
  }
};

module.exports = StoreWatchMixin;
