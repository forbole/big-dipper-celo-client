import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";


export const GET_TX = gql`
  {
    transactions {
      transactions {
        from {
          _id
          address
          balance
        }
        to{
          address
          ... on ToWalletAccount {
            account {
              balance
            }
          }
          ... on ToWalletContract {
            contract {
              name
              ABI
            }        
          }
        }
        type
        decodedInput
        value
        hash
        timestamp
      }
    }
  }
`;

export const GET_TX_DETAILS = gql`
  query Transaction($hash: String!) {
    transaction(hash: $hash) {
      value
      blockNumber
      nonce
      feeCurrency
      gatewayFeeRecipient
      gatewayFee
      gas
      hash
      input
      timestamp
      gas
      from {
        address
      }
      to {
        address
      }
    }
  }
`;
