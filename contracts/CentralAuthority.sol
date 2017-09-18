/**
 * The Central Authority can initialize tokens and authorize coniators.
 * It also registers and modifies exchanges.
 */

pragma solidity ^0.4.2;

import "./MetaCoin.sol";

contract CentralAuthority {

    address public owner;
    address public exchange;
    mapping(address => bool) allowedCertificator;

    MetaCoin [] public tokens;

    //comment ug: I am actually not quite sure if we should do
    //it with some kind of mapping or with an array, as we are not able to go
    // with a foreach over an mapping, but we can check easily if it a
    // value is contained in there
    // certifiers
    //address[] authorizedConiators;
    //uint nConiators;

    function CentralAuthority() {
        owner = msg.sender;
    }

    function registerExchange(address newExchange) {
        if (msg.sender == owner)
            exchange = newExchange;
    }

    function registerCertificator(address newCertificator) returns(bool) {
        if(msg.sender == owner){
            allowedCertificator[newCertificator] = true;
            return true;
        } else { return false; }
    }

    /* Registers a new token type */
    //function registerToken(address newOwner, address newExchange, string newName) returns(MetaCoin) {
        //if(msg.sender == owner) {
            //MetaCoin temp = new MetaCoin();
            //tokens.push(temp);
            //return temp;
        //}
    //}

    function issueNewIssuerAtToken(uint TokenNr, address issuer) returns(bool) {
        if(isValidCertificator(msg.sender)) {
            tokens[TokenNr].setIssuer(issuer);
            return true;
        } else { return false; }
        //we ignore the request which token is used
        //we use the first
        
    }

    function isValidCertificator(address certificator) returns(bool){
        return allowedCertificator[certificator];
    }

    function createTestTokenContracts(uint number) returns(bool){
        for(uint count = 0;count < number;count++)
        {
            tokens.push(new MetaCoin());
        }
        return true;
    }
    
    function getPublicAddressFromTokenContract(uint number) returns(address){
        return address(tokens[number]);
    }

    //function isValidToken(address tokenAddress) returns(bool){
        //return tokens[tokenAddress];
    //}

}
