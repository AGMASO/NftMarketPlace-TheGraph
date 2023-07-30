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
            <div className="">
              {isWeb3Enabled && data ? (
                <h2 className=" text-5xl text-white text-center font-bold">
                  Listed NFTs
                </h2>
              ) : (
                ""
              )}
            </div>

            <div className="flex flex-wrap justify-center">
              {isWeb3Enabled ? (
                loading || !data ? (
                  <div role="status" class="space-y-2.5 animate-pulse max-w-lg">
                    <div class="flex items-center w-full space-x-2">
                      <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
                      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    </div>
                    <div class="flex items-center w-full space-x-2 max-w-[480px]">
                      <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                    </div>
                    <div class="flex items-center w-full space-x-2 max-w-[400px]">
                      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                      <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    </div>
                    <div class="flex items-center w-full space-x-2 max-w-[480px]">
                      <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                    </div>
                    <div class="flex items-center w-full space-x-2 max-w-[440px]">
                      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-32"></div>
                      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                      <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                    </div>
                    <div class="flex items-center w-full space-x-2 max-w-[360px]">
                      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                      <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    </div>
                    <span class="sr-only">Loading...</span>
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
                <div className="p-3 flex justify-center align-middle border-2 rounded-lg animate-pulse">
                  <div className="text-center text-[#f2f6ff] text-xl">
                    Web3 Currently Not Enabled
                  </div>
                </div>
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
