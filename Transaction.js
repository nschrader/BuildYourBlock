const NodeRSA = require('node-rsa');
const crypto = require('crypto');

function calcUnspentOutputsForMontant(montant, unspentOutputs, publicKey) {
  let unspentOutputsForMontant = [];
  let valueUnspentOutputsForMontant = 0;

  for (let i = 0; i < unspentOutputs.length; i++) {
    const unspentOutput = unspentOutputs[i];
    const output = unspentOutput.tx.outputs[unspentOutput.index];

    if(output.destinataire === publicKey) {
      unspentOutputsForMontant.push(unspentOutput);
      valueUnspentOutputsForMontant += output.montant;

      if (valueUnspentOutputsForMontant >= montant) {
        return [unspentOutputsForMontant, valueUnspentOutputsForMontant];
      } else {
        continue;
      }
    } else {
      continue;
    }
  }

  // Quand on n'a pas assez d'argent, on lance une exception
  throw new Error("Vous n'avez pas assez.");
}

// Représente une transaction ou un chèque.
// Souvent abrégé en tx quand passé en variable.
class Transaction {
  // Construit une transaction envoyant montant à destinataire.
  // Retourne la transaction
  static buildSimpleTransaction(senderWallet, destinataire, montant, unspentOutputs) {
    //[0] contient la liste des outputs et [1] contient le montant total de ces outputs
    const unspentOutputsToUse = calcUnspentOutputsForMontant(montant, unspentOutputs, senderWallet.getPublicKey());
    let inputsToUse = unspentOutputsToUse[0].map((unspentOutput) => {
      return new Input(unspentOutput.tx, unspentOutput.index, senderWallet.getPublicKey());
    });

    let output = new Output(montant, destinataire);
    let outputSelf = new Output(unspentOutputsToUse[1] - montant, senderWallet.getPublicKey());
    return new Transaction(inputsToUse, [output, outputSelf]);
  }

  // @params inputs : un tableau de Input
  // @params outputs : un tableau de Output
  constructor(
    inputs,
    outputs
  ) {
    this.inputs = inputs;
    this.outputs = outputs;
    this.id = this.getHash();
  }

  // Retourne le hash du Tx : hash des inputs + hash des outputs
  getHash() {
    const hashInputs = this.inputs.map((input) => {return input.hash;}).join('');
    return crypto.createHash('sha256').update(hashInputs, 'utf8').digest('hex');
  }
}

class Input {
  // @params tx : transaction dans laquelle est le Output que j'utilise
  // @params index : index du Output dans le outputs de la transaction
  // @params signature : signature du destinataire du Output
  constructor(tx, index, signature) {
    this.tx = tx;
    this.index = index;
    this.signature = signature;
  }

  // Retourne le hash du Input : tx.id + index + signature
  getHash() {
    return crypto.createHash('sha256').update(tx.id + this.index + this.signature, 'utf8').digest('hex');
  }
}

class Output {
  constructor(montant, destinataire) {
    this.montant = montant;
    this.destinataire = destinataire;
  }

  // Retourne le hash du Output : montant + destinataire
  getHash() {
    return crypto.createHash('sha256').update(this.montant + this.destinataire, 'utf8').digest('hex');
  }
}

module.exports = {
  Transaction,
  Input,
  Output
}
