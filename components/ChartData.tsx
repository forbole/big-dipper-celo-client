import React from "react";
import cx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import TablePagination from "@material-ui/core/TablePagination";
import numbro from "numbro";
import RenderSkeleton from './misc/RenderSkeleton';
import NotAvailable from './misc/NotAvailable'

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
    display: "inline-block",
    padding: "0.2rem 0.75rem 0.5rem 0.75rem",
  },
  valueSuffix: {
    padding: "0.2rem 0.75rem 0.5rem 0"
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

  const { loading, error, data } = useQuery(GET_CHAIN, {
    pollInterval: 5000,
  });

  if (loading) return <RenderSkeleton size="small" />
  if (error) return <>{`Error! ${error.message}`}</>


  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={6} md={3} lg={2}>
          <Card className={cx(classes.card)} elevation={0}>
            <Typography variant="body2" className={classes.label}>
              Celo Price
            </Typography>
            {data.chain.tokenPrice && data.chain.tokenPrice.usd ?
              <Typography variant="h5" className={classes.value}>
                $ {numbro(data.chain.tokenPrice.usd).format("0.00")}
              </Typography>
              : <NotAvailable variant="h5" className={classes.value} />}
          </Card>
        </Grid>

        <Grid item xs={6} md={3} lg={2}>
          <Card className={cx(classes.card)} elevation={0}>
            <Typography variant="body2" className={classes.label}>
              Market Cap
            </Typography>
            {data.chain.tokenPrice && data.chain.tokenPrice.usdMarketCap ?
              <Typography variant="h5" className={classes.value}>
                $ {numbro(data.chain.tokenPrice.usdMarketCap).format("0.00")}
              </Typography>
              : <NotAvailable variant="h5" className={classes.value} />}
          </Card>
        </Grid>

        <Grid item xs={6} md={3} lg={2}>
          <Card className={cx(classes.card)} elevation={0}>
            <Typography variant="body2" className={classes.label}>
              Average block time
            </Typography>
            {data.chain ?
              <><Typography variant="h5" className={classes.value}>
                {numbro(data.chain.averageBlockTime).format("0.00")}
              </Typography><span className={classes.valueSuffix}>seconds</span></>
              : <NotAvailable variant="h5" className={classes.value} />}
          </Card>
        </Grid>

        <Grid item xs={6} md={3} lg={2}>
          <Card className={cx(classes.card)} elevation={0}>
            <Typography variant="body2" className={classes.label}>
              Total transactions
            </Typography>
            {data.chain ?
              <Typography variant="h5" className={classes.value}>
                {numbro(data.chain.txCount).format("000,000")}
              </Typography>
              : <NotAvailable variant="h5" className={classes.value} />}
          </Card>
        </Grid>

        <Grid item xs={6} md={3} lg={2}>
          <Card className={cx(classes.card)} elevation={0}>
            <Typography variant="body2" className={classes.label}>
              Total blocks
            </Typography>
            {data.chain ?
              <Typography variant="h5" className={classes.value}>
                {numbro(data.chain.latestHeight).format("000,000")}
              </Typography>
              : <NotAvailable variant="h5" className={classes.value} />}
          </Card>
        </Grid>

        <Grid item xs={6} md={3} lg={2}>
          <Card className={cx(classes.card)} elevation={0}>
            <Typography variant="body2" className={classes.label}>
              Wallet addresses
            </Typography>
            {data.chain ?
              <Typography variant="h5" className={classes.value}>
                {numbro(data.chain.walletCount).format("000,000")}
              </Typography>
              : <NotAvailable variant="h5" className={classes.value} />}
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default ChartData;
