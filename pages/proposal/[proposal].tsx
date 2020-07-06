import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Layout from "../../components/Layout";
import Grid from "@material-ui/core/Grid";
import ProposalDetails from "../../components/proposal/ProposalDetails";
import { useRouter } from "next/router";
import MarketCard from "../../components/MarketCard";
import DepositList from "../../components/proposal/DepositList";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
    },

    bottomPadding: {
      overflow: "auto",
      // paddingTop: '1.5%',
      // paddingBottom: '1.5%',
      padding: "1rem",
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
      <Grid container className={classes.root}>
        <Grid item xs={12} sm={8} className={classes.bottomPadding}>
          <MarketCard />
        </Grid>
        <Grid item xs={12} sm={8} className={classes.bottomPadding}>
          <ProposalDetails />
        </Grid>
        <Grid item xs={12} sm={8} className={classes.bottomPadding}>
          <DepositList />
        </Grid>
      </Grid>
    </Layout>
  );
}
