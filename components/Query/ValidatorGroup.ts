import { gql } from '@apollo/client';

export const GET_VALIDATOR_GROUPS = gql`
    query validatorGroups($pageSize: Int, $page: Int) {
        validatorGroups(pageSize: $pageSize, page: $page) {
            validatorGroups {
                address
                commission
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
                name
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
            address
            commission
            members {
                address
                name
                affiliation
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
            name
            votes
            votesAvailable
            lockedGoldAmount
            slashingMultiplier
            electedValidators
            rewards
        }
    }
`;
