var fs = require('fs')
var path = require('path')
var merry = require('merry')
var bankai = require('bankai')

var app = merry()
var assets = bankai(path.join(__dirname, './app.js'))

var count = 0

// increment the count every second
setInterval(function () {
  if (count++ === 9000) count = 0 // reset counter
}, 1000)

app.route('GET', '/', function (req, res, ctx) {
  fs.createReadStream('public/index.html').pipe(res)
})

app.route('GET', '/bundle.js', function (req, res, ctx) {
  assets.js(req, res).pipe(res)
})

app.route('GET', '/counter', function (req, res, ctx) {
  ctx.log.info('getting a number')
  ctx.send(200, { count: count })
})

app.route('default', function (req, res, ctx) {
  ctx.log.info('Route doesnt exist')
  ctx.send(404, { message: 'no page here' })
})

app.listen(8080)
