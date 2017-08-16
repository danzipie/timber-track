var ConvertLib = artifacts.require("./ConvertLib.sol");
var MetaCoin = artifacts.require("./TimberTrack.sol");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, TimberTrack);
  deployer.deploy(TimberTrack);
};
