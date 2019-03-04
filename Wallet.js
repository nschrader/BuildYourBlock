const NodeRSA = require('node-rsa');

module.exports = class Wallet {
  constructor(publicKey, montant = 0) {
    this.pubKey = new NodeRSA(publicKey);
    this.montant = montant;
  }

  setPrivateKey(key) {
    this.privKey = new NodeRSA(key);
  }

  sign(msg) {
    return this.privKey.sign(msg);
  }

  verify(msg, signature) {
    return this.pubKey.verify(msg, signature);
  }
}
