import { gql } from "@apollo/client";

export const GET_EPOCH = gql`
  query Epoch{
    epoch{
     _id
    epochNumber
    epochSize
    firstBlockNumberForEpoch
    lastBlockNumberForEpoch
    }
  }
`;


