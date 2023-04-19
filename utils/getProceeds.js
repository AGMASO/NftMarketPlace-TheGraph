import { ethers } from "ethers";
import { abi } from "../constants/index";

export default async function getProceeds(account) {
  const provider = new ethers.providers.WebSocketProvider(
    "wss://eth-goerli.g.alchemy.com/v2/6WDKZRPFR3JfUlvLpczZ491-CvXm-jhc"
  );
  // Request access to the MetaMask account

  console.log("estoy trabajando en sacar los proceeds");
  const contractAddress = "0x1e780ba53a4421FFd8A8871c9B746d62258d8512";
  const contract = new ethers.Contract(contractAddress, abi, provider);
  console.log("estoy trabajando en sacar los proceeds 2");
  const tx = await contract.getProceeds(account);
  console.log("estoy trabajando en sacar los proceeds 3");
  console.log(
    `esto es los proceeds: ${ethers.utils.formatEther(tx.toString())} ETH`
  );
  return ethers.utils.formatEther(tx.toString());
}
