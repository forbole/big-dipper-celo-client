import { gql } from '@apollo/client';

export const GET_ELECTION = gql`
    query Election {
        election {
            electedValidatorGroups
            electedValidators
            registeredValidatorGroups
            registeredValidators
        }
    }
`;
