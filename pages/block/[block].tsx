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
  const { Block } = router.query;
  // const pid = parseInt(router.query.block);
  return (
    <Layout>
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={12} sm={8} >
          <BlockDetails />
        </Grid>
      </Grid>
    </Layout>
  );
}
