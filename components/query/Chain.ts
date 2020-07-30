import { gql } from "@apollo/client";

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

