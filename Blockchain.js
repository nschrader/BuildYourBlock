const crypto = require('crypto');
const { BlockchainTool } = require('./tools');

module.exports = class Blockchain extends BlockchainTool {
  constructor(difficulty) {
    super()
    this.chain = [];
    this.difficulty = difficulty;
  }

  add(block) {
    try {
      block.previous = this.last().id;
    } catch (e) {
      block.previous = null;
    }
    this.chain.push(block.mine(this.difficulty));
  }

  last() {
    if (this.chain.length > 0) {
      return this.chain[this.chain.length - 1];
    } else {
      throw new Error("La blockchain est vide");
    }
  }

  isValid() {
    var prev = null;
    var proof = '0'.repeat(this.difficulty);
    for (var b of this.chain) {
      if (!b.isValid()) {
        return false;
      }
      if (prev != null && prev.id != b.previous) {
        return false;
      }
      prev = b;
    }
    return true;
  }
}
