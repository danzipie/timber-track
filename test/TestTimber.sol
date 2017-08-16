pragma solidity ^0.4.4;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/TimberTrack.sol";

contract TestTimber {

  function testInitialBalanceUsingDeployedContract() {
    TimberCoin meta = TimberCoin(DeployedAddresses.TimberCoin());

    uint expected = 10000;

    Assert.equal(meta.getBalance(tx.origin), expected, "Owner should have 10000 MetaCoin initially");
  }

}
