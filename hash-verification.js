// Exersise

var compareWalletHash = function(walletHash) {
    var fs = require('fs');
    var savedHash = JSON.parse(fs.readFileSync('my-wallet/wallet.json', 'utf8'));
    console.log(savedHash)
    return savedHas == walletHash
    }

module.exports = {
    compareWalletHash : compareWalletHash
}