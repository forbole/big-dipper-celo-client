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
    const page = process.env.SETPAGE ? parseInt(process.env.SETPAGE) + 1 : 1;
    const pageSize = process.env.ROWMEDIUM ? parseInt(process.env.ROWMEDIUM) : 30;
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

    if (data) {
        for (let c = 0; c < data?.proposals?.proposals?.length; c++) {
            const response = data?.proposals?.proposals[c]?.input?.params[4]?.value.includes(
                'gist.github.com'
            )
                ? {}
                : await fetch(
                      // ? data?.proposals?.proposals[c]?.input?.params[4]?.value.replace(
                      //       'github',
                      //       'githubusercontent'
                      //   ) + '/raw'
                      data?.proposals?.proposals[c]?.input?.params[4]?.value
                          .replace('github.com', 'raw.githubusercontent.com')
                          .replace('blob/', '')
                  )
                      .then(function (response) {
                          if (response.ok) {
                              response.text().then((text) => {
                                  getProposalTitle = text.split('\n');
                                  proposalTitle[c] = {
                                      proposalNumber:
                                          data?.proposals?.proposals[c]?.returnValues?.proposalId,
                                      proposalTitle: getProposalTitle[0].replace(/^(.*?):/, ''),
                                      proposalDescription:
                                          data?.proposals?.proposals[c]?.input?.params[4]?.value,
                                      proposalStage: data?.proposals?.proposals[c]?.stage,
                                      proposalStatus: data?.proposals?.proposals[c]?.status,
                                      proposer:
                                          data?.proposals?.proposals[c]?.returnValues?.proposer
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
    }

    return { proposalTitle: proposalTitle };
};
