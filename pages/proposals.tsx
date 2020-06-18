import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Layout from "../components/Layout";
import Grid from "@material-ui/core/Grid";
import ProposalList from "../components/proposal/ProposalList";
import MarketCard from "../components/MarketCard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "block-inline",
      justifyContent: "center",
    },

    bottomPadding: {
      padding: "0.5rem",
    },
  })
);

export default function Proposals() {
  const classes = useStyles();
  return (
    <Layout>
      <Grid container className={classes.root}>
        <Grid item xs={12} className={classes.bottomPadding}>
          <MarketCard />
        </Grid>
        <Grid item xs={12} className={classes.bottomPadding}>
          <ProposalList />
        </Grid>
      </Grid>
    </Layout>
  );
}
