var circle,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

circle = function(name, deps) {
  var CircleCmd;
  CircleCmd = (function() {
    CircleCmd.prototype.toggled = false;

    function CircleCmd(socket, client) {
      this.socket = socket;
      this.client = client;
      this.sendCmd = __bind(this.sendCmd, this);
      setInterval(this.sendCmd, 750);
    }

    CircleCmd.prototype.ensureInAir = function() {
      var state, states;
      state = this.client._lastState;
      states = ['CTRL_LANDED', 'FLYING_LOST_ALT', 'FLYING_LOST_ALT_GO_DOWN'];
      console.log('state:', state);
      if (__indexOf.call(states, state) >= 0) {
        return this.client.takeoff();
      }
    };

    CircleCmd.prototype.start = function() {
      return this.toggled = true;
    };

    CircleCmd.prototype.stop = function() {
      this.toggled = false;
      return this.client.stop();
    };

    CircleCmd.prototype.sendCmd = function() {
      if (this.toggled !== true) {
        return;
      }
      this.client.clockwise(2);
      return this.client.front(0.5);
    };

    return CircleCmd;

  })();
  console.log('initializing circle UI backend with');
  return deps.io.sockets.on('connection', function(socket) {
    var controller;
    controller = new CircleCmd(socket, deps.client);
    socket.on('/circle/on', function(cmd) {
      console.log('received command:', arguments);
      controller.ensureInAir();
      return controller.start();
    });
    return socket.on('/circle/off', function(cmd) {
      console.log('received command:', arguments);
      return controller.stop();
    });
  });
};

module.exports = circle;
