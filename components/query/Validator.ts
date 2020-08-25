import { gql } from "@apollo/client";


export const GET_VALIDATOR = gql`
    query Validator($address: String!) {
    validator(address: $address){
    affiliation
    blsPublicKey
    ecdsaPublicKey
    name
    score
    signer
    validatorGroup{
      address
      commission
    }
  
  }
}
`;


export const GET_VALIDATOR_GROUP = gql`
query validatorsGroup($address: String!){
  validatorGroup(address: $address){
    _id
    address
    affiliates
    commission
    lastSlashed
    members{
      _id
      address
      name
      affiliation
      blsPublicKey
      ecdsaPublicKey
      score
      signerAccount{
        address
      }
      signer
    }
    membersUpdated
    name
    nextCommission
    nextCommissionBlock
    slashingMultiplier
  }
}

`;