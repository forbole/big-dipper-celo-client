import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Layout from "../../components/Layout";
import Grid from "@material-ui/core/Grid";
import BlockDetails from "../../components/block/BlockDetails";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
    },

  })
);

export default function Block() {
  const classes = useStyles();
  const router = useRouter();
  const blockNumber = parseFloat(router.query.block);

  return (
    <Layout>
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={12} >
          <BlockDetails number={blockNumber} />
        </Grid>
      </Grid>
    </Layout>
  );
}
