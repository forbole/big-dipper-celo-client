import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

import { client } from '../_app';
import PriceCard from '../../components/PriceCard/PriceCard';
import DepositList from '../../components/Proposal/DepositList';
import ProposalDetails from '../../components/Proposal/ProposalDetails';
import ProposalVotingList from '../../components/Proposal/ProposalVotingList';
import { GET_PROPOSAL } from '../../components/Query/Proposal';

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
    executionEpoch: number;
    referrendumEpoch: number;
    expirationEpoch: number;
    upvoteList: any[];
};

export default function Proposal({
    proposalId,
    proposalTitle,
    proposalDescriptionURL,
    proposalDescription,
    proposalStage,
    proposalStatus,
    proposer,
    deposit,
    timestamp,
    executionEpoch,
    referrendumEpoch,
    expirationEpoch,
    upvoteList
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
                    proposalDescriptionURL={proposalDescriptionURL}
                    proposalDescription={proposalDescription}
                    proposalStage={proposalStage}
                    proposalStatus={proposalStatus}
                    proposer={proposer}
                    deposit={deposit}
                    timestamp={timestamp}
                    executionEpoch={executionEpoch}
                    referrendumEpoch={referrendumEpoch}
                    expirationEpoch={expirationEpoch}
                    upvoteList={upvoteList}
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
    const proposalNumber = parseInt(context?.query?.proposal);

    const { data, error, loading } = await client.query({
        query: GET_PROPOSAL,
        variables: proposalNumber
    });

    const proposal = await fetch(
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
    const proposalDescriptionURL = data?.proposal?.input?.params[4]?.value;
    const proposalDescription = proposal;
    const proposalStage = data?.proposal?.stage;
    const proposalStatus = data?.proposal?.status;
    const proposer = data?.proposal?.returnValues?.proposer;
    const deposit = data?.proposal?.returnValues?.deposit;
    const timestamp = data?.proposal?.returnValues?.timestamp;
    const executionEpoch = data?.proposal?.executionEpoch;
    const referrendumEpoch = data?.proposal?.referrendumEpoch;
    const expirationEpoch = data?.proposal?.expirationEpoch;
    const upvoteList = data?.proposal?.upvoteList;

    return {
        props: {
            proposalId,
            proposalTitle,
            proposalDescriptionURL,
            proposalDescription,
            proposalStage,
            proposalStatus,
            proposer,
            deposit,
            timestamp,
            executionEpoch,
            referrendumEpoch,
            expirationEpoch,
            upvoteList
        }
    };
};
