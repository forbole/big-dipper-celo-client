import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ProposalList from "../components/proposal/ProposalList";
import PriceCard from "../components/PriceCard";
import DepositList from "../components/proposal/DepositList";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
    },


  })
);

export default function Proposals() {
  const classes = useStyles();
  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item xs={12} >
        <PriceCard />
      </Grid>
      <Grid item xs={12} >
        <ProposalList />
      </Grid>
      <Grid item xs={12} >
        {/* <DepositList /> */}
      </Grid>
    </Grid>
  );
}
