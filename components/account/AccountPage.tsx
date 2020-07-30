import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import AccountTransactions from "./Transactions";
import InternalTransactions from "./InternalTransactions";
import Downtime from "./Downtime";
import ValidatedBlocks from "./ValidatedBlocks";
import AddressCard from "./AddressCard";
import AccountDetails from "./AccountDetails";
import Hidden from "@material-ui/core/Hidden";
import { useRouter } from "next/router";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import ContentLoader from "react-content-loader";
import numbro from "numbro";
import AccountOverview from "./AccountOverview";
import CoinBalanceHistory from './CoinBalanceHistory';
import RenderSkeleton from '../misc/RenderSkeleton';
import ErrorMessage from '../misc/ErrorMessage';


const GET_ACCOUNT_DETAILS = gql`
  query Account($address: String!) {
    account(address: $address) {
      _id
      address
      balance
    }
  }
`;

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

    bottomPadding: {
      overflow: "auto",
      padding: "0.5rem 1rem",
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

const AccountPage = () => {
  const router = useRouter();

  //if (!router.query.account) return <ContentLoader />;
  //console.log(router.query.block);
  const address = router.query.account;
  console.log(address);
  const { loading, error, data } = useQuery(GET_ACCOUNT_DETAILS, {
    variables: { address },
  });
  const classes = useStyles();
  if (loading) return <RenderSkeleton />
  if (error) return <ErrorMessage message={error.message} />

  return (<>
    <Grid container className={classes.root}>
      <Hidden lgUp>
        <Grid item xs={12} lg={5} className={classes.bottomPadding}>
          <AddressCard address={data.account.address} />
        </Grid>
      </Hidden>

      <Hidden lgUp>
        <Grid item xs={12} lg={5} className={classes.bottomPadding}>
          <AccountOverview balance={data.account.balance} />
        </Grid>
      </Hidden>

      <Hidden mdDown>
        <Grid item xs={12} lg={5} className={classes.bottomPadding}>
          <AddressCard address={data.account.address} />
          <p></p>
          <AccountOverview balance={data.account.balance} />
        </Grid>
      </Hidden>

      <Hidden mdDown>
        <Grid item xs={12} lg={5} className={classes.bottomPadding}>
          <AccountDetails />
        </Grid>
      </Hidden>

      <Grid item xs={12} lg={5} className={classes.bottomPadding}>
        <AccountTransactions />
      </Grid>

      <Grid item xs={12} lg={5} className={classes.bottomPadding}>
        <InternalTransactions />
      </Grid>

      <Grid item xs={12} lg={5} className={classes.bottomPadding}>
        <CoinBalanceHistory />
      </Grid>

      <Grid item xs={12} lg={5} className={classes.bottomPadding}>
        <Downtime />
      </Grid>

      <Grid item xs={12} lg={5} className={classes.bottomPadding}>
        <ValidatedBlocks />
      </Grid>

      <Hidden lgUp>
        <Grid item xs={12} lg={5} className={classes.bottomPadding}>
          <AccountDetails />
        </Grid>
      </Hidden>
    </Grid>
  </>
  );
}

export default AccountPage