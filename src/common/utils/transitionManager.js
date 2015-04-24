const TransitionManager = {
  go: function(router, transition) {

    router.direction = 'forward';

    if (transition.direction) {
      router.direction = transition.direction;
    }

    if (transition.goBack) {
      router.goBack();
    } else if (transition.replace) {
      router.replaceWith(transition.route, transition.params);
    } else {
      router.transitionTo(transition.route, transition.params);
    }
    // back direction when clicking back
    setTimeout(function () {
      router.direction = 'back';
    }, 0);
  }

};

module.exports = TransitionManager;
