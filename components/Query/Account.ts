import { gql } from '@apollo/client';

export const GET_ACCOUNTS = gql`
    query Accounts($pageSize: Int, $page: Int, $field: String!) {
        accounts(pageSize: $pageSize, page: $page, sortBy: { field: $field, order: DESC }) {
            page
            totalCounts
            accounts {
                address
                balance
                txCount
            }
        }
    }
`;

export const GET_ACCOUNT_DETAILS = gql`
    query Account($address: String!) {
        account(address: $address) {
            address
            balance
            totalBalance {
                gold
                lockedGold
                usd
                total
                pending
            }
            accountSummary
            isAccount
            isSigner
            lockedGold
            attestation
            groupsVotedFor
            hasActivatablePendingVotes
        }
    }
`;
