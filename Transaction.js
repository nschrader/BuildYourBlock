const NodeRSA = require('node-rsa');

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
  }

  sign(srcWallet) {
    this.signature = srcWallet.sign(this.srcPubKey + this.dstPubKey + this.montant);
  }

  setSignature(signature) {}

  verify() {
    return this.srcPubKey.verify(this.srcPubKey + this.dstPubKey + this.montant, this.signature);
  }
}
