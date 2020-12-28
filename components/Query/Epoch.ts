import { gql } from '@apollo/client';

export const GET_EPOCH = gql`
    query Epoch {
        epoch {
            epochNumber
            epochSize
            firstBlockNumberForEpoch
            lastBlockNumberForEpoch
        }
    }
`;
