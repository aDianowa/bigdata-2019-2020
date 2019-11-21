// Exersise

var getWalletHash = function(walletHash) {
    return {
            walletId: walletHash
        };
    }

var saveWalletHash = function(walletHashObject) {

    var walletHashStringRepresentation = JSON.stringify(walletHashObject);
    var fs = require('fs');
    var dir = './my-wallet';

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    
    fs.writeFileSync('my-wallet/wallet.json', walletHashStringRepresentation);
};

module.exports = {
    getWalletHash : getWalletHash,
    saveWalletHash : saveWalletHash
}