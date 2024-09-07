import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }
  }

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  }

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts[0]);

    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  }

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  }

  const getBalance = async () => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  }

  const deposit = async () => {
    if (atm) {
      let tx = await atm.deposit(101);
      await tx.wait();
      getBalance();
    }
  }

  const withdraw = async () => {
    if (atm) {
      let tx = await atm.withdraw(10);
      await tx.wait();
      getBalance();
    }
  }

  const Bonus = async () => {
    if (atm) {
      let tx = await atm.bonus(50);
      await tx.wait();
      getBalance();
    }
  }


  useEffect(() => { getWallet(); }, []);

  useEffect(() => {
    if (ethWallet && account) {
      getATMContract();
    }
  }, [ethWallet, account]);

  useEffect(() => {
    if (atm && balance === undefined) {
      getBalance();
    }
  }, [atm, balance]);

  return (
    <main className="container">
      <header>
        <h1>Welocome To YOur Account!!</h1>
      </header>
      {!ethWallet && <p>Please install Metamask in order to use this ATM.</p>}
      {ethWallet && !account && (
        <button onClick={connectAccount}>Please connect your Metamask wallet</button>
      )}
      {ethWallet && account && (
        <div>
          <p><b>Your Account: </b>{account}</p>
          <p><b>Your Balance: </b>{balance}</p>
          <p><b>Minimum Increment of 100 $</b></p>
          <button onClick={deposit}>Increment Money</button>
          <p><b>Take your money</b></p>
          <button onClick={withdraw}>Decreament Money</button>
          <p><b>Get Your Bonus!!😍</b></p>
          <button onClick={Bonus}>Bonus Money</button>
        </div>
      )}
      <style jsx>{`
        .container {
          text-align: center;
          color: black;
          border-radius: 40%;
          background: url("https://asapkerala.gov.in/wp-content/uploads/2021/10/Diploma-in-Banking-Finance.jpg")
            no-repeat bottom center;
        }
      `}</style>
    </main>
  );
}
