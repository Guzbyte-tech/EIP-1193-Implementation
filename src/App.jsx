/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import walletImage from "./assets/wallet-address.png";
import BalanceCard from "./components/BalanceCard/BalanceCard";
import useWallet from "./hooks/useWallet";

const App = () => {
  const { account, balance, connectWallet, getBalance, network } = useWallet();
  const [inputAddress, setInputAddress] = useState("");

  console.log(account);

  // Map network IDs to human-readable names
  const networkNames = {
    "0x1": "Ethereum Mainnet",
    "0x3": "Ropsten Testnet",
    "0x4": "Rinkeby Testnet",
    "0x5": "Goerli Testnet",
    "0x2a": "Kovan Testnet",
    "0x106a": "Lisk Sepolia Testnet",
    "0xe708": "Linear mainet",
    "0x46f": "Lisk",
    "0xaa37dc": "Op Sepolia Testnet",
    "0x4268": "Ethereum Holesky",
    "0xaa36a7": "Sepolia",
    "0xe705": "Linear Sepolia",
  };

  const networkName = networkNames[network] || "Unknown Network: " + network;

  // Update the input field with the first connected account whenever the account or network changes
  useEffect(() => {
    if (account) {
      setInputAddress(account);
    }
  }, [account, network]);

  // Fetch balance for input address
  const handleGetBalance = () => {
    if (inputAddress) {
      getBalance(inputAddress);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-xl w-full mx-auto my-20">
      <h2 className="text-xl font-semibold mb-4 text-center">
        EIP1193 Connect Playground
      </h2>
      <p className="text-gray-500 mb-6 text-center">Connect your wallet.</p>
      <div className="mb-4">
        <ul className="space-y-2 mb-4">
          <li>
            {account ? (
              <button
                className="w-full flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg shadow-sm"
                disabled // Disable the button as wallet is already connected
              >
                <span className="flex-1 text-left">
                  Connected to {networkName}
                </span>
                <img src={walletImage} alt="Wallet" className="w-6 h-6" />
              </button>
            ) : (
              <button
                onClick={connectWallet}
                className="w-full flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg shadow-sm"
              >
                <span className="flex-1 text-left">Connect Wallet</span>
                <img src={walletImage} alt="Wallet" className="w-6 h-6" />
              </button>
            )}
          </li>
        </ul>
      </div>
      <p className="text-xs text-gray-400 mt-6 text-center">
        We do not own your private keys and cannot access your funds without
        your confirmation.
      </p>

      <div className="mt-4">
        <label htmlFor="wallet_address" className="text-gray-500 mb-2">
          Wallet Address
        </label>
        <input
          value={inputAddress}
          onChange={(e) => setInputAddress(e.target.value)}
          type="text"
          name="address"
          id="wallet_address"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-3"
          placeholder="Enter address"
        />
        <button
          onClick={handleGetBalance}
          className="mt-3 w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
        >
          Get Balance
        </button>
      </div>

      {/* Display the balance of the account or input address */}
      <BalanceCard balance={balance} />
    </div>
  );
};

export default App;
