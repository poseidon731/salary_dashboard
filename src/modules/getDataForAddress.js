import Web3 from "web3";
import contractAbi from "./contractAbi.json";
import { provider, contractAddress } from "./config.json";

const web3 = new Web3(provider);

async function getBalance(address) {
  let contract = new web3.eth.Contract(contractAbi, contractAddress);
  let decimals = await contract.methods.decimals().call();

  try {
    let result = await contract.methods.balanceOf(address).call();
    let balance = parseFloat(result) / Math.pow(10, decimals);
    return balance;
  } catch (error) {
    console.log(error);
    return 0;
  }
}

async function getAccountUSDTInfo(address) {
  let contract = new web3.eth.Contract(contractAbi, contractAddress);
  let decimals = 18;
  let info = await contract.methods.getAccountUSDTDividendsInfo(address).call();
  if (info[2] === 0) {
    return {
      status: "success",
      paidUSDT: info[3] / Math.pow(10, decimals),
      pendingUSDT: info[4] / Math.pow(10, decimals),
    };
  } else {
    return {
      status: "pending",
      paidUSDT: info[3] / Math.pow(10, decimals),
      pendingUSDT: info[4] / Math.pow(10, decimals),
    };
  }
}

async function getTotalPaidUSDT() {
  let contract = new web3.eth.Contract(contractAbi, contractAddress);
  let decimals = 18;

  let info = await contract.methods.getTotalUSDTDividendsDistributed().call();
  return info / Math.pow(10, decimals);
}

async function getDataForAddress(address) {
  const accountInfo = await getAccountUSDTInfo(address);
  const balance = await getBalance(address);
  const totalPaidUSDT = balance > 0 ? await getTotalPaidUSDT() : null;

  return {
    accountInfo: accountInfo,
    balance: balance,
    totalPaidUSDT: totalPaidUSDT ? totalPaidUSDT : 0
  };
}

export default getDataForAddress;
