var HarmonyArt = artifacts.require("HarmonyArt");

module.exports = function () {
  async function purchase(id) {
    let val = 100000000000000000000; // 10 ONEs
    // let price = 30000000000
    HarmonyArt.defaults({value: val});//, gasPrice: price})
    let instance = await HarmonyArt.deployed();
    let res = await instance.purchase(id);
    console.log("tx hash:" + res.tx);
    res.logs.forEach(event => {
      if (event.event == "TokenSold") {
        console.log(event.args);
      }
    });
  }
  // purchase Lionel Messi
  purchase(1).then(() => {
      console.log("done!!!");
      process.exit(0);
  });
};