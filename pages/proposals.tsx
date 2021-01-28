import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';

import PriceCard from '../components/PriceCard/PriceCard';
import ProposalList from '../components/Proposal/ProposalList';
import { GET_PROPOSALS } from '../components/Query/Proposal';
import { client } from './_app';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'center'
        }
    })
);

export default function Proposals(proposalTitle: string[]): JSX.Element {
    const classes = useStyles();
    return (
        <Grid container spacing={2} className={classes.root}>
            <Grid item xs={12}>
                <PriceCard />
            </Grid>
            <Grid item xs={12}>
                <ProposalList title={proposalTitle} />
            </Grid>
        </Grid>
    );
}

Proposals.getInitialProps = async () => {
    const page = parseInt(process.env.SET_PAGE as string) + 1;
    const pageSize = parseInt(process.env.ROW_MEDIUM as string);
    const field = 'proposalId';

    const proposalTitle: {
        proposalTitle: string;
        proposalNumber: number;
        proposalDescription: string;
        proposalStage: string;
        proposalStatus: string;
        proposer: string;
    }[] = [];
    let getProposalTitle;

    const { data, error, loading } = await client.query({
        query: GET_PROPOSALS,
        variables: { pageSize, page, field }
    });

    for (let c = 0; c < data?.proposals?.proposals?.length; c++) {
        const response = await fetch(
            data?.proposals?.proposals[c]?.input?.params[4]?.value
                .replace('github.com', 'raw.githubusercontent.com')
                .replace('blob/', '')
        )
            .then(function (response) {
                if (response.ok) {
                    response.text().then((text) => {
                        getProposalTitle = text.split('\n');
                        proposalTitle[c] = {
                            proposalNumber: data?.proposals?.proposals[c]?.proposalId,
                            proposalTitle: getProposalTitle[0].replace(/^(.*?):/, ''),
                            proposalDescription:
                                data?.proposals?.proposals[c]?.input?.params[4]?.value,
                            proposalStage: data?.proposals?.proposals[c]?.stage,
                            proposalStatus: data?.proposals?.proposals[c]?.status,
                            proposer: data?.proposals?.proposals[c]?.returnValues?.proposer
                        };
                    });
                } else {
                    return;
                }
            })
            .catch(function (err) {
                return console.log(`Error when getting proposal no. ${c} title` + err);
            });
    }

    return { proposalTitle: proposalTitle };
};
