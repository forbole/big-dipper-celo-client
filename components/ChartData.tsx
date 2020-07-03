import React from "react";
import cx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import TablePagination from "@material-ui/core/TablePagination";
import * as numbro from "numbro";

const GET_CHAIN = gql`
  {
    chain {
      _id
      averageBlockTime
      txCount
      latestHeight
      chainId
      tokenPrice {
        usd
        usdMarketCap
      }
      walletCount
    }
  }
`;

const chainUpdated: any[] = [];

function getChainInfo() {
  const { loading, error, data } = useQuery(GET_CHAIN, {
    pollInterval: 5000,
  });
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  // return(
  //   chainUpdated[0] = data.chain
  // )

  // data.chain.forEach((article : any, i: number) => {
  //   console.log(article);
  //   chainUpdated.push(article);
  // });

  return Object.keys(data).forEach(function (item, i) {
    chainUpdated[i] = data.chain;
  });

  // return (
  //   data.chain.forEach(function (block: any, i: number) {
  //     chainUpdated[i] = block;
  //     //console.log(block)
  //   })
  // )
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    padding: "1.5%",
  },
  card: {
    display: "block",
    justifyContent: "center",
    margin: "2%",
    borderLeft: "4px solid #FBCC5C",
    borderRadius: 4,
    background: "#43484C",
    alignItems: "center",
  },
  value: {
    fontWeight: 300,
    padding: "0.2rem 0.75rem 0.5rem 0.75rem",
  },
  label: {
    display: "flex",
    padding: "0.4rem 0.75rem 0.1rem 0.75rem",
  },
  container: {
    marginTop: "1.5%",
  },
});

const ChartData = () => {
  const classes = useStyles();
  getChainInfo();

  return (
    <div>
      <Grid container className={classes.container}>
        <Grid item xs={6} md={3} lg={2}>
          <Card className={cx(classes.card)} elevation={0}>
            <Typography variant="body2" className={classes.label}>
              cGLD Price
            </Typography>
            <Typography variant="h5" className={classes.value}>
              {chainUpdated[0]
                ? "$" + numbro(chainUpdated[0].tokenPrice.usd).format("0.00")
                : "Data currently not available"}
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={6} md={3} lg={2}>
          <Card className={cx(classes.card)} elevation={0}>
            <Typography variant="body2" className={classes.label}>
              Market Cap
            </Typography>
            <Typography variant="h5" className={classes.value}>
              {chainUpdated[0]
                ? "$" +
                  numbro(chainUpdated[0].tokenPrice.usdMarketCap).format("0.00")
                : "Data currently not available"}
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={6} md={3} lg={2}>
          <Card className={cx(classes.card)} elevation={0}>
            <Typography variant="body2" className={classes.label}>
              Average block time
            </Typography>
            <Typography variant="h5" className={classes.value}>
              {chainUpdated[0]
                ? numbro(chainUpdated[0].averageBlockTime).format("0.00") +
                  " seconds"
                : "Data currently not available"}
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={6} md={3} lg={2}>
          <Card className={cx(classes.card)} elevation={0}>
            <Typography variant="body2" className={classes.label}>
              Total transactions
            </Typography>
            <Typography variant="h5" className={classes.value}>
              {chainUpdated[0]
                ? numbro(chainUpdated[0].txCount).format("000,000")
                : "Data currently not available"}
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={6} md={3} lg={2}>
          <Card className={cx(classes.card)} elevation={0}>
            <Typography variant="body2" className={classes.label}>
              Total blocks
            </Typography>
            <Typography variant="h5" className={classes.value}>
              {chainUpdated[0]
                ? numbro(chainUpdated[0].latestHeight).format("000,000")
                : "Data currently not available"}
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={6} md={3} lg={2}>
          <Card className={cx(classes.card)} elevation={0}>
            <Typography variant="body2" className={classes.label}>
              Wallet addresses
            </Typography>
            <Typography variant="h5" className={classes.value}>
              {chainUpdated[0]
                ? numbro(chainUpdated[0].walletCount).format("000,000")
                : "Data currently not available"}
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default ChartData;
