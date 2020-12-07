var HarmonyArt = artifacts.require("HarmonyArt");
const myAddress = "0x8305CF9EFa27c72A547B218Dd0B2Cc18dD9316F0";

module.exports = function () {
  async function createPlayers() {
    let instance = await HarmonyArt.deployed();
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
    for (i = 0; i < players.length; i++) { //players.length
      let res = await instance.createPromoPlayer(myAddress, players[i], 0, i)
      console.log("created player: " + players[i] + ", tx hash: " + res.tx);
    }
  }
  async function display() {
    let instance = await HarmonyArt.deployed();
    let total = await instance.totalSupply();
    console.log("total players: " + total.toString());
    for (i = 0; i < total; i++) {
      let res = await instance.getPlayer(i);
      console.log("========== Player info (index: " + i + ")==========");
      console.log("name", res.playerName);
      console.log("internalPlayerId", res.internalPlayerId);
      console.log("sellingPrice", res.sellingPrice);
      console.log("owner", res.owner);
      console.log("transactions", res.transactionCount);
    }
  }
  createPlayers().then(() => {
    display().then(() => {
      console.log("done!!!");
      process.exit(0);
    });
  });
};
