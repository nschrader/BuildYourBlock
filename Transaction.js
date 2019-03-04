const NodeRSA = require('node-rsa');
const Block = require('./Block');

function generateNonce() {
  return Math.floor(Math.random()*1000000000);
}

module.exports = class Transaction {
  constructor(
    sourcePublicKey,
    destinationPublicKey,
    montant,
    signature = null
  ) {
    this.srcPubKey = sourcePublicKey;
    this.dstPubKey = destinationPublicKey;
    this.montant = montant;
    this.signature = signature;
    this.nonce = generateNonce();
  }

  sign(srcWallet) {
    this.signature = srcWallet.sign(this.srcPubKey + this.dstPubKey + this.montant);
  }

  setSignature(signature) {}

  verify() {
    return this.srcPubKey.verify(this.srcPubKey + this.dstPubKey + this.montant, this.signature);
  }
}
