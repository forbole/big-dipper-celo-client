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
import ValidatedBlocks from "./ValidatedBlocks";
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


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      padding: "1rem"
    },

    formControl: {
      minWidth: "9.75rem",
      //spadding: "0 1rem 0 0",
      // marginBottom: "1rem",
      marginTop: "-1rem",
      float: "right",
      // maxHeight: theme.spacing(4),
      // marginTop: theme.spacing(-1.5),
    },

    select: {
      fontSize: "14px",
      border: "solid rgba(255, 255, 255, 0.6) ",
      borderWidth: "0.09rem",
      borderRadius: 5,
      minWidth: "9.75rem",
    },

    inputLabel: {
      fontSize: "15px",
      paddingLeft: "1rem",
    },

    alignLeft: {
      display: "flex",
      overflow: "auto",
      //padding: "0.3rem 0 0 1rem",
    },

    alignRight: {
      display: "block",
      float: "right",
      //padding: "0.3rem 1rem 0 0",
    },


    buttonUnlock: {
      justifyContent: "center",
      width: "9.5rem",
      padding: "0.5rem",
      textTransform: "none",
      border: "solid thin",
      margin: "0.3rem 0 1rem 1rem",
    },

    buttonLock: {
      justifyContent: "center",
      width: "9.5rem",
      padding: "0.5rem",
      textTransform: "none",
      border: "solid thin",
      margin: "0.3rem 1rem 1rem 0",
    },

    box: {
      letterSpacing: "1px",
      paddingBottom: "1rem",
      display: "block",
      overflow: "hidden",
      whiteSpace: "nowrap",
    },


    divider: {
      //margin: "0.5rem",
      backgroundColor: "rgba(62, 67, 71, 1)",
    },


    label: {
      height: "2rem",
      verticalAlign: "middle",
      padding: "0 1rem 1rem 0",
      fontSize: "12px",
      backgroundColor: "rgba(61, 66, 71, 1)"
    },
    container: {
      justifyContent: "center",
      padding: "0rem",
      minWidth: "14.75rem",
    },

    tokenValue: {
      paddingLeft: "0.5rem",
    },

    dropdownSelection: {
      margin: "-2.4rem 0 0 0rem",
      paddingLeft: "0.5rem",
      paddingTop: "2.1rem",
      paddingBottom: "-0.5rem",
      // minHeight: "3.3rem",
    },

    erc20: {
      margin: "0rem 0rem -0.8rem 0rem",
      padding: "1.25rem 0"
    },

    listSubheader: {
      padding: "0 0 0 1rem",
    },

    searchIcon: {
      padding: "0.25rem"
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


const TokenDropdown = (props: any) => {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl} hiddenLabel>
      <InputLabel
        htmlFor="token-dropdown-select"
        className={classes.inputLabel}
      >
        <Typography
          variant="caption"
          color="textSecondary"
          gutterBottom
        >
          Select a token
        </Typography>
      </InputLabel>

      <Select
        id="token-dropdown-select"
        color="primary"
        className={classes.select}
        disableUnderline={true}
        // labelWidth={600}
        style={{ padding: "0" }}
      >
        <Typography
          variant="body1"
          color="textPrimary"
          className={classes.listSubheader}
          gutterBottom
        >
          Celo Dollar
        </Typography>
        <MenuItem value={1} className={classes.dropdownSelection}>
          <Typography
            variant="caption"
            color="textSecondary"
            className={classes.tokenValue}
            gutterBottom
          >
            {numbro((props.usd).toLocaleString('fullwide',)).format("0.0")}
          </Typography>
        </MenuItem>

        <Divider variant="middle" className={classes.divider} />

        <Typography
          variant="body1"
          color="textPrimary"
          className={classes.listSubheader}
          gutterBottom
        >
          Celo Gold
        </Typography>

        <MenuItem value={2} className={classes.dropdownSelection}>
          <Typography
            variant="caption"
            color="textSecondary"
            className={classes.tokenValue}
            gutterBottom
          >
            {numbro((props.celo).toLocaleString('fullwide',)).format("0.0")}
          </Typography>
        </MenuItem>
      </Select>
    </FormControl>
  );
}

const AccountOverview = (props: any) => {
  const classes = useStyles();
  const address: string = props.address ? (props.address).toString() : ''

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

          <Grid item xs={6}>
            <Typography variant="body2" className={classes.alignLeft}>
              Moniker
            </Typography>
          </Grid>
          <Grid item xs={6}>{validatorQuery && validatorQuery.data && validatorQuery.data.validator && validatorQuery.data.validator.name ?
            <Typography variant="body2" className={classes.alignRight} > {validatorQuery.data.validator.name} </Typography> :
            accountQuery.data.account && accountQuery.data.account.address ?
              <Typography variant="body2" className={classes.alignRight} >
                <MiddleEllipsis text={accountQuery.data.account.address} />
              </Typography> : < NotAvailable variant="body2" className={classes.alignRight} />}
          </Grid>

          <Grid item xs={12}>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={6} md={6}>
            <Typography variant="body2" className={classes.alignLeft}>
              Balance
            </Typography>
          </Grid>

          <Grid item xs={6} md={6}>
            {accountQuery.data.account && accountQuery.data.account.balance ? <Typography variant="body2" className={classes.alignRight} >
              {numbro((accountQuery.data.account.balance).toLocaleString('fullwide',)).format("0.00")} CELO
  </Typography> : < NotAvailable variant="body2" className={classes.alignRight} />}
          </Grid>
          <Grid item xs={12} md={12} >
            {accountQuery.data.account && accountQuery.data.account.balance && chainQuery.data.chain && chainQuery.data.chain.tokenPrice && chainQuery.data.chain.tokenPrice.usd ?
              < Typography variant="body2" className={classes.alignRight} noWrap>
                $ {numbro((accountQuery.data.account.balance * chainQuery.data.chain.tokenPrice.usd).toLocaleString('fullwide',)).format("0.00")}
              </Typography> : < NotAvailable variant="body2" className={classes.alignRight} />}
          </Grid>

          <Grid item xs={12}>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={4} md={4}>
            <Typography variant="body2">
              Tokens
            </Typography>
          </Grid>

          <Grid item xs={8} md={8}> {accountQuery.data.account && accountQuery.data.account.totalBalance && accountQuery.data.account.totalBalance.gold && accountQuery.data.account.totalBalance.usd ?
            <TokenDropdown celo={accountQuery.data.account.totalBalance.gold} usd={accountQuery.data.account.totalBalance.usd} /> :
            < NotAvailable variant="body2" className={classes.alignRight} />}
          </Grid>

          <Grid item xs={12}>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid container >
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