import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Layout from "../components/Layout";
import Grid from "@material-ui/core/Grid";
import LatestTransactions from "../components/LatestTransactions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "inline-block",
      justifyContent: "center",
    },

    bottomPadding: {
      overflow: "auto",
      padding: "1rem",
    },
  })
);

export default function Transactions() {
  const classes = useStyles();
  return (
    <Layout>
      <Grid container className={classes.root}>
        <Grid item xs={12} sm={8} className={classes.bottomPadding}>
          <LatestTransactions pagination={true} />
        </Grid>
      </Grid>
    </Layout>
  );
}
