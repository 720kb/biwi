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


// easier way
//
// biwi.init()
// biwi.privateKey_Generate()
//
// biwi = {}
// biwi.init = function init() {
//
// }
// biwi.privateKey_Generate = function privateKey_Generate() {
//
// }


// coffeescript
//
// class Biwi
//   constructor: ->
//     @privateKey = this.generatePrivateKey()
//     @m["m/0/1"] = null
//
//   generatePrivateKey = ->
//     @privateKEy      = new bitcore.HDPrivateKey()
//     privateKey_m_0_1 = hdPrivateKey.derive('m/0/1')
//     @m["m/0/1"]      = privateKey_m_0_1



/////////////////////////////////
// base js  (basic way)

init()
console.log("localstorage:", localStorage)

///

// window.store = {
//   privateKey: null,
//   depth:   0
// }


// generate HD pvt key tree
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
  // window.store.depth++
  // return store.depth
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













// multisig
// crea keypair(pub) A -> save [KEYPAIR]
//
// save:
// HDW_LEVEL = "0/1" -> "0/n" (1 level)
// (hierar)
//
