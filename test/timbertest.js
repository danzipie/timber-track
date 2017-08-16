var MetaCoin = artifacts.require("./TimberTrack.sol");

contract('TimberCoin', function(accounts) {
  it("should put 10000 MetaCoin in the first account", function() {
    return TimberCoin.deployed().then(function(instance) {
      return instance.getBalance.call(accounts[0]);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
    });
  });
});
