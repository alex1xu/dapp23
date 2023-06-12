const Web3 = require("web3");

module.exports = {
  networks: {
    development: {
      provider: () => new Web3.providers.HttpProvider("http://127.0.0.1:7545"),
      host: "localhost",
      port: 7545,
      network_id: "*", // Match any network id
      gas: 5000000
    }
  },
  compilers: {
    solc: {
      settings: {
        optimizer: {
          enabled: true, // Default: false
          runs: 200      // Default: 200
        },
      }
    }
  }
};
