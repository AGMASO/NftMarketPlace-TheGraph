import Head from "next/head";
import { Fragment } from "react";
import { useWeb3Contract, useMoralis } from "react-moralis";

//Importamos APOLLO y GRAPHQL para poder interactuar con la api de theGraph y fetch data
import { useQuery, gql } from "@apollo/client";

//Aqui creamos la const Get_actitve_items  llamando a graph con la sintaxis graphQL

const GET_ACTIVE_ITEM = gql`
  {
    activeItems(
      first: 5
      where: { buyer: "0x0000000000000000000000000000000000000000" }
    ) {
      id
      buyer
      seller
      nftAddress
      tokenId
      price
    }
  }
`;

export default function GraphExample() {
  const { isWeb3Enabled } = useMoralis();
  //Inicializamos diferentes parametros incluidos en useQuery() de apollo
  //!Simplemte parse el graphQl objeto que hemos creado y lo fetch directametne.
  const { loading, error, data } = useQuery(GET_ACTIVE_ITEM);
  console.log(data);
  return (
    <div>
      {loading ? (
        <p>Loading data...</p>
      ) : error ? (
        <p>Error loading data</p>
      ) : (
        <Fragment>
          <h1>Active Items</h1>
          <ul>
            {data.activeItems.map((item) => (
              <li key={item.id}>
                {item.id} - {item.nftAddress} - {item.tokenId} - {item.price}
              </li>
            ))}
          </ul>
        </Fragment>
      )}
    </div>
  );
}
