import "@/styles/globals.css";
import { Fragment } from "react";
import { NotificationProvider } from "web3uikit";

//!Como estamos usando Moralis, por ejmplo con la web3uikit. Para incializarlo debemos hacer los siguiente.
import { MoralisProvider } from "react-moralis";

import Header from "@/components/Header";

//!Importamos Appollo provider para poder hacer funcionar el fetch query de apollo y tehGraph
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

//Inicializamos ApolloProvider
//Mira la documentacion para saber que parametros incluir aqui
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://api.studio.thegraph.com/query/45112/nft-marketplace-descentralized/v0.0.1",
});

export default function App({ Component, pageProps }) {
  return (
    <MoralisProvider initializeOnMount={false}>
      <ApolloProvider client={client}>
        <NotificationProvider>
          <Header />
          <Component {...pageProps} />
        </NotificationProvider>
      </ApolloProvider>
    </MoralisProvider>
  );
}
