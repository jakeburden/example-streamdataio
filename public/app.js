var streamdataio = require('streamdataio-js-sdk')

var key = 'OGNkMzcyMDQtOTk4Yi00YjUxLTgyMjAtN2JhMGM1NTg4ZGJi'
var url = window.location.href
var el = document.getElementById('count')

var countEvent = streamdataio.createEventSource(url + 'counter', key)

countEvent
  .onData(function (data) {
    // initialize your data with the initial snapshot
    console.log('data', data)
    el.textContent = data.count
  })
  .onPatch(function (patch) {
    // update the data with the provided patch
    console.log('patch', patch)
    el.textContent = patch[0].value
  })
  .onError(function (error) {
    console.error(error)
  })
  .onOpen(function () {
    console.log('opened stream')
  })

countEvent.open()
