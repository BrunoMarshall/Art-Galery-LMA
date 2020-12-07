require("dotenv").config();
const { Harmony } = require("@harmony-js/core");
const { ChainID, ChainType } = require("@harmony-js/utils");
const hmy = new Harmony(
  // let's assume we deploy smart contract to this end-point URL
  "https://api.s0.b.hmny.io",
  {
    chainType: ChainType.Harmony,
    chainId: ChainID.HmyTestnet,
  }
);
const contractJson = require("../build/contracts/HarmonyArt.json");
const contractAddr = "0x0Fc3269F1ED6807aD96C62b66fAfdE2C02f9a76b";

const soccerPlayers = hmy.contracts.createContract(
  contractJson.abi,
  contractAddr
);
soccerPlayers.wallet.addByPrivateKey(process.env.PRIVATE_KEY);
const ceoAddress = soccerPlayers.wallet.signer.address;

const options = {
  gasPrice: process.env.GAS_PRICE,
  gasLimit: process.env.GAS_LIMIT,
};
const instance = soccerPlayers.methods;

async function display() {
  let total = await instance.totalSupply().call(options);
  console.log("total arts: " + total.toString());
  for (i = 0; i < total; i++) {
    let res = await instance.getPlayer(i).call(options);
    console.log("========== Art info (index: " + i + ")==========");
    console.log("name", res.playerName);
    console.log("internalPlayerId", res.internalPlayerId);
    console.log("sellingPrice", res.sellingPrice);
    console.log("owner", res.owner);
    console.log("transactions", res.transactionCount);
  }
}
async function createPlayers() {
  let players = [
    "Deportation",
    "The Earth is Burning",
    "Family Portrait",
    "The Golden River",
    "Labour Camp",
    "Only Clover To Eat",
    "Traces of a Home",
    "Daily Registration",
    "Child Memories",
    "Lost Family",
    "War",
    "Piroschki",
    "Schuster",
    "Unfulfilled Expectations",
    "Black Soup",
    "Emigration",
    "Nationalities",
    "Integration Feeling",
    "Background-origin",
    "Mother Language",
    "Neighbours",
    "Religions",
    "Home",
  ];
  for (i = 0; i < players.length; i++) {
    let res = await instance
      .createPromoPlayer(ceoAddress, players[i], 0, i)
      .send(options);
    console.log(
      "created art: " +
        players[i] +
        ", tx hash: " +
        res.transaction.receipt.transactionHash
    );
  }
}
createPlayers().then(() => {
  display().then(() => {
    process.exit(0);
  });
});
