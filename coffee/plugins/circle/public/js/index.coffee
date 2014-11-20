do (window, jQuery) ->
  class CircleUI
    constructor: (@cockpit) ->
      tpl = '<input type="button" id="circle-toggle" value="Toggle Circle On">'
      @$el = $ tpl
      @toggled = false

      @initialize()

    initialize: =>
      console.log 'CircleUI Initialized'
      $("#controls").append  @$el
      @$el.click @toggle
      console.log 'Circle UI Element:', @$el

    toggle: =>
      @toggled = !@toggled

      if @toggled
        @$el.attr 'value', "Toggle Circle Off"
        @cmd = 'on'
      else
        @$el.attr 'value', "Toggle Circle On"
        @cmd = 'off'

      @circlePath(@cmd)

    circlePath: (state) =>
      console.log 'sending command...', state
      @cockpit.socket.emit "/circle/#{state}"

  window.Cockpit.plugins.push(CircleUI)
