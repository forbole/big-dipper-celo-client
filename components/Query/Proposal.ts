import { gql } from '@apollo/client';

export const GET_PROPOSALS = gql`
    query Proposals($pageSize: Int, $page: Int) {
        proposals(pageSize: $pageSize, page: $page, sortBy: { field: "proposalId", order: DESC }) {
            cursor
            pageSize
            page
            totalCounts
            hasMore
            proposals {
                proposalId
                address
                blockHash
                blockNumber
                event
                executionEpoch
                expirationEpoch
                input
                logIndex
                minDeposit
                proposalEpoch
                raw
                referrendumEpoch
                removed
                returnValues
                signature
                stage
                status
                totalVotesList
                transactionHash
                transactionIndex
                upvoteList
                upvotes
                votes
            }
        }
    }
`;

export const GET_PROPOSAL = gql`
    query Proposal($proposalNumber: Int) {
        proposal(proposalNumber: $proposalNumber) {
            proposalId
            address
            blockHash
            blockNumber
            event
            executionEpoch
            expirationEpoch
            input
            logIndex
            minDeposit
            proposalEpoch
            raw
            referrendumEpoch
            removed
            returnValues
            signature
            stage
            status
            totalVotesList
            transactionHash
            transactionIndex
            upvoteList
            upvotes
            votes
        }
    }
`;
