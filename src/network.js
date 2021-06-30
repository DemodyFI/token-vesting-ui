import Web3 from "web3";
import Onboard from "bnc-onboard";

const rpcUrl = "https://rinkeby.infura.io/v3/8b8d0c60bfab43bc8725df20fc660d15";

let web3;

const onboard = Onboard({
  dappId: "052b3fe9-87d5-4614-b2e9-6dd81115979a", // [String] The API key created by step one above
  networkId: 4, // [Integer] The Ethereum network ID your Dapp uses.
  subscriptions: {
    wallet: (wallet) => {
      web3 = new Web3(wallet.provider);
    },
  },
  darkMode: true,
  walletSelect: {
    wallets: [
      { walletName: "metamask" },
      {
        walletName: "trezor",
        appUrl: "https://reactdemo.blocknative.com",
        email: "aaron@blocknative.com",
        rpcUrl,
      },
      { walletName: "coinbase" },
      {
        walletName: "ledger",
        rpcUrl,
      },
      {
        walletName: "walletConnect",
        infuraKey: "8b8d0c60bfab43bc8725df20fc660d15",
        // rpc: {
        //   [networkId]: rpcUrl,
        // },
      },
      { walletName: "trust", rpcUrl },
    ],
  },
});

const Network = {
  async web3() {
    if (!web3) {
      return new Web3(new Web3.providers.HttpProvider(rpcUrl));
    } else {
      return web3;
    }
  },

  async eth() {
    const web3 = await Network.web3();
    return web3.eth;
  },

  async provider() {
    const web3 = await Network.web3();
    return web3.currentProvider;
  },

  async connectToWallet() {
    try {
      await onboard.walletSelect();
      await onboard.walletCheck();
      return;
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert("Cannot connect to wallet");
      return;
    }
  },

  getAccounts() {
    return new Promise((resolve, reject) => {
      Network.eth().then((eth) =>
        eth.getAccounts(Network._web3Callback(resolve, reject))
      );
    });
  },

  _web3Callback(resolve, reject) {
    return (error, value) => {
      if (error) reject(error);
      else resolve(value);
    };
  },

  log(msg) {},
};

export default Network;
