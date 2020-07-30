import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Layout from "../components/Layout";
import Grid from "@material-ui/core/Grid";
import ProposalList from "../components/proposal/ProposalList";
import MarketCard from "../components/MarketCard";
import DepositList from "../components/proposal/DepositList";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
    },


  })
);

export default function Proposals() {
  const classes = useStyles();
  return (
    <Layout>
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={12} sm={8} >
          <MarketCard />
        </Grid>
        <Grid item xs={12} sm={8} >
          <ProposalList />
        </Grid>
        <Grid item xs={12} sm={8} >
          {/* <DepositList /> */}
        </Grid>
      </Grid>
    </Layout>
  );
}
