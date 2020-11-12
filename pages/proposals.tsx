import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { GetStaticProps } from 'next';
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

export default function Proposals(props: { proposalTitle: string }): JSX.Element {
    const classes = useStyles();
    return (
        <Grid container spacing={2} className={classes.root}>
            <Grid item xs={12}>
                <PriceCard />
            </Grid>
            <Grid item xs={12}>
                <ProposalList title={props.proposalTitle} />
            </Grid>
            <Grid item xs={12}>
                {/* <DepositList /> */}
            </Grid>
        </Grid>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const proposalTitle: string[] = [];
    let counter = 0;
    let getProposalTitle;
    //Set max number of proposals as currently we can't obtain it from the rpc
    const PROPOSAL_MAX_NUMBER = 100;

    for (let c = PROPOSAL_MAX_NUMBER; c >= 0; c--) {
        if (c >= 10) {
            const response = await fetch(
                `https://raw.githubusercontent.com/celo-org/celo-proposals/master/CGPs/00${c}.md`
            )
                .then(function (response) {
                    if (response.ok) {
                        response.text().then((text) => {
                            getProposalTitle = text.split('\n');
                            proposalTitle[counter] = getProposalTitle[0].replace('#', ' ');
                            counter++;
                        });
                    } else {
                        return;
                    }
                })
                .catch(function (err) {
                    console.log(`Error when getting proposal no. ${c} title` + err);
                });
        } else {
            const response = await fetch(
                `https://raw.githubusercontent.com/celo-org/celo-proposals/master/CGPs/000${c}.md`
            )
                .then(function (response) {
                    if (response.ok) {
                        response.text().then((text) => {
                            getProposalTitle = text.split('\n');
                            proposalTitle[counter] = getProposalTitle[0].replace('#', ' ');
                            counter++;
                        });
                    } else {
                        return;
                    }
                })
                .catch(function (err) {
                    console.log(`Error when getting proposal no. ${c} title` + err);
                });
        }
    }
    return {
        props: {
            proposalTitle: proposalTitle
        }
    };
};
