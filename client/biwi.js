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
  //loadLastAddress()
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
    localStorage.rootPrivateKey = rootPrivateKey.toString()
    incrementDepth()
    // return
    checkOrGeneratePrivateKey()
  }
  else {
    depth           = localStorage.depth
    rootPrivateKey  = generateRootPrivateKey(localStorage.privateKey)
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

function getChangeAddress(){
  rootPrivateKey = localStorage.rootPrivateKey
  changeAddress = rootPrivateKey.derive("m/0/"+(depth+1))
  return changeAddress
}

getUnspentOutput("19e2eU15xKbM9pyDwjFsBJFaSeKoDxp8YT")

function getUnspentOutput(address) {
  ajax.get("https://blockchain.info/unspent?active="+address+"&format=json&cors=true", function(data){
    // console.log("utxos", utxos)
    //
    // "tx_hash":"31fbdf5e9730e1....427b58effb837",
    //   "tx_index":84076350,
    //   "tx_output_n": 1,
    //   "script":"76a9145ec1c5554a111386...c15dabe4d5e388ac",
    //   "value": 8928186,

  })

}


function payToServer(address, childPrivateKey, amount){
  changeAddress = getChangeAddress()


    // return utxos

  // createAndSignTx(address, utxos)

    // createTransaction
    // var transaction = new Transaction()
    //   .from(utxos)          // Feed information about what unspent outputs one can use
    //   .to(address, amount)  // Add an output with the given amount of satoshis
    //   .change(changeAddress)      // Sets up a change address where the rest of the funds will go
    //   .sign(privkeySet)     // Signs all the inputs it can

  // pushTx()

  // ....
  incrementDepth()
}






/////////////

// get address balance
var balance_url = "https://blockchain.info/q/addressbalance/19e2eU15xKbM9pyDwjFsBJFaSeKoDxp8YT"
ajax.get(balance_url, function(data){
  return data
})


address_input = document.querySelector("input[name=btc_address]")
address_input.innerHTML = localStorage.addresses.m_0_1
