var ConvertLib = artifacts.require("./ConvertLib.sol");
var MetaCoin = artifacts.require("./MetaCoin.sol");
var CentralAuth = artifacts.require("./CentralAuthority.sol");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
    deployer.link(ConvertLib, CentralAuth);
  deployer.deploy(MetaCoin);
  deployer.deploy(CentralAuth);
};
