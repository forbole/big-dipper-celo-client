import { gql } from '@apollo/client';

export const GET_VALIDATOR = gql`
    query Validator($address: String, $name: String) {
        validator(address: $address, name: $name) {
            affiliation
            blsPublicKey
            ecdsaPublicKey
            name
            score
            signer
            address
            validatorGroup {
                address
                commission
            }
        }
    }
`;
