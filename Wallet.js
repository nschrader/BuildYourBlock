const NodeRSA = require('node-rsa');

module.exports = class Wallet {

  // https://github.com/rzcoder/node-rsa#load-key-from-pem-string
  constructor(key) {
    if (key) {
      this.privKey = new NodeRSA(key);
    } else {
      this.privKey = new NodeRSA({b: 512});
    }
    // Complétez le constructeur
  }

  // Retourne un booléen à true si l'on a la clé privée
  // https://github.com/rzcoder/node-rsa#properties
  hasPrivate() {
    // Astuce quand il y aura quelque-chose de bizarre:
    //   let maVariable = 42;
    //   !!maVariable === true
    return !!this.privKey.isPrivate() === true; //...
  }

  // Retourne la clé publique
  // https://github.com/rzcoder/node-rsa#importexport-keys
  getPublicKey() {
    return this.privKey.exportKey('pkcs8-public-pem'); // ...
  }

  // Retourne la signature
  // https://github.com/rzcoder/node-rsa#signingverifying
  sign(msg) {
    return this.privKey.sign(msg); // ...
  }

  // Vérifie la signature
  // Retourne un booléen à true si la signature est bonne
  // https://github.com/rzcoder/node-rsa#signingverifying
  verify(msg, signature) {
    return this.privKey.verify(msg, signature); // ...
  }
}
