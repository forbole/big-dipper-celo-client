import { gql } from '@apollo/client';

export const GET_VALIDATOR_GROUPS = gql`
    query validatorGroups($pageSize: Int, $page: Int) {
        validatorGroups(pageSize: $pageSize, page: $page) {
            validatorGroups {
                address
                affiliates
                commission
                lastSlashed
                members {
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

export const GET_VALIDATOR_GROUP = gql`
    query validatorGroup($address: String, $name: String) {
        validatorGroup(address: $address, name: $name) {
            name
            address
            validatorGroups {
                address
                affiliates
                commission
                lastSlashed
                members {
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
