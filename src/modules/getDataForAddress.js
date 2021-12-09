import axios from "axios";
import Web3 from "web3";
import contractAbi from "./contractAbi.json";
import distributorAbi from "./distributorAbi.json";
import { provider, id, cakeId, currency, contractAddress, distributorAddress } from "./config.json";

const web3 = new Web3(provider);

async function getPrice() {
    let result = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=${currency}`);
    return result.data[id][currency];
}

async function getCakeData() {
    let result = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${cakeId}&vs_currencies=${currency}&include_24hr_change=true`);
    return {
        price: result.data[cakeId][currency],
        priceChange: result.data[cakeId][`${currency}_24h_change`],
    };
}

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
    if(info[2] === 0) {
        return {
            status: "success",
            paidUSDT: info[3] / Math.pow(10, decimals),
            pendingUSDT: info[4] / Math.pow(10, decimals)
        }
    } else {
        return {
            status: "pending",
            paidUSDT: info[3] / Math.pow(10, decimals),
            pendingUSDT: info[4] / Math.pow(10, decimals)
        }
    }
}

async function getAllRewards(address) {
    let contract = new web3.eth.Contract(distributorAbi, distributorAddress);
    let decimals = 18;

    let info = await contract.methods.withdrawnDividendOf(address).call();
    return info / Math.pow(10, decimals);
}

async function getNextPayoutRewards(address) {
    let contract = new web3.eth.Contract(distributorAbi, distributorAddress);
    let decimals = 18;

    let info = await contract.methods.withdrawableDividendOf(address).call();
    return info / Math.pow(10, decimals);
}

async function getTotalDistributed() {
    let contract = new web3.eth.Contract(distributorAbi, distributorAddress);
    let decimals = 18;

    let info = await contract.methods.totalDividendsDistributed().call();
    return info / Math.pow(10, decimals);
}

async function getDataForAddress(address) {
    const addressInfo = await getAccountUSDTInfo(address);
    const price = await getPrice();
    const cakeData = await getCakeData();
    const balance = await getBalance(address);
    const rewards = balance > 0 ? await getAllRewards(address) : null;
    const nextRewards = balance > 0 ? await getNextPayoutRewards(address) : null;
    const totalDistributed = balance > 0 ? await getTotalDistributed() : null;
    
    return {
        addressInfo: addressInfo,
        price: price,
        cakeData: cakeData,
        balance: balance,
        rewards: rewards,
        nextRewards: nextRewards,
        totalDistributed: totalDistributed
    };
}

export default getDataForAddress;