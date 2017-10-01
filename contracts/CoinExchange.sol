pragma solidity ^0.4.2;

import "./ConvertLib.sol";
import "./MetaCoin.sol";

// This contract implements the conversion between different coins.

contract CoinExchange {

  //struct Rates {
    uint rateTreeCoal = 50;
    uint rateTreePlank = 10;
  //}

  uint TREE_ID = 1;
  uint COAL_ID = 2;
  uint PLANK_ID = 3;
  // ENUM

  address [] their_contract;

  /* called only once at initialization */
  function CoinExchange(address [] adr) {

    for (uint a = 0; a<9; a++) {
      their_contract.push(adr[a]);
    }
    // this moved in the c.a.
    //their_contract.registerExchange();
  }

  // transform a certain quantity of a material
  // in a new one, according to the exchange rate
  function transform(uint iToken, uint quantity, uint oToken) {

    uint rate;
    if ((iToken ==TREE_ID)&&(oToken==COAL_ID)) {
      rate = rateTreeCoal;
    } else if (iToken == COAL_ID) {
      rate = rateTreePlank;
    } //else {
    //...
    //}

    // @TODO: security checks

    MetaCoin mt = new MetaCoin(their_contract[iToken]);

    // delete the iToken quantity
    address owner = msg.sender;
    mt.modifyToken(owner, -quantity);

    // create the oToken
    uint oTokenQuantity = rate*quantity/100;
    mt.modifyToken(owner, oTokenQuantity);
  }

  // @TODO: the possibility of changing the conversion rate
  function changeRate() {}

}
