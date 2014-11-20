circle = (name, deps) ->

  class CircleCmd
    toggled: false

    constructor: (@socket, @client) ->
      setInterval @sendCmd, 750

    ensureInAir: ->
      state = @client._lastState

      states = [
        'CTRL_LANDED'
        'FLYING_LOST_ALT'
        'FLYING_LOST_ALT_GO_DOWN'
      ]
      console.log 'state:', state
      @client.takeoff() if state in states

    start: ->
      @toggled = true

    stop: ->
      @toggled = false
      @client.stop()

    sendCmd: =>
      return unless @toggled is true

      @client.clockwise 2
      @client.front 0.5

  console.log 'initializing circle UI backend with'

  deps.io.sockets.on 'connection', (socket) ->

    controller = new CircleCmd(socket, deps.client)

    socket.on '/circle/on', (cmd) ->
      console.log 'received command:', arguments

      controller.ensureInAir()
      controller.start()

    socket.on '/circle/off', (cmd) ->
      console.log 'received command:', arguments
      controller.stop()


module.exports = circle