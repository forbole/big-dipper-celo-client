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
      display: "block-inline",
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

    formControl: {
      minWidth: "9.75rem",
      padding: "0 1rem 0 0",
      // marginBottom: "1rem",
      marginTop: "-1rem",
      float: "right",
      // maxHeight: theme.spacing(4),
      // marginTop: theme.spacing(-1.5),
    },

    select: {
      // align: "center",
      // justifyContent: "center",
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
      padding: "0.3rem 0 0 1rem",
    },

    alignRight: {
      display: "block",
      float: "right",
      padding: "0.3rem 1rem 0 0",
    },

    alignRightPrice: {
      display: "block",
      float: "right",
      paddingRight: "1rem",
      marginTop: "-0.5rem",
    },

    buttonUnlock: {
      justifyContent: "center",
      minWidth: "9.5rem",
      // marginBottom: "1rem",
      padding: "0.5rem",
      textTransform: "none",
      border: "solid thin",
      // marginLeft: "1rem",
      // marginTop: '0.3rem'
      margin: "0.3rem 0 1rem 1rem",
    },

    buttonLock: {
      justifyContent: "center",
      minWidth: "9.5rem",
      // marginBottom: "1rem",
      padding: "0.5rem",
      textTransform: "none",
      border: "solid thin",
      // marginRight: "1rem",
      margin: "0.3rem 1rem 1rem 0",
    },

    box: {
      letterSpacing: "1px",
      padding: "1rem",
      display: "block",
      overflow: "hidden",
      whiteSpace: "nowrap",
    },
    chip: {
      display: "block",
      marginLeft: "1rem",
    },

    divider: {
      margin: "0.5rem",
      backgroundColor: "rgba(62, 67, 71, 1)",
    },

    searchbar: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      verticalAlign: "middle",
    },

    label: {
      height: "2rem",
      verticalAlign: "middle",
      padding: "0 1rem 1rem 0",
      fontSize: "12px",
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
      margin: "-1.3rem 0 0 0rem",
      paddingLeft: "0.5rem",
      paddingTop: "0.5rem",
      paddingBottom: "-0.5rem",
      // minHeight: "3.3rem",
    },

    erc20: {
      margin: "0rem 0rem -0.8rem 0rem",
    },

    listSubheader: {
      padding: "0 0 0 1rem",
    },
  })
);

interface State {
  tokenSearch: string;
}

function TokenSearchBar() {
  const classes = useStyles();
  const [values, setValues] = React.useState<State>({
    tokenSearch: "",
  });

  const handleChange = (prop: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <div className={classes.searchbar}>
      <Grid container spacing={1} className={classes.container}>
        <Grid item xs={10}>
          <FormControl fullWidth variant="filled">
            <InputLabel htmlFor="token-search-input"></InputLabel>

            <FilledInput
              className={classes.label}
              id="token-search-input"
              value={values.tokenSearch}
              fullWidth
              disableUnderline={true}
              onChange={handleChange("tokenSearch")}
              placeholder="Search tokens"
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
}

function TokenDropdown() {
  const classes = useStyles();
  let celoGold = "14.221738 cGLD";
  let celoDollar = "492,270.513 cUSD";
  return (
    <FormControl className={classes.formControl} hiddenLabel>
      <InputLabel
        htmlFor="token-dropdown-select"
        className={classes.inputLabel}
      >
        {"Select a token"}
      </InputLabel>

      <Select
        id="token-dropdown-select"
        color="primary"
        className={classes.select}
        disableUnderline={true}
        // labelWidth={600}
        style={{ padding: "0" }}
      >
        <TokenSearchBar />
        <ListSubheader className={classes.erc20}>ERC-20 (2)</ListSubheader>
        <Divider className={classes.divider} />

        {/* <ListSubheader style={{ padding: "0 0 0 1rem" }}> */}
        <Typography
          variant="body2"
          color="textPrimary"
          className={classes.listSubheader}
          gutterBottom
        >
          Celo Dollar
        </Typography>
        {/* </ListSubheader> */}
        <MenuItem value={1} className={classes.dropdownSelection}>
          <Typography
            variant="body2"
            color="textSecondary"
            className={classes.tokenValue}
            gutterBottom
          >
            {celoDollar}
          </Typography>
        </MenuItem>

        <Divider variant="middle" className={classes.divider} />

        {/* <ListSubheader> */}
        <Typography
          variant="body2"
          color="textPrimary"
          className={classes.listSubheader}
          gutterBottom
        >
          Celo Gold
        </Typography>
        {/* </ListSubheader> */}

        <MenuItem value={2} className={classes.dropdownSelection}>
          <Typography
            variant="body2"
            color="textSecondary"
            className={classes.tokenValue}
            gutterBottom
          >
            {celoGold}
          </Typography>
        </MenuItem>
      </Select>
    </FormControl>
  );
}

function AccountOverview() {
  const classes = useStyles();

  return (
    <span>
      {/* <Grid container className={classes.root} xs={12} md={12} lg={6} > */}
      <Card>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="body1" className={classes.box}>
              Overview
            </Typography>
            <Divider variant="middle" />
          </Grid>
        </Grid>

        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography variant="body2" className={classes.alignLeft}>
              Moniker
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" className={classes.alignRight}>
              {"Michelle Clark"}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider variant="middle" />
          </Grid>

          <Grid item xs={6} md={9}>
            <Typography variant="body2" className={classes.alignLeft}>
              Balance
            </Typography>
          </Grid>

          <Grid item xs={6} md={3}>
            <Typography variant="body2" className={classes.alignRight}>
              {"14.9125447 cGLD"}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="caption" className={classes.alignRightPrice}>
              {"$41.978089412"}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider variant="middle" />
          </Grid>

          <Grid item xs={4} md={10}>
            <Typography variant="body2" className={classes.chip}>
              Tokens
            </Typography>
          </Grid>

          <Grid item xs={8} md={2}>
            <TokenDropdown />
          </Grid>

          <Grid item xs={12}>
            <Divider variant="middle" />
          </Grid>

          <Grid item xs={6} align="center">
            <Button
              variant="outlined"
              color="secondary"
              className={classes.buttonUnlock}
            >
              <Typography variant="body1">Unlock cGLD</Typography>
            </Button>
          </Grid>
          <Grid item xs={6} align="center">
            <Button
              variant="outlined"
              color="secondary"
              className={classes.buttonLock}
            >
              <Typography variant="body1">Lock cGLD</Typography>
            </Button>
          </Grid>
        </Grid>
      </Card>
      {/* </Grid> */}
    </span>
  );
}

export default function AccountPage() {
  const router = useRouter();

  if (!router.query.account) return <ContentLoader />;
  //console.log(router.query.block);
  const address = router.query.account.toString();
  console.log(address)
  const { loading, error, data } = useQuery(GET_ACCOUNT_DETAILS, {
    variables: { address },
  });
  const classes = useStyles();
  if (loading) return null;
  if (error) return `Error! ${error}`;

  return (
    <Grid container className={classes.root} xs={12}>
      <Hidden lgUp>
        <Grid item xs={12} lg={5} className={classes.bottomPadding}>
          <AddressCard address={data.account.address} />
        </Grid>
      </Hidden>

      <Hidden lgUp>
        <Grid item xs={12} lg={5} className={classes.bottomPadding}>
          <AccountOverview />
        </Grid>
      </Hidden>

      <Hidden mdDown>
        <Grid item xs={12} lg={5} className={classes.bottomPadding}>
          <AddressCard address={data.account.address} />
          <p></p>
          <AccountOverview />
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
  );
}
