require("dotenv").config();
const { Harmony } = require("@harmony-js/core");
const { ChainID, ChainType } = require("@harmony-js/utils");
const hmy = new Harmony(
  // let's assume we deploy smart contract to this end-point URL
  HMY_NODE_URL,
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
  process.env.PRIVATE_KEY
);
const options = {
  gasPrice: "0x3B9ACA00",
  value: "0x8C2A687CE7720000",
  from: "0xF163B63Bc569F39C5D5b399bEE0568339aD7FB13",
};
const instance = soccerPlayers.methods;
async function purchase(id) {
  let res = await instance.purchase(id).estimateGas(options);
  console.log("gas cost for purchase: " + res);
}
purchase(3).then(() => {
  process.exit(0);
});
