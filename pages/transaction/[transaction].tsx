import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Layout from "../../components/Layout";
import Grid from "@material-ui/core/Grid";
import TransactionDetails from "../../components/transaction/TransactionDetails";
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
  const { Transaction } = router.query;

  return (
    <Layout>
      <Grid container className={classes.root}>
        <Grid item xs={12} md={7}>
          <TransactionDetails hashValue={router.query.transaction} />
        </Grid>
      </Grid>
    </Layout>
  );
}
