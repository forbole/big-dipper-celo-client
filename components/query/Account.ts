import { gql } from "@apollo/client";

export const GET_ACCOUNTS = gql`
  query Accounts($pageSize: Int, $page: Int) {
    accounts(pageSize: $pageSize, page: $page) {
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

