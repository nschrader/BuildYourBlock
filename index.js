const Block = require("./Block");
const Blockchain = require("./Blockchain");

const first  = new Block(null     , "First !");
const second = new Block(first.id , "Second :)");
const third  = new Block(second.id, "Vous commencez à voir le principe ?");

const difficulty = 4;
const blockchain = new Blockchain(difficulty);

blockchain.add(first);
blockchain.add(second);
blockchain.add(third);

console.log("isValid:", blockchain.isValid());

console.log(blockchain);
