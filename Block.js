const util = require('util');

// Je mets ça là ... au cas où ...
function generateId() {
  return Math.floor(Math.random()*1000000000);
}

module.exports = class Block {

  // Complétez le constructeur
  constructor(previous, data) {
    this.previous = previous;
    //...
  }

  // Indique si le block est valide
  check() { return true; }

  // Pour l'affichage dans la console
  [util.inspect.custom](depth, options){
    if (!this.check()) {
      return options.stylize('[InvalidBlock]', 'regexp');
    }

    if (depth < 0) {
      return options.stylize('[Block]', 'special');
    }

    const newOptions = Object.assign({}, options, {
      depth: options.depth === null ? null : options.depth - 1
    });

    const padding = ' '.repeat(7);
    const format = function(value) {
      return util.inspect(value, newOptions)
          .replace(/\n/g, `\n${padding}`);
    };
    const inner = `\n${padding}id: ${format(this.id)}\n${padding}prev: ${format(this.previous)}\n${padding}val: ${format(this.data)}`
    return `${options.stylize('Block', 'special')}< ${inner} >`;
  }
}
