import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "../Link";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Avatar from "@material-ui/core/Avatar";
import ListSubheader from "@material-ui/core/ListSubheader";
import Button from "@material-ui/core/Button";
import Chips from "../Chips";
import AccountTransactions from "./Transactions";
import InternalTransactions from "./InternalTransactions";
import Downtime from "./Downtime";
import ValidatedBlocks from "./ValidatedBlocks";
import AddressCard from "./AddressCard";
import AccountDetails from "./AccountDetails";
import Hidden from "@material-ui/core/Hidden";
import FilledInput from "@material-ui/core/FilledInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { useRouter } from "next/router";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import ContentLoader from "react-content-loader";
import numbro from "numbro";
import AccountOverview from "./AccountOverview";
import CoinBalanceHistory from './CoinBalanceHistory'

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
  if (loading) return null;
  if (error) return <>{`Error! ${error.message}`}</>

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