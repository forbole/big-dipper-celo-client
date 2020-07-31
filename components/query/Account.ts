import { gql } from "apollo-boost";

export const GET_ACCOUNTS = gql`
  query Accounts {
    accounts {
      page
    totalCounts
    accounts{
      _id
      address
      balance
    }
    }
  }
`;

export const GET_ACCOUNT_DETAILS = gql`
  query Account($address: String!) {
    account(address: $address) {
      _id
      address
      balance
    }
  }
`;

