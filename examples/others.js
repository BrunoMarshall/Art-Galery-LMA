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
const addr = "0xF163B63Bc569F39C5D5b399bEE0568339aD7FB13";

const options = {
  gasPrice: process.env.GAS_PRICE,
  gasLimit: process.env.GAS_LIMIT,
};
const instance = soccerPlayers.methods;

async function test(address) {
  let balance = await instance.balanceOf(addr).call(options);
  console.log("balance of " + addr + ": " + balance);
  const token = 1;
  let owner = await instance.ownerOf(token).call(options);
  console.log("owner of token " + token + " is " + owner);
  let price = await instance.priceOf(token).call(options);
  console.log("price of token " + token + " is " + price);
  let transactionCount = await instance.transactionCountOf(token).call(options);
  console.log("transactions of token " + token + " is " + transactionCount);
  let tokensOf = await instance.tokensOfOwner(addr).call(options);
  console.log("tokens of address: " + addr);
  tokensOf.forEach(token => {
    console.log(token.toString());
  });
  
}
test(addr).then(() => {
    process.exit(0);
});




