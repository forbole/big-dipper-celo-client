import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';

import PriceCard from '../components/PriceCard';
// import DepositList from '../components/proposal/DepositList';
import ProposalList from '../components/proposal/ProposalList';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'center'
        }
    })
);

export default function Proposals(title: string): JSX.Element {
    const classes = useStyles();
    return (
        <Grid container spacing={2} className={classes.root}>
            <Grid item xs={12}>
                <PriceCard />
            </Grid>
            <Grid item xs={12}>
                <ProposalList title={title} />
            </Grid>
            <Grid item xs={12}>
                {/* <DepositList /> */}
            </Grid>
        </Grid>
    );
}

Proposals.getInitialProps = async (ctx: any) => {
    const { query } = ctx;
    const proposalTitle: string[] = [];
    let counter = 0;
    let getProposalTitle;
    for (let c = 10; c >= 0; c--) {
        if (c >= 10) {
            const response = await fetch(
                `https://raw.githubusercontent.com/celo-org/celo-proposals/master/CGPs/00${c}.md`
            )
                .then((response) => response.text())
                .then((text) => {
                    getProposalTitle = text.split('\n');
                    proposalTitle[counter] = getProposalTitle[0].replace('#', ' ');
                    counter++;
                });
        } else {
            const response = await fetch(
                `https://raw.githubusercontent.com/celo-org/celo-proposals/master/CGPs/000${c}.md`
            )
                .then((response) => response.text())
                .then((text) => {
                    getProposalTitle = text.split('\n');
                    proposalTitle[counter] = getProposalTitle[0].replace('#', ' ');
                    counter++;
                });
        }
    }

    return proposalTitle;
};
