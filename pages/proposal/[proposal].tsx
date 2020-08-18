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

export default function Proposal() {
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
          <ProposalDetails proposal={proposalNumber} />
        </Grid>
        <Grid item xs={12} >
          <ProposalVotingList />
        </Grid>
        <Grid item xs={12} >
          <DepositList />
        </Grid>
      </Grid>
    </Layout>
  );
}
