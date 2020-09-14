import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import AccountPage from "../../components/account/AccountPage";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
    },
  })
);

export default function Account() {
  const classes = useStyles();
  const router = useRouter();
  const accountAddress: string = router.query.account as string

  return (
      <Grid container className={classes.root}>
        <Grid item xs={12} >
          <AccountPage address={accountAddress} />
        </Grid>
      </Grid>
  );
}
