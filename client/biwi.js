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

var store = {
  privateKey: null
  lastPath:   0

  // keypairs: [
  //   "m/0/1",
  //   "m/0/2",
  //   "m/0/3",
  //
  //   // {
  //   //   privateKey: "5asdasdasd",
  //   //   address:    "1antani",
  //   // },
  // ]
}

// generate HD pvt key tree
function init() {
  checkOrGeneratePrivateKey()
  loadLastAddress()
}

function incrementLastPath() {
  store.lastPath++
  return store.lastPath
}

function checkOrGeneratePrivateKey() {
  var rootPrivateKey

  if (localStorageNotPresent()) {
    rootPrivateKey = generateRootPrivateKey()
  } else {
    childPrivateKey = generateChildPrivateKey('m/0/1')
    childPrivateKey = loadLastChildPrivateKey(rootPrivateKey)
  }

  rootPrivateKey
 // todo
}


function localStorageNotPresent() {
  return !localStorage.rootPrivateKey
}


function loadLastChildPrivateKey(rootPrivateKey) {
  return rootPrivateKey.hdPublicKey
    .publicKey.toAddress().toString()
}

function generateChildPrivateKey(depth) {
  var path = incrementLastPath()
  derivePrivateKey("m/0/"+depth)
}

function generateRootPrivateKey(path) {
  return new bitcore.HDPrivateKey()
}

function derivePrivateKey(path) {
  return store.privateKey.derive(path)
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
