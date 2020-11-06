import { gql } from '@apollo/client';

export const GET_PROPOSALS = gql`
    query Proposals($pageSize: Int, $page: Int, $field: String!) {
        proposals(pageSize: $pageSize, page: $page, sortBy: { field: $field, order: DESC }) {
            cursor
            pageSize
            page
            totalCounts
            hasMore
            proposals {
                proposalNumber
                address
                blockHash
                blockNumber
                event
                logIndex
                raw
                removed
                returnValues
                signature
                transactionHash
                transactionIndex
                status
                upvoteList
            }
        }
    }
`;

export const GET_PROPOSAL = gql`
    query Proposal($proposalNumber: Int) {
        proposal(proposalNumber: $proposalNumber) {
            proposalNumber
            address
            blockHash
            blockNumber
            event
            logIndex
            raw
            removed
            returnValues
            signature
            transactionHash
            transactionIndex
            upvoteList
            votes
            totalVotesList
            executionEpoch
            expirationEpoch
            proposalEpoch
            referrendumEpoch
        }
    }
`;
