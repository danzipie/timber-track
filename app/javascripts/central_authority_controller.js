/* this file is run by the central authority.
 * it creates the central authority and the 9 tokens on the blockchain
 */

// Require the contract
var jsonCA = require("../../build/contracts/CentralAuthority.json");
var jsonToken = require("../../build/contracts/MetaCoin.json");
// Use also truffle-contract package
var contract = require("truffle-contract");
// Set up Web3
var Web3 = require('web3');
web3 = new Web3();

var CentralAuthority = contract(jsonCA);
var Token = contract(jsonToken);

var provider = new web3.providers.HttpProvider('http://localhost:8545');

web3.setProvider(provider);
CentralAuthority.setProvider(provider);
Token.setProvider(provider);

// Interact with the contract
var accounts = web3.eth.accounts;   // the list of accounts

CentralAuthority.deployed().then(function (authorityContract) {

    var contract_address = authorityContract.address;
    var controller_address = accounts[0];
    var forest_manager = accounts[1];
    console.log("Central Authority deployed at address " + contract_address);
    console.log("Authority account " + accounts[0])
    var fake_address = accounts[0];
    var coinNames = ['Pine', 'Spruce', 'Birch', 'Oak', 'Sawn timber', 'Chips', 'Sawdust', 'Furniture', 'Wood pellets'];

    // now we have to create 9 tokens
    console.log("Tokens are deployed at addresses:");
    for (var c=0; c<9; c++) {
        Token.new("name",
            {from: controller_address,
                gas: 4712388,
                gasPrice: 100000000000}).then(function(instance){
                console.log(instance.address)
        })

    }

})
