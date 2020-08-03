import { gql } from "apollo-boost";


export const GET_VALIDATOR = gql`
    query Transaction($address: String!) {
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
 