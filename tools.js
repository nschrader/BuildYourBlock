// Ce fichier contient du code de support.
// Vous n'avez pas à le comprendre
// ni à le modifier

const util = require('util');

class BlockTool {

  // Indique si le block est valide
  isValid() { return false; }

  // Pour l'affichage dans la console
  [util.inspect.custom](depth, options){
    if (!this.isValid()) {
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

class BlockchainTool {
  isValid() { return false; }

  [util.inspect.custom](depth, options){
    if (depth < 0) {
      if (!this.isValid()) {
        return options.stylize('[InvalidBlockchain]', 'regexp');
      } else {
        return options.stylize('[Blockchain]', 'special');
      }
    }

    let msg = options.stylize('Blockchain', 'special');

    if (!this.isValid()) {
      msg = options.stylize("InvalidBlockchain", 'regexp');
    }

    const newOptions = Object.assign({}, options, {
      depth: options.depth === null ? null : options.depth - 1
    });

    const chain = this.chain.map((block) => {
      const boxLine = util.inspect(block, newOptions).split('\n');
      const maxLengthLine = boxLine.reduce((max, line) => {
        return Math.max(max, line.length);
      }, 0);
      const boxWrap = boxLine.map((line) => {
        return `| ${line} ${' '.repeat(maxLengthLine - line.length + 6)}|`;
      }).join('\n');
      const border = '-'.repeat(maxLengthLine);
      return `\n${border}\n${boxWrap}\n${border}`;
    }).join('\n  /\\\n  ||');

    return `${msg} < ${chain} >`;
  }
}

module.exports = {
  BlockTool,
  BlockchainTool
}
