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
                    score
                    attestationCompleted
                    attestationRequested
                }
                membersAccount {
                    address
                    balance
                    totalBalance {
                        gold
                        lockedGold
                        usd
                        total
                        pending
                    }
                }
                membersUpdated
                name
                nextCommission
                nextCommissionBlock
                slashingMultiplier
                lockedGoldAmount
                votes
                votesAvailable
                electedValidators
                rewards
            }
        }
    }
`;

export const GET_VALIDATOR_GROUP = gql`
    query validatorGroup($valGroupAddress: String!) {
        validatorGroup(valGroupAddress: $valGroupAddress) {
            _id
            address
            affiliates
            commission
            lastSlashed
            members {
                _id
                address
                name
                affiliation
                blsPublicKey
                ecdsaPublicKey
                score
                signerAccount {
                    address
                }
                signer
                attestationCompleted
                attestationRequested
            }
            membersAccount {
                address
                balance
                lockedGold
                totalBalance {
                    gold
                    lockedGold
                    usd
                    total
                    pending
                }
            }
            membersUpdated
            name
            votes
            votesAvailable
            lockedGoldAmount
            nextCommission
            nextCommissionBlock
            slashingMultiplier
            electedValidators
            rewards
        }
    }
`;
