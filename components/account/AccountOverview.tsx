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
import Downtime from "./Downtime";
import AddressCard from "./AddressCard";
import AccountDetails from "./AccountDetails";
import Hidden from "@material-ui/core/Hidden";
import FilledInput from "@material-ui/core/FilledInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { useRouter } from "next/router";
import gql from "@apollo/client";
import { useQuery } from "@apollo/client";
import ContentLoader from "react-content-loader";
import numbro from "numbro";
import { GET_ACCOUNT_DETAILS } from '../query/Account';
import { GET_CHAIN } from '../query/Chain';
import { GET_VALIDATOR } from '../query/Validator';

import ComponentLoader from '../misc/ComponentLoader';
import NotAvailable from '../misc/NotAvailable'
import ErrorMessage from '../misc/ErrorMessage';
import MiddleEllipsis from '../misc/MiddleEllipsis'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import BigNumber from 'bignumber.js'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      padding: "1rem"
    },
    alignLeft: {
      display: "flex",
      overflow: "auto",
    },
    alignRight: {
      display: "block",
      float: "right",
    },
    buttonUnlock: {
      justifyContent: "center",
      [theme.breakpoints.down('xs')]: {
        width: "7.5rem",
      },
      width: "9.5rem",
      padding: "0.5rem",
      textTransform: "none",
      border: "solid thin",
      margin: "0.3rem 0 0.2rem 1rem",
    },
    buttonLock: {
      justifyContent: "center",
      [theme.breakpoints.down('xs')]: {
        width: "7.5rem",
      },
      width: "9.5rem",
      padding: "0.5rem",
      textTransform: "none",
      border: "solid thin",
      margin: "0.3rem 1rem 0.2rem 0",
    },
    box: {
      letterSpacing: "1px",
      paddingBottom: "1rem",
      display: "block",
      overflow: "hidden",
      whiteSpace: "nowrap",
    },
    divider: {
      backgroundColor: "rgba(62, 67, 71, 1)",
    },
    centerButtons: {
      justifyContent: "center",
      flexWrap: "wrap",
      padding: "0.1rem",
      textTransform: "none",
    },
    centerContent: {
      display: "flex",
      justifyContent: "center",
    },
  })
);

type AccountOverviewProps = { address: string };

const AccountOverview = ({ address }: AccountOverviewProps) => {
  const classes = useStyles();

  const accountQuery = useQuery(GET_ACCOUNT_DETAILS, {
    variables: { address },
  });

  const chainQuery = useQuery(GET_CHAIN, {
  });

  const validatorQuery = useQuery(GET_VALIDATOR, {
    variables: { address },
  });

  if (accountQuery.loading || chainQuery.loading) return <ComponentLoader />
  if (accountQuery.error || chainQuery.error) return <ErrorMessage message={accountQuery.error ? accountQuery.error.message : ' ' || (chainQuery.error ? chainQuery.error.message : ' ')} />
  return (
    <span>
      <Card className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="body1" className={classes.box}>
              Overview
            </Typography>
            <Divider variant="middle" className={classes.divider} />
          </Grid>
          {validatorQuery && validatorQuery.data && validatorQuery.data.validator && validatorQuery.data.validator.name ?
            <>
              <Grid item xs={6}>
                <Typography variant="body2" className={classes.alignLeft}>
                  Moniker
            </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" className={classes.alignRight} > {validatorQuery.data.validator.name} </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider variant="middle" className={classes.divider} />
              </Grid>
            </> : null
          }

          <Grid item xs={3} >
            <Typography variant="body2" className={classes.alignLeft}>
              Balance
            </Typography>
          </Grid>

          <Grid item xs={9} >
            {accountQuery.data.account && accountQuery.data.account.balance ? <Typography variant="body2" className={classes.alignRight} >
              {new BigNumber(accountQuery.data.account.balance).toFormat(4)} CELO
            </Typography> : < NotAvailable variant="body2" className={classes.alignRight} />}
          </Grid>
          <Grid item xs={12}  >
            {accountQuery.data.account && accountQuery.data.account.balance && chainQuery.data.chain && chainQuery.data.chain.tokenPrice && chainQuery.data.chain.tokenPrice.usd ?
              < Typography variant="body2" className={classes.alignRight}>
                {new BigNumber(accountQuery.data.account.balance * chainQuery.data.chain.tokenPrice.usd).toFormat(4)} cUSD
              </Typography> : < NotAvailable variant="body2" className={classes.alignRight} />}
          </Grid>

          <Grid item xs={12}>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid container spacing={2} >
            <Grid item xs={6} className={classes.centerContent} >
              <div className={classes.centerButtons}>
                <Button
                  variant="outlined"
                  color="secondary"
                  className={classes.buttonUnlock}
                >
                  <Typography variant="body1">Unlock cGLD</Typography>
                </Button>
              </div>
            </Grid>
            <Grid item xs={6} className={classes.centerContent} >
              <div className={classes.centerButtons}>
                <Button
                  variant="outlined"
                  color="secondary"
                  className={classes.buttonLock}
                >
                  <Typography variant="body1">Lock cGLD</Typography>
                </Button>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </span >
  );
}

export default AccountOverview