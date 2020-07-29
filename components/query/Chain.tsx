import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";


export const GET_CHAIN = gql`
  {
    chain {
      _id
      averageBlockTime
      txCount
      latestHeight
      chainId
      tokenPrice {
        usd
        usdMarketCap
      }
      walletCount
    }
  }
`;

