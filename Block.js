const { BlockTool } = require('./tools');
const crypto = require('crypto');

function getHash(data) {
  return crypto.createHash('sha256').update(data, 'utf8').digest('hex');
}

function generateId(date, previous, data) {
  return getHash(date + previous + data)
}

// Vous n'avez pas à comprendre BlockTool.
// Cette class vient en support du sujet.
// Si vous avez besoin de débugguer,
// vous pouvez commenter le `extends BlockTool`.
module.exports = class Block extends BlockTool {

  // Complétez le constructeur
  constructor(previous, data) {
    super()
    this.previous = previous;
    this.data = data;
    this.date = new Date();
    this.id = generateId(this.date, previous, data);
  }

  isValid() {
    return true;
  }
}
