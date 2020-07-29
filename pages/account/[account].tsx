import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Layout from "../../components/Layout";
import Grid from "@material-ui/core/Grid";
import AccountPage from "../../components/account/AccountPage";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      paddingTop: "2%",
    },

    bottomPadding: {
      overflow: "auto",
      // paddingTop: '1.5%',
      // paddingBottom: '1.5%',
      //   padding: "1rem",
    },
  })
);

export default function Account() {
  const classes = useStyles();

  return (
    <Layout>
      <Grid container className={classes.root}>
        <Grid item xs={12} sm={10} className={classes.bottomPadding}>
          <AccountPage />
        </Grid>
      </Grid>
    </Layout>
  );
}
