import { ethers } from "ethers";
import { abi } from "../constants/index";

export default async function getProceeds(account) {
  const provider = new ethers.providers.WebSocketProvider(
    "wss://eth-sepolia.g.alchemy.com/v2/pDnsHSqJomhXLGvW0BD406tousjSDigY"
  );
  // Request access to the MetaMask account

  console.log("estoy trabajando en sacar los proceeds");
  const contractAddress = "0xaDa9884c1299df503D91D36Ee9CD7fD6EBBACD44";
  const contract = new ethers.Contract(contractAddress, abi, provider);
  console.log("estoy trabajando en sacar los proceeds 2");
  const tx = await contract.getProceeds(account);
  console.log("estoy trabajando en sacar los proceeds 3");
  console.log(
    `esto es los proceeds: ${ethers.utils.formatEther(tx.toString())} ETH`
  );
  return ethers.utils.formatEther(tx.toString());
}
