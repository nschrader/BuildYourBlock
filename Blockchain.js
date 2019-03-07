const crypto = require('crypto');

module.exports = class Blockchain {
  constructor() {
    this.chain = [];
  }

  add(block) {
    this.chain.push(block);
  }

  last() {
    if (this.chain.length > 0) {
      return this.chain[this.chain.length - 1];
    } else {
      throw new Error("La blockchain est vide");
    }
  }

  isValid(difficulty) {
    const target = "0".repeat(difficulty);

    return this.chain.reduce(function(isValid, block, index, chain) {
      if (!isValid) {
        return false;
      } else if (block.id !== block.getHash()) {
        return false;
      } else if (!block.id.startsWith(target)) {
        return false;
      } else if (index === 0 && block.previous === null) {
        return true;
      } else if (block.previous !== chain[index - 1].id) {
        return false;
      } else {
        return true;
      }
    }, true);
  }
}
