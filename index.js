var ethereumGen = require('./generators/ethereum')
var qrCode = require('qrcode-npm').qrcode
var recover = require('recover-bip39')

window.addEventListener('load', setup)

function setup() {
  console.log('setting up')
  var generateButton = document.querySelector('button.generate')
  generateButton.addEventListener('click', generateAccounts)

  var resetButton = document.querySelector('.results button.reset')
  resetButton.addEventListener('click', showMnemonic)
}

function generateAccounts() {
  console.log('generating accounts')
  var mnemonic = document.querySelector('textarea.mnemonic').value

  var recovered
  try {
    recovered = recover(mnemonic)
  } catch (e) {}

  console.log(mnemonic)
  var accountCount = document.querySelector('input.accountCount').value
  var accounts = ethereumGen(recovered || mnemonic, accountCount)

  var resultEl = document.querySelector('section.results > ol.accounts')
  resultEl.innerHTML = ''
  hideMnemonic()

  for (var i = 0; i < accounts.length; i++) {
    var address = accounts[i]
    var accountEl = document.createElement('div')
    var accountLabel = document.createElement('p')
    accountLabel.innerText = address

    var qrImage = qrCode(4, 'M')
    qrImage.addData(address)
    qrImage.make()
    var qrEl = qrImage.createImgTag(4)

    accountEl.innerHTML = qrEl
    accountEl.appendChild(accountLabel)
    resultEl.appendChild(accountEl)
  }

  console.log('results added')
}

function showMnemonic () {
  console.log('hiding mnemonic')
  var mnemonic = document.querySelector('section.mnemonic-input')
  mnemonic.style.display = 'block'

  var results = document.querySelector('section.results')
  results.style.display = 'none'
}

function hideMnemonic () {
  console.log('showing mnemonic')
  var mnemonic = document.querySelector('section.mnemonic-input')
  mnemonic.style.display = 'none'

  var results = document.querySelector('section.results')
  results.style.display = 'block'
}
