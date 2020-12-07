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
soccerPlayers.wallet.addByPrivateKey(
  process.env.PRIVATE_KEY2
);
const options = {
  gasPrice: process.env.GAS_PRICE,
  gasLimit: process.env.GAS_LIMIT,
  value: 100000000000000000000, // 100 ONEs
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
purchase(0).then(() => {
  process.exit(0);
});
