const crypto = require('crypto');

module.exports = class Block {
  constructor(previous, date, data) {
    this.previous = previous;
    this.date = date;
    this.data = data;
    this.nonce = 0;
    this.id = this.getHash();
  }

  getHash() {
    return crypto.createHash('sha256').update(
      `${this.previous}${this.date}${this.data}${this.nonce}`, 'utf8'
    ).digest('hex');
  }

  miner(difficulty) {
    const target = "0".repeat(difficulty);

    while(!this.id.startsWith(target)) {
      this.nonce++;
      this.id = this.getHash();
    }

    console.info("Nouveau hash :", this.id);
    return this;
  }
}
