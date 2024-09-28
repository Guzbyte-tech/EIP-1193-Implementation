import { useState, useEffect, useCallback } from "react";

const useWallet = () => {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("");
  const [network, setNetwork] = useState("");

  // Detects if MetaMask is installed and sets the provider
  useEffect(() => {
    if (window.ethereum) {
      setProvider(window.ethereum);
    } else {
      console.error("Please install MetaMask!");
    }
  }, []);

  // Connects to the wallet
  const connectWallet = useCallback(async () => {
    if (provider) {
      try {
        const accounts = await provider.request({
          method: "eth_requestAccounts",
        });
        const chainId = await provider.request({ method: "eth_chainId" });
        setAccount(accounts[0]);
        setNetwork(chainId);
        await getBalance(accounts[0]); // Fetch balance after connecting
      } catch (error) {
        console.error("Failed to connect wallet", error);
      }
    }
  }, [provider]);

  // Fetches balance of the connected account
  const getBalance = useCallback(async (address) => {
    if (provider && address) {
      try {
        const balance = await provider.request({
          method: "eth_getBalance",
          params: [address, "latest"],
        });
        setBalance((Number(balance) / 1e18).toFixed(6));
      } catch (error) {
        console.error("Failed to fetch balance:", error);
      }
    }
  }, [provider]);


  const handleAccountsChanged = useCallback((accounts) => {
    if (accounts.length === 0) {
      console.error("Please connect to MetaMask.");
    } else {
      setAccount(accounts[0]);
      getBalance(accounts[0]);
    }
  }, [getBalance]);


  const handleChainChanged = useCallback((chainId) => {
    setNetwork(chainId);
  }, []);

  // listeners for account and network changes
  useEffect(() => {
    if (provider) {
      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);

      // Cleanup on unmount
      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
        }
      };
    }
  }, [provider, handleAccountsChanged, handleChainChanged]);

  return {
    provider,
    account,
    balance,
    network,
    connectWallet,
    getBalance,
  };
};

export default useWallet;
