var bitcore = require('bitcore')
// var zepto = require('zepto')
// $

// zepto.ajax()

// zepto.get = function(url) {
//   zepto.ajax({
//   type: 'GET',
//   url: url,
//   // data: { name: '' },
//   dataType: 'json',
//   success: function(data){
//     console.log("GOT", data)
//   },
//   error: function(xhr, type){
//     alert('Y U NO WORK?')
//   }
// });
// }


var privateKey = new bitcore.PrivateKey()
console.log(privateKey.toAddress())


// multisig
// crea keypair(pub) A -> save [KEYPAIR]
//
// save:
// HDW_LEVEL = "0/1" -> "0/n" (1 level)
// (hierar)
//

var hdPrivateKey = new bitcore.HDPrivateKey()
hdPrivateKey.derive('m/0/1')


var balance_url = "https://blockchain.info/q/addressbalance/19e2eU15xKbM9pyDwjFsBJFaSeKoDxp8YT"
zepto.get(balance_url, function(data){
  return data
})
