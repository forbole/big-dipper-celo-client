import React from "react";
import cx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useQuery } from "@apollo/client"; 
import TablePagination from "@material-ui/core/TablePagination";
import numbro from "numbro";
import ComponentLoader from './misc/ComponentLoader';
import NotAvailable from './misc/NotAvailable'
import ErrorMessage from './misc/ErrorMessage';

import { GET_CHAIN } from './query/Chain'


const useStyles = makeStyles({
  root: {
    display: "flex",
    padding: "1.5%",
  },
  card: {
    display: "block",
    justifyContent: "center",
    borderLeft: "4px solid #FBCC5C",
    borderRadius: 4,
    background: "#43484C",
    alignItems: "center",
    height: "100%"
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
    padding: "0.4rem 0.75rem 0 0.75rem",
  },

});


const ChartData = () => {
  const classes = useStyles();

  const { loading, error, data } = useQuery(GET_CHAIN, {
    pollInterval: 5000,
  });

  if (loading) return <ComponentLoader size="small" />
  if (error) return <ErrorMessage message={error.message} />


  return (
    <>
      <Grid container spacing={1} >
        <Grid item xs={6} md={3} lg={2}>
          <Card className={cx(classes.card)} elevation={0}>
            <Typography variant="body2" className={classes.label}>
              Celo Price
            </Typography>
            {data.chain.tokenPrice && data.chain.tokenPrice.usd ?
              <Typography variant="h5" className={classes.value}>
                $ {numbro(data.chain.tokenPrice.usd).format("0.00")}
              </Typography>
              : <NotAvailable variant="body2" className={classes.value} />}
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
              : <NotAvailable variant="body2" className={classes.value} />}
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
              : <NotAvailable variant="body2" className={classes.value} />}
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
              : <NotAvailable variant="body2" className={classes.value} />}
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
              : <NotAvailable variant="body2" className={classes.value} />}
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
              : <NotAvailable variant="body2" className={classes.value} />}
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default ChartData;
