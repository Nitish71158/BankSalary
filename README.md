# Account Management
This is Solidity and JavaScript program make to demonstrate the three function that is increment decrement and Bonus . The purpose of this program is to make  function in frontend wich have some funcionality.

## Description
In this program , we make three function in solidity name as deposite ,withdraw and Bonus wich have functionality to increase and decrese of current amount and show in frontened by using javaScript and react,
In deposite first we check wether we have increment money more or equal to 100 if true then amount will increment otherwise show error, And in Withdraw we decrease the amount by 10 in current amount and in bonus
function we increase the amount by 50. and throw javascript we connect the solidity code into frontened. This is simple increment and decreament of amount in current balanance.
## Getting Started

### Executing Programe
* To run this code you have to make hardhat enviroment for that fisrt make three terminal and in first type npm i.
* In second terminal type npx hardhat node.
* In third terminal type npx hardhat run --network localhost scripts/deploy.js
* And at last in first terminal type npm run dev for run your front-end.
#### java code 
```javascript
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

  const Increment = async () => {
    if (atm) {
      let tx = await atm.deposit(101);
      await tx.wait();
      getBalance();
    }
  }

  const Decreament = async () => {
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
          <button onClick={Increment}>Increment Money</button>
          <p><b>Take your money</b></p>
          <button onClick={Decreament}>Decreament Money</button>
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
```

#### Solidity code
```javascript
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

//import "hardhat/console.sol";

contract Assessment {
    address payable public owner;
    uint256 public balance;

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);
    event Bonus(uint256 amount);

    constructor(uint initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
    }

    function getBalance() public view returns(uint256){
        return balance;
    }

    function deposit(uint256 _amount) public payable {
        uint _previousBalance = balance;

        // make sure this is the owner
        require(msg.sender == owner, "You are not the owner of this account");

        // perform transaction
        if(_amount<100){
            revert("Amount is Too Low");
        }else{
            balance+=_amount;
        }

        // assert transaction completed successfully
        assert(balance == _previousBalance + _amount);

        // emit the event
        emit Deposit(_amount);
    }

    // custom error
    error InsufficientBalance(uint256 balance, uint256 withdrawAmount);

    function withdraw(uint256 _withdrawAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        uint _previousBalance = balance;
        if (balance < _withdrawAmount) {
            revert InsufficientBalance({
                balance: balance,
                withdrawAmount: _withdrawAmount
            });
        }

        // withdraw the given amount
        balance -= _withdrawAmount;

        // assert the balance is correct
        assert(balance == (_previousBalance - _withdrawAmount));

        // emit the event
        emit Withdraw(_withdrawAmount);
    }

    function bonus(uint256 _bonusAmount) public {
    require(msg.sender == owner, "You are not the owner of this account");

    uint _previousBalance = balance;

    balance += _bonusAmount;

    // assert the balance is correct
    assert(balance == (_previousBalance + _bonusAmount));

    // emit the event
    emit Bonus(_bonusAmount);
}
}
```

* After run click on http://localhost:3000 to open front-end and connect with your metamask wallet.
* Then for increment click on increment buttonn and for decrement click on decrement and for Bonus amount click on bonus button.
  
## HELP
* Make sure that you are connect with your right account in metamask .
* Clear your data from setting of metamask if your transection failed.
  
## Author
Nitish Kumar Singh
[@Nitish71158](https://github.com/)
