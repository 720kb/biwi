var bitcore = require('bitcore')
//, _ = require('lodash')
  , oReq
  , ajax = {
      'get': function get(url) {

        function reqListener() {

          console.log(this.responseText);
        }

        oReq = new XMLHttpRequest();
        oReq.onload = reqListener;
        oReq.open('get', url, true);
        oReq.send();
      }
    }
  , rootPrivateKey
  , unspentOutput
  , newInput
  , nav = document.querySelector('.nav')
  , btcAmount = 50 // mbtc
  , costPerMin = 0.1 // mbtc
  , remainingMinutes = btcAmount / costPerMin
  , balanceUrl = 'https://blockchain.info/q/addressbalance/19e2eU15xKbM9pyDwjFsBJFaSeKoDxp8YT';

// Dario's way--

// // biwi = new Biwi()
// biwi.init()
// biwi.privateKey_Generate()
// var BiWi = function Biwi() {
//   biwi.init = function init() {
//   }
//   biwi.privateKey_Generate = function privateKey_Generate() {
//   }
// }
/////////////////////////////////
// base js  (basic way)

// main.js
//

init();
console.log('localstorage:', localStorage);

// lib/biwi.js
//

function init() {

  initStorage();
  checkOrGeneratePrivateKey();
  //loadLastAddress()
}

function initStorage() {

  if (!localStorage.depth) {

    localStorage.depth = 0;
  }
  // pvt key ....
}

function incrementDepth() {

  localStorage.depth += 1;
}

function checkOrGeneratePrivateKey() {

  if (localStorageNotPresent()) {

    rootPrivateKey = generateRootPrivateKey();
    localStorage.rootPrivateKey = rootPrivateKey.toString();
    incrementDepth();
    // return
    checkOrGeneratePrivateKey();
  } else {

    depth = localStorage.depth;
    rootPrivateKey = generateRootPrivateKey(localStorage.privateKey);
    childPrivateKey = loadLastChildPrivateKey(localStorage.depth, rootPrivateKey);
    //childPrivateKey = loadLastChildPrivateKey(rootPprivaterivateKey)
  }

  rootPrivateKey
 // todo
}

function localStorageNotPresent() {

  return !localStorage.rootPrivateKey;
}

function loadLastChildPrivateKey(depth, rootPrivateKey) {

  return rootPrivateKey.derive('m/0/' + depth);
}

function loadLastChildPublicKey(depth, rootPrivateKey) {

  return rootPrivateKey.derive('m/0/' + depth).hdPublicKey.publicKey.toAddress().toString();
}

function generateRootPrivateKey(keyString) {

  return new bitcore.HDPrivateKey(keyString);
}

function getChangeAddress() {

  rootPrivateKey = localStorage.rootPrivateKey;
  changeAddress = rootPrivateKey.derive('m/0/' + (depth + 1));
  return changeAddress;
}

getUnspentOutput('19e2eU15xKbM9pyDwjFsBJFaSeKoDxp8YT');

function getUnspentOutput(address) {

  ajax.get('https://blockchain.info/unspent?active=' + address + '&format=json&cors=true', function(utxos) {
    // console.log('utxos', utxos)
    //
    // 'tx_hash':'31fbdf5e9730e1....427b58effb837',
    //   'tx_index':84076350,
    //   'tx_output_n': 1,
    //   'script':'76a9145ec1c5554a111386...c15dabe4d5e388ac',
    //   'value': 8928186,

    unspentOutput = getFirstUTXO(utxos);
    /*eslint disable*/
    newInput = {
      'address': address,
      'txid': unspentOutput.tx_hash,
      'scriptPubKey': unspentOutput.script,
      'amount': unspentOutput.value,
      'vout': unspentOutput.tx_output_n,
    };
    /*eslint enable*/
   return newInput;
  })

}

function getFirstUTXO(utxos) {

  return utxos[0];
}

function payToServer(address, childPrivateKey, amount){

  changeAddress = getChangeAddress();
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
  incrementDepth();
}

// prezzo fisso
// x per MB
// x per tempo (peggio x QoS?)
///////
// applicazioni Client / Server
// bisogna non far comunicare le applicazioni perche'
// di modo che siano indipendnti e possano:
// 1 - essere swappate (implementazione in altri linguaggi / metodologie etc etc etc)
// 2 - semplicita' (meno api call)
// 3 - tutto e' push
// il client riconosce le reti biwi perche' il nome della rete biwi inizia con biwi
// ovviamente x l'hackathon non avremo maaaai il tempo di fare sta roba quindi alla fine forniremo all'utente solamente l'accesso vpn on pagee lui se lo setta da solo
// nota: quando dovrai rimuovere questo testo perche' avrai finito l'app allora ok
// per settare i (amount fiat) / GB
// il server nomina la rete biwi_10_(rand), e il client in questo modo sa quanto deve pagare
// [server] -> [rete biwi_10_antani]
////////////
// fake events

setInterval(function() {

  btcAmount = btcAmount - costPerMin;
  btcAmountRounded = Number(btcAmount * 10) / 10;
  remainingMinutes  = Number(btcAmount / costPerMin);

  nav.dispatchEvent(new CustomEvent('tx:sent',{
    'detail': {
      'remainingMbtc': btcAmountRounded,
      'remainingMinutes': remainingMinutes
    }
  }));
}, 1000); // this should be 60000


nav.addEventListener('tx:sent', function(evt) {

  console.log('remainingMbtc:', evt.detail.remainingMbtc, 'remainingMinutes:', evt.detail.remainingMinutes);
  // TODO Pippo: update view here
});

/////////////

// get address balance
ajax.get(balanceUrl, function(data) {

  return data;
});

addressInput = document.querySelector('input[name=btcAddress]');
addressInput.innerHTML = localStorage.addresses.m_0_1;
