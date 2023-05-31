const bitcoin = require("bitcoinjs-lib");
const ecc = require("tiny-secp256k1");
const ECPairFactory = require("ecpair");

// Конфігурація мережі
const network = bitcoin.networks.bitcoin; // Можливо, вам знадобиться інша мережа, якщо використовуєте альтернативну криптовалюту

// Вхідні дані
const senderPrivateKey = "mgCFBRpMwfWmh5hHSiDVivwsrcmU84q2yH";
const senderAddress = "cPL8xC2ta4h4L3RVB4ed9rx1cUYb9HmjctSad4XiEzkNQ7nePhW7";
const recipientAddress = "mwm3AoZfC8bEuKUkhrGcY7u5KjkLiDYHuj";
const amount = 0.00001; // Кількість біткоїнів для відправки

// Підключаємось до мережі
const keyPair = bitcoin.ECPair.fromWIF(senderPrivateKey, network);
const senderPubKey = keyPair.publicKey;
const senderPubKeyHash = bitcoin.crypto.hash160(senderPubKey);
const senderAddressBytes = bitcoin.address.toOutputScript(
  senderAddress,
  network
);
const senderUTXO = {
  hash: "тут txId виходу",
  outputIndex: 0, // Індекс виходу в транзакції
  script: senderAddressBytes,
  value: amount * 100000000, // Перетворюємо суму в сатоші (1 BTC = 100000000 сатоші)
};

// Побудова транзакції
const tx = new bitcoin.TransactionBuilder(network);
tx.addInput(senderUTXO.txId, senderUTXO.outputIndex);
tx.addOutput(recipientAddress, amount * 100000000 - 10000); // Вираховуємо комісію

// Підпис транзакції
tx.sign(0, keyPair);

const serializedTx = tx.build().toHex();

console.log(serializedTx);
