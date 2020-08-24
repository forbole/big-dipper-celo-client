import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Layout from "../../components/Layout";
import Grid from "@material-ui/core/Grid";
import TransactionDetails from "../../components/transaction/TransactionDetails";
import InputParameters from "../../components/transaction/InputParameters";
import InputCard from "../../components/transaction/InputCard";


import { useRouter } from "next/router";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      // paddingTop: "2%",
    },

  })
);

export default function Transaction() {
  const classes = useStyles();
  const router = useRouter();
  const transactionHash: string = router.query.transaction as string

  return (
    <Layout>
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={12}>
          <TransactionDetails hash={transactionHash} />
        </Grid>
        <Grid item xs={12}>
          <InputCard hash={transactionHash} />
        </Grid>
        <Grid item xs={12}>
          <InputParameters hash={transactionHash} />
        </Grid>
      </Grid>
    </Layout>
  );
}
