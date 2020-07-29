import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";


export const GET_ACCOUNT_DETAILS = gql`
  query Account($address: String!) {
    account(address: $address) {
      _id
      address
      balance
    }
  }
`;

