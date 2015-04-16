var TransitionManager = {
  go: function(router, transition) {

    router.direction = 'forward';

    if (transition.direction) {
      router.direction = transition.direction;
    }

    if (transition.replace) {
      router.replaceWith(transition.route, transition.params);
    } else {
      router.transitionTo(transition.route, transition.params);
    }
  },

  goBack: function(router) {
    router.direction = 'back';
    router.goBack();
  }
};

module.exports = TransitionManager;