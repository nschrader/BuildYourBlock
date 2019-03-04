const { BlockTool } = require('./tools');
const crypto = require('crypto');

function getHash(data) {
  return crypto.createHash('sha256').update(data, 'utf8').digest('hex');
}

function generateBlockId(block) {
  return getHash(block.date + block.previous + block.data + block.nonce)
}

// Vous n'avez pas à comprendre BlockTool.
// Cette class vient en support du sujet.
// Si vous avez besoin de débugguer,
// vous pouvez commenter le `extends BlockTool`.
module.exports = class Block extends BlockTool {

  // Complétez le constructeur
  constructor(previous, data) {
    super()
    this.previous = null;
    this.data = data;
    this.nonce = 0;
    this.date = new Date();
    this.id = null;
  }

  isValid() {
    return generateBlockId(this) == this.id;
  }

  mine(zeros) {
    var proof = '0'.repeat(zeros);
    while (true) {
      this.id = generateBlockId(this);
      if (this.id.startsWith(proof)) {
        break;
      } else {
        this.nonce += 1;
      }
    }
    return this;
  }

}
