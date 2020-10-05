import { gql } from "@apollo/client";


export const GET_VALIDATOR_GROUPS = gql`
    query validatorGroups($pageSize: Int, $page: Int){
    validatorGroups(pageSize: $pageSize page: $page){
    validatorGroups{
        _id
        address
        affiliates
        commission
        lastSlashed
        members{
            address
            name
        }
        membersUpdated
        name
        nextCommission
        nextCommissionBlock
        slashingMultiplier
        lockedGoldAmount
        votes
        votesAvailable
  
	}
  }
}
`;
