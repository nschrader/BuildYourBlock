const Wallet = require("./Wallet")
const {Transaction, Input, Output} = require("./Transaction")

const PRIVATE_KEY_ALICE = `-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEAqrxMZeGmnZM08Pr8Srbuq2ZNAgtOj4mTxKSwOJIVbCkWVkTq\nFtZsib4FarXSsrqsTQNjhJHAN5W8I6aIIaqS5jzWFzHgPYloi6RV7xTL9IBSPcak\nMGWJTp8ldeJ9kpCSXN0AozlKSCEqGTQdnVRZ95UgNVSgDVYtCZjPJanx6asw8E46\nXTBwj+msMpc855ydz3YGxGyfmPBzbWy3aMzHLt9v9nxit7srzRh6lnj42kRZPxH3\nzpntlOu4ODXXxhhDEwnnz921844uHLby3VRuWRys+S2Isz0tKOCtxnh0xxpa0Fa8\nJrTY8JWDye3iX5ugp/sJQXHSidJLWzmY4RMamQIDAQABAoIBAHCwh9xW65nlp3PG\ntO67fxwyEXHf9KJYs+d+q7Eq+mjBVbTrF3arYEgp23lrOP4up7rNGcpOSQhnFB6T\ntBZEd2Dvln8ItHDpWM+SUAXVPCjM6XtMuOIYol/6OsdsDmXGdlREqj8ReS3Sde7c\nrw9AtYDsNK3+hQVIc8F50n+Rg9ItylZX268A3KBIKKHXvatMBhRuIMPHcsq0ghDk\nwKAuL+70A55tdkq/v8+XaUX54HbujRtjqNOc1hzsKnc39hWwOkQz+V0qh+mAh1od\nvYLFO/Efe8LhbGQ9iz+IqMSC5PevnTMqi/x4s5J5jxlAyHcHCqUP/x6f0wRABp/W\nyo84+YECgYEA/v9D0Z6NQLPzlcvW9EY4D0ouj1pxk0OcABR+J7IO5eftghs30Uox\nrocA11cK5F8cPTY4NXsFB18Dj5dFzfi7WRxPSR6N2gXBjbbiSMQaQInnaWFEdDKD\n81V5WkjYgrwIVf+dEIVmdcvTletc15ympAkIqvd6xkGwUpZJiXOInW0CgYEAq2gy\nmAzTgXodtfIWmTIGYJef4MuDIQ7iFOhNey8OFV/rnewFngVK7hpxoyslsnhSXZjr\niUdhVEeZzf0C5eFmemPrWnXSgQxJnXJY53S7HByZOt4kLBhQZ6BvqEHB+oC+2aqp\nGrWvQcsNxKllzhCnnQ1jsKHANiitS0tSMcP5Ul0CgYEAnJS83VQh4rBdjAdOaFNS\nCzl/G7Hq+gXTHk13JgL1mQFw26rA/Lg1h7kIsDKX0qIAoinQHC79aIhUlHDMgW0S\nBecXXIvxiQZt0wqRKyOYBzdnLVN4CG4YjmxXBzSiFq1F5SEAHmv7/at6sp2DNjbQ\nMPwHIYy0DFe74Qq9/zQ9mIUCgYBQvaFvfEM5L2PFbAb3HNhiMaovAs5/CPq4LIEq\n8Ixqxyc+2Yn/2LBmHnC/ErkMK59o1XrFzKjtQVkS7gaqcJWMO3sGvo9tGHOoxc9Z\nH+Rvpo0LbM6PMtjVJ37RPEB6lqDP+ZL0sPagQFz48W6yNagu07rM3jSjjl+rIwzR\nwmW0RQKBgB+NEmb9aIS+4xpNzpbCFtDAqQ4Y095ubXOjklBLz4mhtlL5a9kVr8FR\nBNYfBG/A1UOCzoi462wwYRZooMIdOGzGqea64VfaxOdu4Gds0GAKhLYUZkrjG+mJ\nptK3iCr990g4yqQyWNDvXqrdz3BrhsLJrdwYooX+iU2VHxj+dKKP\n-----END RSA PRIVATE KEY-----`;

const PUBLIC_KEY_BOB = `-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArbX5jfQLS3wdbJluVriF\nwB2Yuphqc+rO4FZJ5dj26urKs/fEgsknv2ccI6dS23yZ5mekx8puaGrVS5ib8Rg0\nfH9rhylNxj5CJw/vEEEmyilbfrnU5wtcPgiYeBKaG6XdSRCBBOMkQND5A9uPp3Hz\nOSKZLB16ybs0N5vrfxcKXQyMIw38cvVIAOIGdXwH2O2CD8QChOYX1VCiwHXQUrRB\n0ZzJGf5NOxXVKJpohK4MT8nu+QhR6YEdHMfCPPKtjFrAE8fO0WAFewownHe++xKx\n4yXIY8eoHY/Fy8lljRgWzfqpLC1K6EQzVrH26bvrkQ0oLb4hrEx9MxPLemNxyI24\nSQIDAQAB\n-----END PUBLIC KEY-----`;

const walletAlice = new Wallet(PRIVATE_KEY_ALICE);

// Il faut une transaction pour commencer
// Nous verrons les diffèrentes solutions pour créer de la monnaie plus tard.
const transactionGenesis = new Transaction([], [
  new Output(5000, walletAlice.getPublicKey())
])

// Transactions non dépensées
// Liste tous les TxOuts utilisables
var unspentOutputs = [
  {tx: transactionGenesis, index: 0}
]

// Le but est de transfèrer 1000 BYB de Alice à Bob.
// Pour commencer, implémentez les constructeurs de Transaction, Input et Output.

const input = new Input(transactionGenesis, 0, walletAlice.getPublicKey());
const output1 = new Output(1000, PUBLIC_KEY_BOB);
const output2 = new Output(4000, walletAlice.getPublicKey());

const inputs = [input];
const outputs = [output1, output2];

const Send1000AliceToBob = new Transaction(inputs, outputs);

// Mettre à jour unspentOutputs en enlevant les outputs utilisés
// Et en ajoutant les nouveaux.
unspentOutputs = [
  {tx: Send1000AliceToBob, index: 1}
]

// Implémentez cette fonction.
const maTransaction = Transaction.buildSimpleTransaction(walletAlice, PUBLIC_KEY_BOB, 2000, unspentOutputs);

console.log("Combien de BYB avez-vous ", maTransaction);
