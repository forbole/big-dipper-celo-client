import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles } from '@material-ui/core/styles';
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

type proposalProps = {
    proposalDetails: {
        proposalTitle: string;
        proposalNumber: number;
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
};

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
                <ProposalDetails proposalDetails={proposalDetails} />
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
    const proposalNumber = parseInt(query.proposal);

    const proposalDetails: {
        proposalTitle: string;
        proposalNumber: number;
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
    }[] = [];
    let getProposalTitle;

    const { data, error, loading } = await client.query({
        query: GET_PROPOSAL,
        variables: { proposalNumber }
    });

    if (data) {
        const response = data?.proposal?.input?.params[4]?.value.includes('gist.github.com')
            ? {}
            : await fetch(
                  (data?.proposal?.input?.params[4]?.value)
                      .replace('github.com', 'raw.githubusercontent.com')
                      .replace('blob/', '')
              )
                  .then(function (response) {
                      if (response.ok) {
                          response.text().then((text) => {
                              getProposalTitle = text.split('\n');
                              console.log(getProposalTitle);
                              proposalDetails[0] = {
                                  proposalNumber: data?.proposal?.returnValues?.proposalId,
                                  proposalTitle: getProposalTitle[0]?.replace(/^(.*?):/, ''),
                                  proposalDescription: data?.proposal?.input?.params[4]?.value,
                                  proposalStage: data?.proposal?.stage,
                                  proposalStatus: data?.proposal?.status,
                                  proposer: data?.proposals?.returnValues?.proposer,
                                  deposit: data?.proposals?.returnValues?.minDeposit,
                                  timestamp: data?.proposals?.returnValues?.timestamp,
                                  executionEpoch: data?.proposals?.executionEpoch,
                                  referrendumEpoch: data?.proposals?.referrendumEpoch,
                                  expirationEpoch: data?.proposals?.expirationEpoch,
                                  upvoteList: data?.proposals?.upvoteList
                              };
                          });
                      } else {
                          return;
                      }
                  })
                  .catch(function (err) {
                      return console.log(
                          `Error when getting proposal no. ${proposalNumber} title` + err
                      );
                  });
    }

    return { proposalDetails };
};
