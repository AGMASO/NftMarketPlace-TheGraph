import { ethers } from "ethers";
import { abi } from "../constants/index";

export default async function buyItem(nftAddress, tokenId, price) {
  /*const provider = new ethers.providers.WebSocketProvider(
    "wss://eth-sepolia.g.alchemy.com/v2/pDnsHSqJomhXLGvW0BD406tousjSDigY"
  );*/
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  // Request access to the MetaMask account
  await window.ethereum.enable();
  // Get the signer's address
  const signerAddress = (await provider.listAccounts())[0];
  console.log(signerAddress);

  // Create an instance of the signer using the provider and signer's address
  const signer = provider.getSigner(signerAddress);
  console.log(signer);

  console.log("estoy trabajando");
  const contractAddress = "0x1e780ba53a4421FFd8A8871c9B746d62258d8512";
  // Estimate the gas required for the transaction

  const contract = new ethers.Contract(contractAddress, abi, signer);
  console.log("estoy trabajando 2");

  const tx = await contract.buyItem(nftAddress, tokenId, {
    value: ethers.utils.parseEther(price.toString()),
  });
  console.log("estoy trabajando 3");

  const receipt = await tx.wait();
  console.log("Nft bought by you", receipt);
}
