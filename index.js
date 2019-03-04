const Block = require('./Block');
const Blockchain = require('./Blockchain');
const Wallet = require('./Wallet')
const Transaction = require('./Transaction')

const DIFFICULTY = 4;

const blockchain = new Blockchain();

const first = new Block(
  null,
  new Date("2019-02-27T08:01:42.000Z"),
  "First !"
);

first.miner(DIFFICULTY)

const second = new Block(
  first.id,
  new Date("2019-02-27T10:02:43.000Z"),
  "Second :)"
);

second.miner(DIFFICULTY)

const third = new Block(
  second.id,
  new Date("2019-02-28T10:03:44.000Z"),
  "Vous commencez à voir le principe ?"
);

third.miner(DIFFICULTY)

blockchain.add(first);
blockchain.add(second);
blockchain.add(third);

console.log("isValid:", blockchain.isValid(DIFFICULTY));

const walletA = new Wallet(`-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqrxMZeGmnZM08Pr8Srbu
q2ZNAgtOj4mTxKSwOJIVbCkWVkTqFtZsib4FarXSsrqsTQNjhJHAN5W8I6aIIaqS
5jzWFzHgPYloi6RV7xTL9IBSPcakMGWJTp8ldeJ9kpCSXN0AozlKSCEqGTQdnVRZ
95UgNVSgDVYtCZjPJanx6asw8E46XTBwj+msMpc855ydz3YGxGyfmPBzbWy3aMzH
Lt9v9nxit7srzRh6lnj42kRZPxH3zpntlOu4ODXXxhhDEwnnz921844uHLby3VRu
WRys+S2Isz0tKOCtxnh0xxpa0Fa8JrTY8JWDye3iX5ugp/sJQXHSidJLWzmY4RMa
mQIDAQAB
-----END PUBLIC KEY-----`);

walletA.setPrivateKey(`-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEAqrxMZeGmnZM08Pr8Srbuq2ZNAgtOj4mTxKSwOJIVbCkWVkTq
FtZsib4FarXSsrqsTQNjhJHAN5W8I6aIIaqS5jzWFzHgPYloi6RV7xTL9IBSPcak
MGWJTp8ldeJ9kpCSXN0AozlKSCEqGTQdnVRZ95UgNVSgDVYtCZjPJanx6asw8E46
XTBwj+msMpc855ydz3YGxGyfmPBzbWy3aMzHLt9v9nxit7srzRh6lnj42kRZPxH3
zpntlOu4ODXXxhhDEwnnz921844uHLby3VRuWRys+S2Isz0tKOCtxnh0xxpa0Fa8
JrTY8JWDye3iX5ugp/sJQXHSidJLWzmY4RMamQIDAQABAoIBAHCwh9xW65nlp3PG
tO67fxwyEXHf9KJYs+d+q7Eq+mjBVbTrF3arYEgp23lrOP4up7rNGcpOSQhnFB6T
tBZEd2Dvln8ItHDpWM+SUAXVPCjM6XtMuOIYol/6OsdsDmXGdlREqj8ReS3Sde7c
rw9AtYDsNK3+hQVIc8F50n+Rg9ItylZX268A3KBIKKHXvatMBhRuIMPHcsq0ghDk
wKAuL+70A55tdkq/v8+XaUX54HbujRtjqNOc1hzsKnc39hWwOkQz+V0qh+mAh1od
vYLFO/Efe8LhbGQ9iz+IqMSC5PevnTMqi/x4s5J5jxlAyHcHCqUP/x6f0wRABp/W
yo84+YECgYEA/v9D0Z6NQLPzlcvW9EY4D0ouj1pxk0OcABR+J7IO5eftghs30Uox
rocA11cK5F8cPTY4NXsFB18Dj5dFzfi7WRxPSR6N2gXBjbbiSMQaQInnaWFEdDKD
81V5WkjYgrwIVf+dEIVmdcvTletc15ympAkIqvd6xkGwUpZJiXOInW0CgYEAq2gy
mAzTgXodtfIWmTIGYJef4MuDIQ7iFOhNey8OFV/rnewFngVK7hpxoyslsnhSXZjr
iUdhVEeZzf0C5eFmemPrWnXSgQxJnXJY53S7HByZOt4kLBhQZ6BvqEHB+oC+2aqp
GrWvQcsNxKllzhCnnQ1jsKHANiitS0tSMcP5Ul0CgYEAnJS83VQh4rBdjAdOaFNS
Czl/G7Hq+gXTHk13JgL1mQFw26rA/Lg1h7kIsDKX0qIAoinQHC79aIhUlHDMgW0S
BecXXIvxiQZt0wqRKyOYBzdnLVN4CG4YjmxXBzSiFq1F5SEAHmv7/at6sp2DNjbQ
MPwHIYy0DFe74Qq9/zQ9mIUCgYBQvaFvfEM5L2PFbAb3HNhiMaovAs5/CPq4LIEq
8Ixqxyc+2Yn/2LBmHnC/ErkMK59o1XrFzKjtQVkS7gaqcJWMO3sGvo9tGHOoxc9Z
H+Rvpo0LbM6PMtjVJ37RPEB6lqDP+ZL0sPagQFz48W6yNagu07rM3jSjjl+rIwzR
wmW0RQKBgB+NEmb9aIS+4xpNzpbCFtDAqQ4Y095ubXOjklBLz4mhtlL5a9kVr8FR
BNYfBG/A1UOCzoi462wwYRZooMIdOGzGqea64VfaxOdu4Gds0GAKhLYUZkrjG+mJ
ptK3iCr990g4yqQyWNDvXqrdz3BrhsLJrdwYooX+iU2VHxj+dKKP
-----END RSA PRIVATE KEY-----`);

