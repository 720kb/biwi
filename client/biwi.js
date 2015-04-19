var bitcore = require('bitcore')

var ajax = {

  get: function get(url) {
    function reqListener () {
      console.log(this.responseText);
    }

    var oReq = new XMLHttpRequest();
    oReq.onload = reqListener;
    oReq.open("get", url, true);
    oReq.send();
  }

}


// // generate pvt key
// var privateKey = new bitcore.PrivateKey()
// console.log(privateKey.toAddress())

// generate HD pvt key tree
var hdPrivateKey = new bitcore.HDPrivateKey()
var privateKey = hdPrivateKey.derive('m/0/1')

// store private key (and address?)
localStorage.privateKey      = hdPrivateKey.toString()
localStorage.addresses       = {}
localStorage.addresses.m_0_1 = privateKey.hdPublicKey.publicKey.toAddress().toString()

// get address balance
var balance_url = "https://blockchain.info/q/addressbalance/19e2eU15xKbM9pyDwjFsBJFaSeKoDxp8YT"
ajax.get(balance_url, function(data){
  return data
})


address_input = document.querySelector("input[name=btc_address]")
address_input.innerHTML = localStorage.addresses.m_0_1













// multisig
// crea keypair(pub) A -> save [KEYPAIR]
//
// save:
// HDW_LEVEL = "0/1" -> "0/n" (1 level)
// (hierar)
//
