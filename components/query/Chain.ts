import { gql } from '@apollo/client';

export const GET_CHAIN = gql`
    {
        chain {
            averageBlockTime
            txCount
            latestHeight
            chainId
            tokenPrice {
                usd
                usdMarketCap
            }
            walletCount
            celoTotalSupply
        }
    }
`;

export const GET_TOTAL_SUPPLY = gql`
    query GetTotalSupply {
        chain {
            cUSDTotalSupply
            celoTotalSupply
        }
    }
`;
