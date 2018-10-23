// var ConvertLib = artifacts.require("./ConvertLib.sol");
// var MetaCoin = artifacts.require("./MetaCoin.sol");
var Controller = artifacts.require("./Controller.sol");

module.exports = function(deployer) {
  deployer.deploy(Controller);
  // deployer.deploy(ConvertLib);
  // deployer.link(ConvertLib, MetaCoin);
  // deployer.deploy(MetaCoin);
};
