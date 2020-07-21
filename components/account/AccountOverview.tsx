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
      alignItems: "center",
    }
  })
);

interface State {
  tokenSearch: string;
}

const TokenSearchBar = () => {
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
                <InputAdornment position="start" className={classes.searchIcon}>
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

const TokenDropdown = () => {
  const classes = useStyles();
  let celoGold = "14.221738 cGLD";
  let celoDollar = "492,270.513 cUSD";
  return (
    <FormControl className={classes.formControl} hiddenLabel>
      <InputLabel
        htmlFor="token-dropdown-select"
        className={classes.inputLabel}
      >
        <Typography
          variant="body1"
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
        <TokenSearchBar />
        <ListSubheader ><Typography
          variant="body1"
          color="textSecondary"
          gutterBottom
          className={classes.erc20}
        >
          ERC-20 (2)
        </Typography></ListSubheader>
        <Divider className={classes.divider} />

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
            variant="body1"
            color="textSecondary"
            className={classes.tokenValue}
            gutterBottom
          >
            {celoDollar}
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
            variant="body1"
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

const AccountOverview = (props: any) => {
  const classes = useStyles();
  return (
    <span>
      <Card>
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
          <Grid item xs={6}>
            <Typography variant="body2" className={classes.alignRight}>
              {"Michelle Clark"}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={6} md={9}>
            <Typography variant="body2" className={classes.alignLeft}>
              Balance
            </Typography>
          </Grid>

          <Grid item xs={6} md={3}>
            <Typography variant="body2" className={classes.alignRight}>
              {numbro(parseFloat(props.balance)).format("0.000000")} cGLD
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="body2" className={classes.alignRightPrice}>
              {"$41.978089412"}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider variant="middle" className={classes.divider} />
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
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid container direction="row" alignItems="center" justify="center" className={classes.centerButtons}>
            <Grid item xs={6} justify="center" >
              <Button
                variant="outlined"
                color="secondary"
                className={classes.buttonUnlock}
              >
                <Typography variant="body1">Unlock cGLD</Typography>
              </Button>
            </Grid>
            <Grid item xs={6} justify="center"  >
              <Button
                variant="outlined"
                color="secondary"
                className={classes.buttonLock}
              >
                <Typography variant="body1">Lock cGLD</Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </span>
  );
}

export default AccountOverview