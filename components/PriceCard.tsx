import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Link from "../components/Link";
import { makeStyles, useTheme, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import cx from "clsx";
import Card from "@material-ui/core/Card";
import { GET_CHAIN } from "./query/Chain";
import { useQuery } from "@apollo/client";
import NotAvailable from './misc/NotAvailable';
import numbro from "numbro";
import ComponentLoader from './misc/ComponentLoader';
import ErrorMessage from './misc/ErrorMessage';
import BigNumber from 'bignumber.js'
import Hidden from "@material-ui/core/Hidden";

const useStyles = makeStyles(({ spacing }) => {
  return {
    smallCard: {
      display: "flex",
      padding: "0.5rem",
      border: "solid 1px rgba(61, 66, 71, 1)",
      background: "rgba(255, 255, 255, 1)",
      borderRadius: 4,
      width: "13rem",
    },

    largeCard: {
      display: "flex",
      padding: "1rem",
      //border: "solid 1px rgba(61, 66, 71, 1)",
      background: "rgba(255, 255, 255, 1)",
      borderRadius: 4,
      marginBottom: "1rem",
    },

  };
});


const PriceCard = () => {
  const classes = useStyles();

  const chainData = useQuery(GET_CHAIN, {
    pollInterval: 5000,
  });

  if (chainData.loading) return <ComponentLoader />
  if (chainData.error) return <ErrorMessage message={chainData.error.message} />

  return (
    <Hidden smUp>
      <Card className={cx(classes.largeCard)} elevation={0}>
        <Grid container>
          <Grid item xs={6}>
            <Typography align="left" variant="body1">
              CELO Price
              </Typography>
          </Grid>
          <Grid item xs={6}>
            {chainData.data && chainData.data.chain && chainData.data.chain.tokenPrice && chainData.data.chain.tokenPrice.usd >= 0 ?
              <Typography align="right" variant="body1">
                $ {numbro(chainData.data.chain.tokenPrice.usd).format("0.00")}
              </Typography> : <NotAvailable variant="body2" />}
          </Grid>
          <Grid item xs={6} >
            <Typography align="left" variant="body1">
              Market Cap
              </Typography>
          </Grid>
          <Grid item xs={6}>
            {chainData.data && chainData.data.chain && chainData.data.chain.celoTotalSupply && chainData.data.chain.tokenPrice && chainData.data.chain.tokenPrice.usd >= 0 ?
              <Typography align="right" variant="body1">
                $ {(new BigNumber((chainData.data.chain.tokenPrice.usd * chainData.data.chain.celoTotalSupply) / process.env.CELO).toFormat(2))}
              </Typography> : <NotAvailable variant="body2" />}
          </Grid>
        </Grid>
      </Card>
    </Hidden>
  );
}

export default PriceCard