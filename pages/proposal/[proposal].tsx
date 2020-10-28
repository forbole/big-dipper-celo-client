import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import React from 'react';

import PriceCard from '../../components/PriceCard';
import DepositList from '../../components/proposal/DepositList';
import ProposalDetails from '../../components/proposal/ProposalDetails';
import ProposalVotingList from '../../components/proposal/ProposalVotingList';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'center'
        }
    })
);

type proposalProps = { proposalDetails: string };

export default function Proposal({ proposalDetails }: proposalProps): JSX.Element {
    const classes = useStyles();
    const router = useRouter();
    const proposalNumber: string = router.query.proposal as string;
    return (
        <Grid container spacing={2} className={classes.root}>
            <Grid item xs={12}>
                <PriceCard />
            </Grid>
            <Grid item xs={12}>
                <ProposalDetails proposal={proposalNumber} proposalDetails={proposalDetails} />
            </Grid>
            <Grid item xs={12}>
                <ProposalVotingList proposal={proposalNumber} />
            </Grid>
            <Grid item xs={12}>
                <DepositList proposal={proposalNumber} />
            </Grid>
        </Grid>
    );
}

Proposal.getInitialProps = async (ctx: any) => {
    const { query } = ctx;
    const response = await fetch(
        `https://raw.githubusercontent.com/celo-org/celo-proposals/master/CGPs/000${query.proposal}.md`
    );
    const proposalDetails = await response.text();
    return { proposalDetails };
};
