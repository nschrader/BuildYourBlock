const Block = require("./Block");
const Blockchain = require("./Blockchain");

const first  = new Block("First !");
const second = new Block("Second :)");
const third  = new Block("Vous commencez à voir le principe ?");

const difficulty = 5;
const blockchain = new Blockchain(difficulty);

blockchain.add(first);
blockchain.add(second);
blockchain.add(third);

console.log("isValid:", blockchain.isValid());

console.log(blockchain);
