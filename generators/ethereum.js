var hdkey = require('ethereumjs-wallet/hdkey')
var bip39 = require('bip39')
var hdPathString = "m/44'/60'/0'/0"

function generateEtherAccountsForMnemonic(mnemonic, accountCount) {

  var real = mnemonic.trim().split(' ').map(function(word) {
    return word.trim()
  })
  .filter((word) => {
    return word !== ''
  })
  .join(' ')
  console.dir({ real })
  var seed = bip39.mnemonicToSeed(real)
  var hdWallet = hdkey.fromMasterSeed(seed)
  var root = hdWallet.derivePath(hdPathString)

  var wallets = []
  for (var i = 0; i < accountCount; i++) {
    var child = root.deriveChild(i)
    var wallet = child.getWallet()
    wallets.push(wallet)
  }

  var hexWallets = wallets.map(w => w.getAddress().toString('hex'))

  return hexWallets

}

module.exports = generateEtherAccountsForMnemonic

