var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

(function(window, jQuery) {
  var CircleUI;
  CircleUI = (function() {
    function CircleUI(cockpit) {
      var tpl;
      this.cockpit = cockpit;
      this.circlePath = __bind(this.circlePath, this);
      this.toggle = __bind(this.toggle, this);
      this.initialize = __bind(this.initialize, this);
      tpl = '<input type="button" id="circle-toggle" value="Toggle Circle On">';
      this.$el = $(tpl);
      this.toggled = false;
      this.initialize();
    }

    CircleUI.prototype.initialize = function() {
      console.log('CircleUI Initialized');
      $("#controls").append(this.$el);
      this.$el.click(this.toggle);
      return console.log('Circle UI Element:', this.$el);
    };

    CircleUI.prototype.toggle = function() {
      this.toggled = !this.toggled;
      if (this.toggled) {
        this.$el.attr('value', "Toggle Circle Off");
        this.cmd = 'on';
      } else {
        this.$el.attr('value', "Toggle Circle On");
        this.cmd = 'off';
      }
      return this.circlePath(this.cmd);
    };

    CircleUI.prototype.circlePath = function(state) {
      console.log('sending command...', state);
      return this.cockpit.socket.emit("/circle/" + state);
    };

    return CircleUI;

  })();
  return window.Cockpit.plugins.push(CircleUI);
})(window, jQuery);
