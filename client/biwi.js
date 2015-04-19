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


// Dario's way--

// // biwi = new Biwi()
// biwi.init()
// biwi.privateKey_Generate()

// var BiWi = function Biwi() {
//   biwi.init = function init() {
//
//   }
//   biwi.privateKey_Generate = function privateKey_Generate() {
//
//   }
//
// }


/////////////////////////////////
// base js  (basic way)

// main.js
//

init()
console.log("localstorage:", localStorage)


// lib/biwi.js
//

function init() {
  initStorage()
  checkOrGeneratePrivateKey()
  loadLastAddress()
}

function initStorage() {
  if (!localStorage.depth)
    localStorage.depth = 0
  // pvt key ....
}

function incrementDepth() {
  localStorage.depth++
}

function checkOrGeneratePrivateKey() {
  var rootPrivateKey

  if (localStorageNotPresent()) {
    rootPrivateKey = generateRootPrivateKey()
    localStorage.privateKey = rootPrivateKey.toString()
    incrementDepth()
    checkOrGeneratePrivateKey()
  }
  else {
    depth           = localStorage.depth
    rootPrivateKey  = generatePrivateKey(localStorage.privateKey)
    childPrivateKey = loadLastChildPrivateKey(localStorage.depth, rootPrivateKey)
    //childPrivateKey = loadLastChildPrivateKey(rootPprivaterivateKey)
  }

  rootPrivateKey
 // todo
}

function localStorageNotPresent() {
  return !localStorage.rootPrivateKey
}

function loadLastChildPrivateKey(depth, rootPrivateKey) {
  return rootPrivateKey.derive("m/0/"+depth)
}

function loadLastChildPublicKey(depth, rootPrivateKey) {
  return rootPrivateKey.derive("m/0/"+depth).hdPublicKey
    .publicKey.toAddress().toString()
}

function generateRootPrivateKey(keyString) {
  return new bitcore.HDPrivateKey(keyString)
}








/////////////

// get address balance
var balance_url = "https://blockchain.info/q/addressbalance/19e2eU15xKbM9pyDwjFsBJFaSeKoDxp8YT"
ajax.get(balance_url, function(data){
  return data
})


address_input = document.querySelector("input[name=btc_address]")
address_input.innerHTML = localStorage.addresses.m_0_1
