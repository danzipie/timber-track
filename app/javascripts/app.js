
// Import libraries.
import { default as Web3} from 'web3'
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import metacoin_artifacts from '../../build/contracts/MetaCoin.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.
var MetaCoin = contract(metacoin_artifacts);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;
var coins = []; // there are 9 coins
var coinNames = ['Pine', 'Spruce', 'Birch', 'Oak', 'Sawn timber', 'Chips', 'Sawdust', 'Furniture', 'Wood pellets'];
var fake_address = 0x0;

window.App = {
  start: function() {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    MetaCoin.setProvider(web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];

      // hard coded addresses of the Tokens
      var hc = ["0x94591da02f4811dc5172d3167b403bf457ceae39",
        "0x55cca67321b9bf9d47973b714e0b3c94940fbf2b",
        "0x55cca67321b9bf9d47973b714e0b3c94940fbf2b",
        "0x55cca67321b9bf9d47973b714e0b3c94940fbf2b",
        "0x55cca67321b9bf9d47973b714e0b3c94940fbf2b",
        "0x55cca67321b9bf9d47973b714e0b3c94940fbf2b",
        "0x55cca67321b9bf9d47973b714e0b3c94940fbf2b",
        "0x55cca67321b9bf9d47973b714e0b3c94940fbf2b",
        "0x55cca67321b9bf9d47973b714e0b3c94940fbf2b",]

      for (var u=0; u<9; u++) {
        coins[u] = MetaCoin.at(hc[u]);
      }

      self.refreshBalance();

    });
  },

  setStatus: function(message) {
    var status = document.getElementById("status");
    status.innerHTML = message;
  },

  refreshBalance: function() {
    var self = this;
    var eBs = ["balance0", "balance1", "balance2","balance3","balance4","balance5","balance6","balance7","balance8"];

    for (var u=0; u<9; u++) {

      var eBalance = eBs[u];

      (function(wp) { // wrapper
        coins[u].getBalance.call(account, {from: account}).then(function (value) {

          var balance_element = document.getElementById(wp);
          balance_element.innerHTML = value.valueOf();

        }).catch(function (e) {
          console.log(e);
          self.setStatus("Error getting balance; see log.");
        });
      })(eBalance);

    }

  },

  sendCoin: function() {
    var self = this;

    var amount = parseInt(document.getElementById("amount").value);
    var receiver = document.getElementById("receiver").value;
    var type = document.getElementById("type").value;

    var meta;
    MetaCoin.deployed().then(function(instance) {
        meta = instance;
        return coins[type].sendCoin(fake_address, amount, {from: account});
    }).then(function() {
        self.setStatus("Transaction complete!");
        self.refreshBalance();
    }).catch(function(e) {
        console.log(e);
        self.setStatus("Error sending coin; see log.");
    });

  },

  createCoin: function() {
      var self = this;

      var amount = parseInt(document.getElementById("amount_to_create").value);
      var type = document.getElementById("token_type").value;
      console.log(account + " is creating "+ amount +" coins of type " + type)
      MetaCoin.deployed().then(function(instance) {
          return coins[type].modifyToken(amount, {from: account});
      }).then(function() {
          self.setStatus("Transaction complete!");

          self.refreshBalance();
      }).catch(function(e) {
          console.log(e);
          self.setStatus("Error sending coin; see log.");
      });

  },

  transformCoin: function() {
      var self = this;

      var amount = parseInt(document.getElementById("amountToTransform").value);
      var fromType = document.getElementById("fromType").value;
      var toType = document.getElementById("toType").value;

      MetaCoin.deployed().then(function(instance) {
          return coins[fromType].modifyToken(-amount, {from: account});
      }).then(function() {
          self.setStatus("Transaction complete!");
          self.refreshBalance();
          return coins[toType].modifyToken(amount, {from: account});
      }).catch(function(e) {
          console.log(e);
          self.setStatus("Error sending coin; see log.");
      });

  }

};

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  App.start();
});
