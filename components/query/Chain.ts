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


export const GET_TOTAL_SUPPLY = gql`
  query GetTotalSupply
    {
      chain {
        cUSDTotalSupply
        celoTotalSupply
      }
    }
  
`;
