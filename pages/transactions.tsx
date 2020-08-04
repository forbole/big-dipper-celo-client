import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Layout from "../components/Layout";
import Grid from "@material-ui/core/Grid";
import LatestTransactions from "../components/transaction/LatestTransactions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
    },


  })
);

export default function Transactions() {
  const classes = useStyles();
  return (
    <Layout>
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={12} sm={8} >
          <LatestTransactions pagination={true} />
        </Grid>
      </Grid>
    </Layout>
  );
}
