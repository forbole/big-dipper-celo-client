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
                input
                logIndex
                minDeposit
                raw
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
                submittedTime
                approvalPhaseTime
                votingPhaseStartTime
                votingPhaseEndTime
                executionPhaseStartTime
                executionPhaseEndTime
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
            input
            logIndex
            minDeposit
            raw
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
            submittedTime
            approvalPhaseTime
            votingPhaseStartTime
            votingPhaseEndTime
            executionPhaseStartTime
            executionPhaseEndTime
        }
    }
`;
