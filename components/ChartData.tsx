import React from "react";
import cx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useQuery } from "@apollo/client";
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

  blocksCard: {
    display: "block",
    justifyContent: "center",
    borderRadius: 4,
    background: "rgba(53, 208, 126, 1)",
    alignItems: "left",
    height: "7.5rem",
  },
  transactionsCard: {
    display: "block",
    justifyContent: "center",
    borderRadius: 4,
    background: "rgba(190, 150, 253, 1)",
    alignItems: "left",
    height: "7.5rem",
  },
  priceCard: {
    display: "block",
    justifyContent: "center",
    borderRadius: 4,
    background: "rgba(250, 123, 108, 1)",
    alignItems: "left",
    height: "7.5rem",
  },
  marketCapCard: {
    display: "block",
    justifyContent: "center",
    borderRadius: 4,
    background: "rgba(239, 195, 78, 1)",
    alignItems: "left",
    height: "7.5rem",
  },
  card: {
    display: "block",
    justifyContent: "center",
    borderLeft: "4px solid #FBCC5C",
    borderRadius: 4,
    background: "rgba(255, 255, 255, 1)",
    alignItems: "center",
    height: "100%",
  },
  value: {
    fontWeight: 300,
    display: "inline-block",
    padding: "0 0.75rem 2rem 1.5rem",
    color: "rgba(255, 255, 255, 1)"

  },
  valueSuffix: {
    padding: "0.2rem 0.75rem 0.5rem 0"
  },
  label: {
    display: "flex",
    padding: "1.5rem 0.75rem 1rem 1.5rem",
    color: "rgba(255, 255, 255, 1)"

  },

  dollarSign: {
    color: "rgba(255, 255, 255, 1)",
    display: "inline-block",
    marginLeft: "1.5rem",
    verticalAlign: "text-bottom"
  },
  dollarValue: {
    color: "rgba(255, 255, 255, 1)",
    fontWeight: 300,
    display: "inline-block",

  }

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

        <Grid item xs={6} md={3}>
          <Card className={cx(classes.blocksCard)} elevation={0}>
            <Typography variant="body2" className={classes.label}>
              Total blocks
            </Typography>
            {data.chain && data.chain.latestHeight >= 0 ?
              <Typography variant="h4" className={classes.value}>
                {numbro(data.chain.latestHeight).format("000,000")}
              </Typography>
              : <NotAvailable variant="body1" className={classes.value} />}
          </Card>
        </Grid>

        <Grid item xs={6} md={3} >
          <Card className={cx(classes.transactionsCard)} elevation={0}>
            <Typography variant="body2" className={classes.label}>
              Total transactions
            </Typography>
            {data.chain && data.chain.txCount >= 0 ?
              <Typography variant="h4" className={classes.value}>
                {numbro(data.chain.txCount).format("000,000")}
              </Typography>
              : <NotAvailable variant="body1" className={classes.value} />}
          </Card>
        </Grid>

        <Grid item xs={6} md={3}>
          <Card className={cx(classes.priceCard)} elevation={0}>
            <Typography variant="body2" className={classes.label}>
              Celo Price
            </Typography>
            {data.chain.tokenPrice && data.chain.tokenPrice.usd >= 0 ?
              <> <Typography variant="h6" className={classes.dollarSign}>$</Typography>
                <Typography variant="h4" className={classes.dollarValue}>
                  {numbro(data.chain.tokenPrice.usd).format("0.00")}
                </Typography> </>
              : <NotAvailable variant="body1" className={classes.value} />}
          </Card>
        </Grid>

        <Grid item xs={6} md={3}>
          <Card className={cx(classes.marketCapCard)} elevation={0}>
            <Typography variant="body2" className={classes.label}>
              Market Cap
            </Typography>
            {data.chain.tokenPrice && data.chain.tokenPrice.usdMarketCap >= 0 ?
              <><Typography variant="h6" className={classes.dollarSign}>$</Typography>
                <Typography variant="h4" className={classes.dollarValue}>
                  {numbro(data.chain.tokenPrice.usdMarketCap).format("0.00")}
                </Typography></>
              : <NotAvailable variant="body1" className={classes.value} />}
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default ChartData;
