import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Layout from "../components/Layout";
import ChartData from "../components/ChartData";
import LatestTransactions from "../components/LatestTransactions";
import Grid from "@material-ui/core/Grid";
import LatestBlocks from "../components/LatestBlocks";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
    },

    bottomPadding: {
      overflow: "auto",
      padding: "1rem",
    },
  })
);

export default function Blocks() {
  const classes = useStyles();
  return (
    <Layout>
      <Grid container className={classes.root}>
        <Grid item xs={12} sm={8} className={classes.bottomPadding}>
          <LatestBlocks pagination={true} />
        </Grid>
      </Grid>
    </Layout>
  );
}
