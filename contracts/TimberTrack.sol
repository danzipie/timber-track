pragma solidity ^0.4.4;

import "./ConvertLib.sol";

pragma solidity ^0.4.8;


/**
 * The TimberCoin is a generic token that represents the amount of certified object,
 * that is wood under the form of tree, coal, plank.
 */
contract TimberCoin {

    mapping (address => uint) balances;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    function TimberCoin() {
        balances[tx.origin] = 0;
    }

    function sendCoin(address receiver, uint amount) returns(bool sufficient) {
        if (balances[msg.sender] < amount) return false;
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        Transfer(msg.sender, receiver, amount);
        return true;
    }

    function getBalanceInEth(address addr) returns(uint){
        return ConvertLib.convert(getBalance(addr),2);
    }

    function getBalance(address addr) returns(uint) {
        return balances[addr];
    }

    /** New functionalities of our coin start here! **/

    function modifyToken(address agent, uint quantity) {
        balances[agent] += quantity;
    }

}

/**
 * The exchange contains predefined transactions to modify the material
 * and therefore exchange the associated tokens.
 */
contract Exchange {

    uint rateTreePlank = 10;
    uint rateTreeCoal = 50;

    uint TREE_ID = 1;
    uint COAL_ID = 2;
    uint PLANK_ID = 3;
    address owner;
    TimberCoin [] coins;

    /* called only once at initialization */
    function Exchange() {

    }

    function registerCoin(address cAddress) {

        //if (msg.sender != owner)
        //    assert(0);

        coins.push(TimberCoin(cAddress));
    }

    /* transform a certain quantity of a material
    in a new one, according to the exchange rate */
    function transform(uint iToken, uint quantity, uint oToken) {

        uint rate;

        if ((iToken ==TREE_ID)&&(oToken==COAL_ID)) {
            rate = rateTreeCoal;
        } else {
            rate = rateTreePlank;
        }

        // security checks
        // @TODO

        // delete the input token quantity
        owner = msg.sender;
        coins[iToken].modifyToken(owner, -quantity);

        // create the output token
        uint oTokenQuantity = rate*quantity/100;
        coins[oToken].modifyToken(owner, oTokenQuantity);
    }

    /* Only the central authority can modify the rates
    * @TODO
    * */
    function changeRate() {}

}

/**
 * The Central Authority can initialize tokens and authorize coniators.
 * It also registers and modifies exchanges.
 */
contract CentralAuthority {

    mapping(address => uint) tokens;

    // certifiers
    address[] authorizedConiators;
    uint nConiators;

    function CentralAuthority() {
        nConiators = 0;
    }

    /* Register a token */
    function registerToken(address tokenAddr, uint token_id)
    {
        tokens[tokenAddr] = token_id;
    }

    function registerExchange() {

    }

    function registerConiator() {

    }

}