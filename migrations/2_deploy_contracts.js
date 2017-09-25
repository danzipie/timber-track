var ConvertLib = artifacts.require("./ConvertLib.sol");
var MetaCoin = artifacts.require("./MetaCoin.sol");
var CentralAuth = artifacts.require("./CentralAuthority.sol");

var coinNames = ['Pine', 'Spruce', 'Birch', 'Oak', 'Sawn timber', 'Chips', 'Sawdust', 'Furniture', 'Wood pellets'];

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.link(ConvertLib, CentralAuth);
  for (var u=0; u<9; u++) {
    deployer.deploy(MetaCoin, coinNames[u]);
  }

  deployer.deploy(CentralAuth);
};
