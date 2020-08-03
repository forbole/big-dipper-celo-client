import { gql } from "apollo-boost";


export const GET_VALIDATOR = gql`
    query Validator($address: String!) {
    validator(address: $address){
    affiliation
    blsPublicKey
    ecdsaPublicKey
    name
    score
    validatorGroup{
      address
      commission
    }
    signer{
      isSigner
      isAccount
      attestation
      lockedGold
    }
  }
}
`;