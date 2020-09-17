import { gql } from "@apollo/client";

export const GET_COIN_HISTORY = gql`
  query CoinHistory($date: String!) {
    coinHistory(date: $date) {
    id
    symbol
    name
    localization
    image
    market_data
    community_data
    developer_data
    public_interest_stats
    }
  }
`;


export const GET_COIN_HISTORY_BY_NUM_OF_DAYS = gql`
  query CoinHistoryByNumOfDays($days: Int!) {
    coinHistoryByNumOfDays(days: $days) {
    prices
    market_caps
    total_volumes
    }
  }
`;
