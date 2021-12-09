import Web3 from "web3";
console.log("window is ", window);
window.ethereum.request({ method: "eth_requestAccounts" });

const web3 = new Web3(window.ethereum);

export default web3;