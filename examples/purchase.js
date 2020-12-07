require("dotenv").config();
const { Harmony } = require("@harmony-js/core");
const { ChainID, ChainType } = require("@harmony-js/utils");
const hmy = new Harmony(
  // let's assume we deploy smart contract to this end-point URL
  process.env.HMY_NODE_URL,
  {
    chainType: ChainType.Harmony,
    chainId: Number(process.env.HMY_CHAIN_ID),
  }
);
const contractJson = require("../build/contracts/HarmonyArt.json");
const contractAddr = process.env.HMY_ART_CONTRACT;

const soccerPlayers = hmy.contracts.createContract(
  contractJson.abi,
  contractAddr
);
soccerPlayers.wallet.addByPrivateKey(
  process.env.PRIVATE_KEY2
);
const options = {
  gasPrice: process.env.GAS_PRICE,
  gasLimit: process.env.GAS_LIMIT,
  value: 200000000000000000000, // 100 ONEs
};
const instance = soccerPlayers.methods;
async function purchase(id) {
  let res = await instance.purchase(id).send(options);
//   console.log(
//     "purchased player: " +
//       id +
//       ", tx hash: " +
//       res.transaction.receipt
//   );
    console.log(res);
}
purchase(16).then(() => {
  process.exit(0);
});
