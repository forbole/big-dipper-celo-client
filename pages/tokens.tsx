import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "../components/Link";
import Card from "@material-ui/core/Card";
import Layout from "../components/Layout";
import Overview from "../components/tokens/Overview";
import ProfileSummary from "../components/tokens/ProfileSummary";
import Transactions from "../components/account/Transactions";
import TokenHolders from "../components/tokens/TokenHolders";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      justifyContent: "center",
    },

  })
);

export default function Tokens() {
  const classes = useStyles();

  return (
    <Layout>
      <Grid container spacing={2} className={classes.root} >
        <Grid item xs={12}  >
          <Overview />
        </Grid>

        <Grid item xs={12} >
          <ProfileSummary />
        </Grid>

        <Grid item xs={12} >
          <Transactions address="" />
        </Grid>

        <Grid item xs={12} >
          <TokenHolders />
        </Grid>
      </Grid>
    </Layout>
  );
}
