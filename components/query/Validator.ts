import { gql } from '@apollo/client';

export const GET_VALIDATOR = gql`
    query Validator($address: String!) {
        validator(address: $address) {
            affiliation
            blsPublicKey
            ecdsaPublicKey
            name
            score
            signer
            validatorGroup {
                address
                commission
            }
        }
    }
`;
