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
  const { Proposal } = router.query;
  // const pid = parseInt(router.query.block);
  return (
    <Layout>
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={12} sm={8} >
          <MarketCard />
        </Grid>
        <Grid item xs={12} sm={8} >
          <ProposalDetails />
        </Grid>
        <Grid item xs={12} sm={8} >
          <ProposalVotingList />
        </Grid>
        <Grid item xs={12} sm={8} >
          <DepositList />
        </Grid>
      </Grid>
    </Layout>
  );
}
