const Migrations = artifacts.require("HarmonyArt");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
