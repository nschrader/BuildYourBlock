const { BlockTool } = require('./tools');
const crypto = require('crypto');

// Vous n'avez pas à comprendre BlockTool.
// Cette class vient en support du sujet.
// Si vous avez besoin de débugguer,
// vous pouvez commenter le `extends BlockTool`.
module.exports = class Block extends BlockTool {

  // Complétez le constructeur
  constructor(data) {
    super()
    this.previous = null;
    this.data = data;
    this.nonce = 0;
    this.date = new Date();
    this.id = null;
  }

  getHash() {
    var data = this.date + this.previous + this.data + this.nonce;
    return crypto.createHash('sha256').update(data, 'utf8').digest('hex');
  }

  isValid(zeros) {
    var proof = '0'.repeat(zeros);
    return this.getHash() == this.id && this.id.startsWith(proof);
  }

  mine(zeros) {
    var proof = '0'.repeat(zeros);
    while (true) {
      this.id = this.getHash();
      if (this.id.startsWith(proof)) {
        break;
      } else {
        this.nonce += 1;
      }
    }
    return this;
  }

}
