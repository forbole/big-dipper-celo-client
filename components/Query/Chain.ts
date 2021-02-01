import { gql } from '@apollo/client';

export const GET_CHAIN = gql`
    query chain {
        chain {
            averageBlockTime
            txCount
            latestHeight
            chainId
            tokenPrice {
                usd
                usdMarketCap
            }
            celoTotalSupply
            epochNumber
            epochSize
            cUSDTotalSupply
            firstBlockNumberForEpoch
            lastBlockNumberForEpoch
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
