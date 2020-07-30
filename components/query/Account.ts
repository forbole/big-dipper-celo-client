import { gql } from "apollo-boost";

export const GET_ACCOUNT_DETAILS = gql`
  query Account($address: String!) {
    account(address: $address) {
      _id
      address
      balance
    }
  }
`;

