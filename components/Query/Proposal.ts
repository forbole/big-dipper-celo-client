import { gql } from '@apollo/client';

export const GET_PROPOSALS = gql`
    query Proposals($pageSize: Int, $page: Int) {
        proposals(pageSize: $pageSize, page: $page, sortBy: { field: "proposalId", order: DESC }) {
            pageSize
            page
            totalCounts
            proposals {
                proposalId
                address
                blockHash
                blockNumber
                event
                input
                minDeposit
                removed
                returnValues
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
            minDeposit
            removed
            returnValues
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
