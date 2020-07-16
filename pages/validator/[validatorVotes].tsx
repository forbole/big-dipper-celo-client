import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Layout from "../../components/Layout";
import Grid from "@material-ui/core/Grid";
import ProposalDetails from "../../components/proposal/ProposalDetails";
import { useRouter } from "next/router";
import MarketCard from "../../components/MarketCard";
import ValidatorVotes from "../../components/validator/ValidatorVotes"

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

export default function ValidatorVotes() {
  const classes = useStyles();
  const router = useRouter();
  const { ValidatorVotes } = router.query;

  return (
    <Layout>
      <Grid container className={classes.root}>
        <Grid item xs={12} sm={8} className={classes.bottomPadding}>
          <MarketCard />
        </Grid>
        <Grid item xs={12} sm={8} className={classes.bottomPadding}>
          <ValidatorVotes />
        </Grid>
        
      </Grid>
    </Layout>
  );
}