const walletB = new Wallet(`-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArbX5jfQLS3wdbJluVriF
wB2Yuphqc+rO4FZJ5dj26urKs/fEgsknv2ccI6dS23yZ5mekx8puaGrVS5ib8Rg0
fH9rhylNxj5CJw/vEEEmyilbfrnU5wtcPgiYeBKaG6XdSRCBBOMkQND5A9uPp3Hz
OSKZLB16ybs0N5vrfxcKXQyMIw38cvVIAOIGdXwH2O2CD8QChOYX1VCiwHXQUrRB
0ZzJGf5NOxXVKJpohK4MT8nu+QhR6YEdHMfCPPKtjFrAE8fO0WAFewownHe++xKx
4yXIY8eoHY/Fy8lljRgWzfqpLC1K6EQzVrH26bvrkQ0oLb4hrEx9MxPLemNxyI24
SQIDAQAB
-----END PUBLIC KEY-----`);

walletB.setPrivateKey(`-----BEGIN RSA PRIVATE KEY-----
MIIEpQIBAAKCAQEArbX5jfQLS3wdbJluVriFwB2Yuphqc+rO4FZJ5dj26urKs/fE
gsknv2ccI6dS23yZ5mekx8puaGrVS5ib8Rg0fH9rhylNxj5CJw/vEEEmyilbfrnU
5wtcPgiYeBKaG6XdSRCBBOMkQND5A9uPp3HzOSKZLB16ybs0N5vrfxcKXQyMIw38
cvVIAOIGdXwH2O2CD8QChOYX1VCiwHXQUrRB0ZzJGf5NOxXVKJpohK4MT8nu+QhR
6YEdHMfCPPKtjFrAE8fO0WAFewownHe++xKx4yXIY8eoHY/Fy8lljRgWzfqpLC1K
6EQzVrH26bvrkQ0oLb4hrEx9MxPLemNxyI24SQIDAQABAoIBAQCMgSFeOWQdZUGj
gqLl0BCXKRlM7FVGd0ln2UOifxCRSOI2GRVAuBXHUk5HZGK3l5wf6fs1gr41BRyL
LeAMbYienq3JwJXg4KC/WbsDSb9nS3ZvFT5otx6gKnGwxVMTQ+Ct5YSGAHdlWeHg
xen3BUs3Do4YSav0mdANnrcnr+o5AcC9P3pFQkoiHjy67JC/uAgokuR6oeahAkqj
tqZQlBS2UmPR9+/9huTFXX56LwbE3ClbHAI5g57Q8dH92vWJf4AFjyP4XWdCxPfV
0jxUEkGFqM2q3vcicJ2+Hj3tVlmUBDX+eHFqEqvqlYFmL9XxSyS37Rj1pTHNpa+n
OuAMyLbRAoGBAPbyAIlss6lSsQXVIYR0gj/GyOfu1Gz0y0UciQsGXVW/sBvbAQAK
BoRs9L/erzv+ObvL4Ku9HWaDTRhb2cNKfrpnIQaaY3D5Gk9fn0yBBBf88QsJII/p
hDDEadZq1hIDZok4NK0VzShfaWGTiV8KL3djZn7hEeR8rRwaP0KUp+0FAoGBALQU
izGkEVa4izYBLlS4SW9DTSFjZIJb697uokIbeCCiwIB3ZwkyXAdIKUALvPI7IZZG
EpnijJjcxLyb8OWjX7du/AhJ1XgHJ3BVOA7sNfjeguHRQkqF+0SFCdF7UdwFIEXm
HlCqZ60DoVPxl0ZCRieT+qCuChkMhVhjrcCfGeF1AoGBANmeZm60xpce8jWrnv/1
FJtTeNU7mSPzjfZ3sSVwFGxuoqnJk9YO/7NPuVgky9RYs1QV1QZDgFdIunYO65a4
XXmzTF1fTObP/ymXoPBwecUR+PG6t2Fbbkzzqjl0qPXy3TdrurAVmFhNzLZaqCKC
/VV+2WJSwcvTO1Kapsjr7BhpAoGBAJROzwxFCRqYxd3mPxf65k/B58X1q5NIzQs/
EVbMdLS8FTo4HB2Q4gYFQiPDBwuf81tlvnAKCqziNQz4iP82+9+AggT5edtuWObE
6HQxyYl7B+OeibAChBu8TYe+vn4ropaunIzmqpftA3K051cvwcNatfCbJSnYDAHt
pe2bmp75AoGAMkFL2mO9tiGyYfuw8GnARvI9lShB1sXRkv93xWclnyYgpbjXlrOM
1zkXX5+bXToooZLCbwrtndceVFJMbfH/wOM9HBWjQdcWdMJwAt0yl6GbwZ3MggCt
D5Lkv/sxWLvbFRGVh9nvSAkTpilIxWsIcFvGLk/Q8mEBmjAGltDqBIk=
-----END RSA PRIVATE KEY-----`);

const text = 'Hello RSA!';

const signatureA = walletA.sign(text);
console.log('Signature A : ', signatureA);
const verifyA = walletA.verify(text, signatureA);
console.log('Verify A : ', verifyA);

const signatureB = walletB.sign(text);
console.log('Signature B : ', signatureB);
const verifyB = walletB.verify(text, signatureB);
console.log('Verify B : ', verifyB);

const transaction = new Transaction(
  walletA.pubKey,
  walletB.pubKey,
  1000
);

transaction.sign(walletA);

console.log("Transaction valide :", transaction.verify());
