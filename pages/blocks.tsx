import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Layout from "../components/Layout";
import Grid from "@material-ui/core/Grid";
import LatestBlocks from "../components/block/LatestBlocks";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
    },

  })
);

export default function Blocks() {
  const classes = useStyles();
  return (
    <Layout>
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={12} md={7}>
          <LatestBlocks pagination={true} displayCard={true} />

        </Grid>
      </Grid>
    </Layout>
  );
}
