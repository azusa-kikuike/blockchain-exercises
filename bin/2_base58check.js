// copied from bs58check
// https://github.com/bitcoinjs/bs58check/blob/master/index.js

var base58 = require('bs58')
var createHash = require('create-hash')
var bs58check = require('bs58check')

// sha256sha256
function sha256x2(buffer) {
  buffer = createHash('sha256').update(buffer).digest()
  return createHash('sha256').update(buffer).digest()
}

// encode
function encode(payload) {
  var checksum = sha256x2(payload).slice(0, 4)
  return base58.encode(Buffer.concat([
    payload,
    checksum
  ]))
}

function decode(string) {
  var buffer = new Buffer(base58.decode(string))

  var payload = buffer.slice(0, -4)
  var checksum = buffer.slice(-4)
  var newChecksum = sha256x2(payload).slice(0, 4)

  for (var i=0; i < newChecksum.length; ++i) {
    if (newChecksum[i] === checksum[i]) continue
    throw new Error('Invalid checksum')
  }
  return payload
}

var enc = '14HV44ipwoaqfg'
var buf = new Buffer([0, 1, 2, 3, 253, 254, 255])

console.log(encode(buf))
console.log(enc)

console.log(decode(enc).toString('hex'))
console.log(buf.toString('hex'))
