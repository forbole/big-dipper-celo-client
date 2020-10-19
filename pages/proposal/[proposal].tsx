import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Layout from "../../components/Layout";
import Grid from "@material-ui/core/Grid";
import ProposalDetails from "../../components/proposal/ProposalDetails";
import { useRouter } from "next/router";
import MarketCard from "../../components/MarketCard";
import DepositList from "../../components/proposal/DepositList";
import ProposalVotingList from "../../components/proposal/ProposalVotingList"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
    },

  })
);

export default function Proposal(proposalDetails: string) {
  const classes = useStyles();
  const router = useRouter();
  const proposalNumber: string = router.query.proposal as string;
  return (
    <Layout>
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={12} >
          <MarketCard />
        </Grid>
        <Grid item xs={12} >
          <ProposalDetails proposal={proposalNumber} proposalDetails={proposalDetails.proposalDetails} />
        </Grid>
        <Grid item xs={12} >
          <ProposalVotingList proposal={proposalNumber} />
        </Grid>
        <Grid item xs={12} >
          <DepositList proposal={proposalNumber} />
        </Grid>
      </Grid>
    </Layout>
  );
}

Proposal.getInitialProps = async (ctx: any) => {
  const { query } = ctx;
  const response = await fetch(`https://raw.githubusercontent.com/celo-org/celo-proposals/master/CGPs/000${query.proposal}.md`)
  const proposalDetails = await response.text();
  return { proposalDetails }
}