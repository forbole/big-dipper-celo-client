import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import AccountTransactions from "./Transactions";
import Downtime from "./Downtime";
import ProposedBlocks from "./ProposedBlocks";
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
import { GET_VALIDATOR } from '../query/Validator'



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

type AccountPageProps = { address: string };

const AccountPage = ({ address }: AccountPageProps) => {
  const classes = useStyles();

  const { loading, error, data } = useQuery(GET_VALIDATOR, {
    variables: { address },
    pollInterval: 5000,
  });

  const isValidator = data && data.validator ? true : false;


  return (<>

    <Grid container spacing={2} className={classes.root}>

      <Grid item xs={12}  >
        <AddressCard address={address} />
      </Grid>

      <Grid item xs={12}  >
        <AccountOverview address={address} />
      </Grid>


      <Grid item xs={12} >
        <AccountTransactions address={address} />
      </Grid>


      {/* <Grid item xs={12} >
        <CoinBalanceHistory />
      </Grid> */}

      {isValidator ? <Grid item xs={12} >
        <Downtime address={address} />
      </Grid> : null}

      {isValidator ? <Grid item xs={12}>
        <ProposedBlocks address={address} />
      </Grid> : null}


      {isValidator ? <Grid item xs={12}>
        <AccountDetails address={address} />
      </Grid> : null}

    </Grid>
  </>
  );
}

export default AccountPage