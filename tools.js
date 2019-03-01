// Ce fichier contient du code de support.
// Vous n'avez pas à le comprendre
// ni à le modifier

const util = require('util');

class BlockTool {

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

module.exports = {
  BlockTool
}
