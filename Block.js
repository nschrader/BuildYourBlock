const util = require('util');

function generateId() {
  return Math.floor(Math.random()*1000000000);
}

module.exports = class Block {

  // Complétez le constructeur
  constructor(previous, data) {
    this.previous = previous;
    //...

  }

  check() { return true; }

  [util.inspect.custom](){
    if (this.check()) {
      return `\nBlock: {\n  id: ${this.id}\n  prev: ${this.previous}\n  val: ${this.data} }`;
    } else {
      return 'Erreur de chaine'
    }
  }

}
