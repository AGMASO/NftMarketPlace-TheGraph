import Head from "next/head";

import NftBox from "@/components/NftBox";
import WithdrawProceeds from "@/components/WithdrawProceeds";
import SellNft from "@/components/SellNft";
//Como podemos enseñar los NFTs listados en nuestro index.js
//Vamos a recopilar los Enventos triggered en una dataBase y de alli, llamaremos a esa data a nuestro Indx.js

import { ethers } from "ethers";

import { useWeb3Contract, useMoralis } from "react-moralis";

//--------------------------------------
//GRAPH
import { useQuery } from "@apollo/client";
import GET_ACTIVE_ITEM from "@/constants/subGraphQueries";

export default function Home() {
  //Inicializamos useNitification de la libreria web3uikit

  const { isWeb3Enabled } = useMoralis();

  //LE damos nombre a data: nfts que es lo que habiamos usado antes como el nombre de props
  const { loading, error, data } = useQuery(GET_ACTIVE_ITEM);
  console.log(data);
  return (
    <>
      <Head>
        <title>Nft Marketplace</title>
        <meta
          name="description"
          content="List your Nfts, sell it or buy more"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="" />
      </Head>

      <main className="flex justify-center">
        <div>
          <div className="">
            <h1 className="py-10 px-4 font-extralight text-5xl text-white text-center">
              Welcome to the real decentralized Nfts Market
            </h1>
            <h2 className="py-10 px-4 font-bold text-2xl text-white text-center">
              Recently Listed NFTS
            </h2>

            <div className="flex flex-wrap">
              {isWeb3Enabled ? (
                loading || !data ? (
                  <div class="fixed top-20 left-0 w-screen h-screen flex justify-center items-center">
                    <div class="border-4 border-t-4 border-gray-200 rounded-full w-16 h-16 animate-spin"></div>
                  </div>
                ) : (
                  data.activeItems.map((nft) => {
                    const { price, nftAddress, tokenId, seller } = nft;
                    return (
                      <NftBox
                        price={ethers.utils.formatEther(price)}
                        nftAddress={nftAddress}
                        tokenId={tokenId}
                        seller={seller}
                        key={`${nftAddress}${tokenId}`}
                      />
                    );
                  })
                )
              ) : (
                <div>Web3 Currently Not Enabled</div>
              )}
            </div>
          </div>
        </div>
      </main>
      <div>
        <div id="sellNft">
          <SellNft />
        </div>
      </div>
      <div>
        <div id="withdrawProceeds">
          <WithdrawProceeds />
        </div>
      </div>
    </>
  );
}
