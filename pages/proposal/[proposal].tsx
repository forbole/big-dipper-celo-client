import Grid from '@material-ui/core/Grid';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { GraphQLClient } from 'graphql-request';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

import PriceCard from '../../components/PriceCard/PriceCard';
import DepositList from '../../components/Proposal/DepositList';
import ProposalDetails from '../../components/Proposal/ProposalDetails';
import ProposalVotingList from '../../components/Proposal/ProposalVotingList';
import { GET_PROPOSAL, GET_PROPOSALS } from '../../components/Query/Proposal';

const graphQlClient = new GraphQLClient('https://server.celo.bigdipper.live/graphql');

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'center'
        }
    })
);

type ProposalProps = {
    proposalTitle: string;
    proposalId: number;
    proposalDescriptionURL: string;
    proposalDescription: string;
    proposalStage: string;
    proposalStatus: string;
    proposer: string;
    deposit: string;
    timestamp: string;
    submittedTime: number;
    approvalPhaseTime: number;
    votingPhaseStartTime: number;
    votingPhaseEndTime: number;
    executionPhaseStartTime: number;
    executionPhaseEndTime: number;
    upvoteList: any[];
    totalNumberOfProposals: number;
};

export default function Proposal({
    proposalId,
    proposalTitle,
    proposalDescription,
    proposalStatus,
    proposer,
    deposit,
    submittedTime,
    approvalPhaseTime,
    votingPhaseStartTime,
    votingPhaseEndTime,
    executionPhaseStartTime,
    executionPhaseEndTime,
    upvoteList,
    totalNumberOfProposals
}: ProposalProps): JSX.Element {
    const classes = useStyles();
    const router = useRouter();
    const proposalNumber: string = router.query.proposal as string;
    return (
        <Grid container spacing={2} className={classes.root}>
            <Grid item xs={12}>
                <PriceCard />
            </Grid>
            <Grid item xs={12}>
                <ProposalDetails
                    proposalId={proposalId}
                    proposalTitle={proposalTitle}
                    proposalDescription={proposalDescription}
                    proposalStatus={proposalStatus}
                    proposer={proposer}
                    deposit={deposit}
                    submittedTime={submittedTime}
                    approvalPhaseTime={approvalPhaseTime}
                    votingPhaseStartTime={votingPhaseStartTime}
                    votingPhaseEndTime={votingPhaseEndTime}
                    executionPhaseStartTime={executionPhaseStartTime}
                    executionPhaseEndTime={executionPhaseEndTime}
                    upvoteList={upvoteList}
                    totalNumberOfProposals={totalNumberOfProposals}
                />
            </Grid>
            <Grid item xs={12}>
                <ProposalVotingList proposal={proposalNumber} />
            </Grid>
            <Grid item xs={12}>
                <DepositList proposal={proposalId} />
            </Grid>
        </Grid>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const proposalNumber: number = parseInt(context?.query?.proposal as string);
    const page = 1;
    const pageSize = process.env.ROWMEDIUM ? parseInt(process.env.ROWMEDIUM) : 30;
    const data = await graphQlClient.request(GET_PROPOSAL, {
        proposalNumber
    });

    const total = await graphQlClient.request(GET_PROPOSALS, {
        variables: { pageSize, page }
    });

    const proposal: string | any = await fetch(
        (data?.proposal?.input?.params[4]?.value)
            .replace('github.com', 'raw.githubusercontent.com')
            .replace('blob/', '')
    )
        .then(function (response) {
            if (response.ok) {
                return response.text();
            }
        })
        .catch(function (err) {
            return console.log(`Error when getting proposal no. ${proposalNumber} title` + err);
        });

    const title = proposal?.split('\n');
    const proposalTitle = title[0]?.replace(/^(.*?):/, '');
    const proposalId = data?.proposal?.proposalId;
    const proposalDescription = proposal;
    const proposalStage = data?.proposal?.stage;
    const proposalStatus = data?.proposal?.status;
    const proposer = data?.proposal?.returnValues?.proposer;
    const deposit = data?.proposal?.returnValues?.deposit;
    const submittedTime = data?.proposal?.submittedTime;
    const approvalPhaseTime = data?.proposal?.approvalPhaseTime;
    const votingPhaseStartTime = data?.proposal?.votingPhaseStartTime;
    const votingPhaseEndTime = data?.proposal?.votingPhaseEndTime;
    const executionPhaseStartTime = data?.proposal?.executionPhaseStartTime;
    const executionPhaseEndTime = data?.proposal?.executionPhaseEndTime;
    const upvoteList = data?.proposal?.upvoteList;
    const totalNumberOfProposals = total?.proposals?.totalCounts + 1; //Add one to substitute for missing proposal 6

    return {
        props: {
            proposalId,
            proposalTitle,
            proposalDescription,
            proposalStage,
            proposalStatus,
            proposer,
            deposit,
            submittedTime,
            approvalPhaseTime,
            votingPhaseStartTime,
            votingPhaseEndTime,
            executionPhaseStartTime,
            executionPhaseEndTime,
            upvoteList,
            totalNumberOfProposals
        }
    };
};
