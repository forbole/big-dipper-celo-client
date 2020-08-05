import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import AccountTransactions from "./Transactions";
import Downtime from "./Downtime";
import ValidatedBlocks from "./ValidatedBlocks";
import AddressCard from "./AddressCard";
import AccountDetails from "./AccountDetails";
import Hidden from "@material-ui/core/Hidden";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import ContentLoader from "react-content-loader";
import numbro from "numbro";
import AccountOverview from "./AccountOverview";
import CoinBalanceHistory from './CoinBalanceHistory';
import ComponentLoader from '../misc/ComponentLoader';
import ErrorMessage from '../misc/ErrorMessage';
import { GET_ACCOUNT_DETAILS } from '../query/Account'



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
    },

    leftInline: {
      display: "flex",
      overflow: "auto",
      padding: "0 0 0 1rem",
    },

    divider: {
      margin: "0.5rem",
      backgroundColor: "rgba(62, 67, 71, 1)",
    },

    container: {
      justifyContent: "center",
      padding: "0rem",
      minWidth: "14.75rem",
    },
  })
);



const AccountPage = (props: any) => {
  const classes = useStyles();

  const accountAddress = props.address

  return (<>

    <Grid container spacing={2} className={classes.root}>

      <Grid item xs={12} md={8} >
        <AddressCard address={accountAddress} />
      </Grid>

      <Grid item xs={12} md={8} >
        <AccountOverview address={accountAddress} />
      </Grid>


      <Grid item xs={12} md={8} >
        <AccountTransactions address={accountAddress} />
      </Grid>


      {/* <Grid item xs={12} md={8} >
        <CoinBalanceHistory />
      </Grid> */}

      <Grid item xs={12} md={8} >
        <Downtime />
      </Grid>

      <Grid item xs={12} md={8} >
        <ValidatedBlocks />
      </Grid>


      <Grid item xs={12} md={8} >
        <AccountDetails address={accountAddress}/>
      </Grid>

    </Grid>
  </>
  );
}

export default AccountPage