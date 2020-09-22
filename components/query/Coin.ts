import { gql } from "@apollo/client";

export const GET_COIN_HISTORY_BY_NUM_OF_DAYS = gql`
  query CoinHistoryByNumOfDays($days: Int!) {
    coinHistoryByNumOfDays(days: $days) {
    prices
    total_volumes
    }
  }
`;


export const GET_COIN_HISTORY_BY_DATES = gql`
  query CoinHistoryByDates($dateFrom: String!, $dateTo: String!) {
    coinHistoryByDates(dateFrom: $dateFrom, dateTo: $dateTo) {
    prices
    total_volumes
    }
  }
`;
