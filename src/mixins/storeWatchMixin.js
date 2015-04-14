var StoreWatchMixin = function(cb, store){
  return {
    getInitialState:function(){
      return cb(this);
    },
    componentWillMount:function(){
      store.addChangeListener(this._onChange)
    },
    componentWillUnmount:function(){
      store.removeChangeListener(this._onChange)
    },
    _onChange:function(){
      this.setState(cb(this))
    }
  }
};

module.exports = StoreWatchMixin;
