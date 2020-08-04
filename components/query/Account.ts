import { gql } from "@apollo/client";

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
      address
      balance
      totalBalance{
          gold
          lockedGold
          usd
          total
          pending
      }
      accountSummary
      isAccount
      isSigner
      lockedGold
      attestation
    }
  }
`;

