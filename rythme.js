const Block = require("./Block");
const Blockchain = require("./Blockchain");

class Participant {
  constructor(name) {
    this.name = name;
    this.puissance = 1;
  }

  // Change le block que le participant essaie de miner.
  generateBlock(previous) {
    this.block = new Block(this.name);
    this.block.previous = previous.id;
  }

  // Simule le calcule d'un hash et retourne le block si valide.
  tick(DIFFICULTY) {
    if (this.block.isValid(DIFFICULTY)) {
      return this.block;
    } else {
      this.block.nonce++;
      this.block.id = this.block.getHash();
      return false;
    }
  }
}

const RYTHME = 10;

/* La puissance de calcul est divisé par le nombre de participants,
 * donc la moyenne est 5 fois plus grand par block.
 */

class Simulation {
  constructor() {
    this.DIFFICULTY = 5;

    // premier block de la chaîne.
    const genesis = new Block("I am groot!");
    this.blockchain = new Blockchain();
    this.blockchain.add(genesis);

    this.participants = [
      new Participant("Philibert"),
      new Participant("Bernadette"),
      new Participant("Christophe"),
      new Participant("Julie"),
      new Participant("Fred")
    ]
  }

  // Annnonce aux participants qu'il y a un nouveau block
  initParticipants() {
    this.participants.forEach((p) => {
      p.generateBlock(this.blockchain.last())
    })
  }

  // Simule un calcule de hash par tous les participants
  tick() {
    return this.participants.reduce((block, p) => {
      if (block) {
        return block;
      } else {
        return p.tick(this.DIFFICULTY);
      }
    }, false)
  }

  // Lance la simulation
  simuler() {
    console.log("Lancement de la simulation");
    const startSim = Date.now();
    const target = this.blockchain.chain.length + 10;

    while (this.blockchain.chain.length < target) {
      console.log("Recherche du block", this.blockchain.chain.length);
      const startBlock = Date.now();
      this.initParticipants(); // on initialise les participants

      let block;

      do {
        block = this.tick();
      } while (!block);

      const endBlock = Date.now();
      this.blockchain.add(block);
      console.log(`Nouveau block trouvé en ${endBlock - startBlock} millisecondes :`, block);
    }

    const endSim = Date.now();
    const durationSim = endSim - startSim;

    console.log(this.blockchain);

    console.log(`Simulation effectué en ${durationSim} millisecondes.`);
    console.log(`Moyenne ${durationSim/10} millisecondes par block.`);
  }
}

const simulation = new Simulation();

simulation.simuler()

// simulation.initParticipants();
// simulation.tick();
