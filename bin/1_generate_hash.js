var sha1    = require('sha1')
var sha256  = require('sha256')
var sha512  = require('js-sha512').sha512
var ripemd160   = require('ripemd160')

var data = "example data to be hashed"

console.log("sha1(data) is: "   + sha1(data))
console.log("sha256(data) is: " + sha256(data))
console.log("sha512(data) is: " + sha512(data))
console.log("sha256sha256(data) is: " + sha256.x2(data))
console.log("ripemd160(data) is: " + ripemd160(data).toString('hex'))
console.log("sha256ripemd160(data) is: " + ripemd160(sha256(data, { asBytes: true })).toString('hex'))
