// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

// var generateWallet = function() {
//     return {
//         id : 'abcd',
//         amount : 0
//     }
// }


// var SampleWallet = {
//     id : 'abcd',
//     amount : 0
// };

// var SampleGeneratedWallet = generateWallet();

// console.log(SampleGeneratedWallet)



var BlockChain = {
    id : 'abcd',
    syncBlockchain : function() {
        console.log('Sync all blockchain nodes');
    }
};

// BlockChain.id

// BlockChain.syncBlockchain();


var fs = require('fs');

// var GenerateFilesRandom = function() {
//     var words = ['test', 'something', 'else', 'blah', 'see']
//     var index = Math.floor((Math.random() * (5 - 1) + 1));
//     var index = Math.floor((Math.random() * (5 - 1) + 1));
//     return collection[index]
// }

var i;
for (i = 0; i < 10; i++) {
    var name = 'sample_fs_file' + i + '.txt'
    fs.writeFileSync(name, i);
}

// fs.writeFileSync('sample_fs_file.txt', 'Hello world!');

var myWallet = require('./wallet');
var myBlockchain = require('./blockchain')

var walletReference = myWallet.generateWallet()
myWallet.saveWallet(walletReference)


document.getElementById("wallet-id").innerHTML = walletReference.id
document.getElementById("wallet-amount").innerHTML = walletReference.amount


var uiWalletTransaction = document.getElementById("wallet-transaction")
var walletCollection = myBlockchain.syncWalletCollection()

var stringBuilder = [];
for(var i=0; i<walletCollection.length; i++){
    var id = walletCollection[i].id;
    var amount = walletCollection[i].amount;
    template = '<div>' + id + ' / '+ amount + '</div>';
    stringBuilder.push(template)
}

uiWalletTransaction.innerHTML = stringBuilder.join('');

// Exersise
document.getElementById('login').onclick=function(){
    var password = String(document.getElementsByName('password').values[0]);
    var email = String(document.getElementsByName('email').values[0]);
    var passwordEmail = password + email
    var login = require('./wallets')

    const crypto = require('crypto');

    var hashSring = crypto.createHash('sha1').update(String(passwordEmail)).digest('hex');
    if (fs.existsSync('my-wallet/wallet.json')) {
        document.getElementById('show-text').innerHTML = "You already have a generated unique identifier"
      }
    else{
        walletHash = login.getWalletHash(hashSring)
        login.saveWalletHash(walletHash)
        res.redirect('/login.html');
    }
  };


document.getElementById('hash-login').onclick=function(){
    var hash = String(document.getElementsByName('password').values[0]);
    var loginHash = require('./hash-verification')
    walletHash = loginHash.compareWalletHash(hash)
    if (walletHash){
        res.redirect('/wallet.html');
    }
    document.getElementById('show-text').innerHTML = "You have provided a non-existent unique identifier"
};

