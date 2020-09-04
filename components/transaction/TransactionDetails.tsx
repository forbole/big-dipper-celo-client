import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Link from "../Link";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Layout from "../Layout";
import CardContent from "@material-ui/core/CardContent";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import Chips from "../Chips";
import IconButton from "@material-ui/core/IconButton";

import { useRouter } from "next/router";
import gql from "@apollo/client";
import { useQuery } from "@apollo/client";
import * as numbro from "numbro";
import moment from "moment";
import Chip from "@material-ui/core/Chip";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import ComponentLoader from '../misc/ComponentLoader';
import NotAvailable from '../misc/NotAvailable'
import ErrorMessage from '../misc/ErrorMessage';
import { GET_TX_DETAILS } from '../query/Transaction'




const useStyles = makeStyles(({ spacing, palette }) => {
  return {
    root: {
      width: "100%",
      borderRadius: 5,
      wordWrap: "break-word",
      margin: "none",
    },
    inline: {
      paddingLeft: 0,
    },

    item: {
      padding: "0 0 1rem 0.5rem",
    },
    divider: {
      margin: "0.5rem 0 0 0",
      backgroundColor: "rgba(62, 67, 71, 1)",
    },
    inputLabel: {
      wordWrap: "break-word",
      padding: "0.5rem",
      fontSize: "0.75rem",
      backgroundColor: "rgba(246, 247, 249, 1)",
    },
    alignRight: {
      //display: 'block',
      float: "right",
      paddingRight: "1rem",
    },
    alignLeft: {
      display: "flex",
      float: "left",
      paddingRight: "1rem",
    },

    MuiFilledInputInput: {
      padding: "0rem",
      minHeight: "3rem",
      maxHeight: "6rem",
    },

    hex: {
      borderRadius: 5,
      backgroundColor: "rgba(61, 66, 71, 1)",
      border: "solid 0.5px rgba(255, 255, 255, 0.8)",
      padding: "0.1rem",
      fontSize: "0.7rem",
      width: "3rem",
      height: "1rem",
    },

    uft8: {
      borderRadius: 4,
      backgroundColor: "rgba(61, 66, 71, 1)",
      opacity: 5,
      border: "solid 0.5px rgba(255, 255, 255, 0.8)",
      //borderWidth: "0.5px",
      //padding: "0.1rem",
      fontSize: "0.6rem",
      width: "3.2rem",
      height: "1rem",
    },
    alertMessage: {
      background: "#3AD39E",
    },
  };
});

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

type TxDetailsProps = { hash: string };


const TransactionDetails = ({ hash }: TxDetailsProps) => {
  const classes = useStyles();

  const { loading, error, data } = useQuery(GET_TX_DETAILS, {
    variables: { hash },
  });
  const [open, setOpen] = React.useState(false);

  let inputValue = data && data.transaction && data.transaction.input
    ? data.transaction.input
    : null;


  const copyText = () => {
    let rawInputForm = document.getElementById("rawInputForm") as HTMLInputElement
    return navigator.clipboard
      .writeText(rawInputForm.value)
      .then(() => setOpen(true))
      .catch((err) => {
        console.log("Something went wrong", err);
      })
  };

  const closeAlert = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  function asciiToHex(str: String) {
    var arr1 = [];
    for (var n = 0, l = str.length; n < l; n++) {
      var hex = Number(str.charCodeAt(n)).toString(16);
      arr1.push(hex);
    }
    return arr1.join("").toString();
  }

  const handleClickHex = () => {
    let rawInputForm = document.getElementById("rawInputForm") as HTMLInputElement
    rawInputForm.value = asciiToHex(inputValue)
    return rawInputForm.value
  };

  const handleClickUTF8 = () => {
    let rawInputForm = document.getElementById("rawInputForm") as HTMLInputElement
    (rawInputForm.value) = inputValue
    return rawInputForm.value
  };

  if (loading) return <ComponentLoader />
  if (error) return <ErrorMessage message={error.message} />
  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container spacing={2} className={classes.item}>
          <Grid item xs={12}>
            <Typography color="textSecondary" variant="subtitle1" paragraph>
              Transaction Details
            </Typography>
          </Grid>
          <Divider />
          <Grid item xs={12} className={classes.item}>
            <Typography variant="body2" component="h2">
              Hash
            </Typography>
            {data.transaction && data.transaction.hash ?
              <Typography variant="body2" component="h2">
                {data.transaction.hash}
              </Typography>
              : <NotAvailable variant="body2" />}
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} className={classes.item}>
            <Typography variant="body2" component="h2">
              Time
            </Typography>
            <Typography variant="body2" component="h2">
              {data && data.transaction && data.transaction.timestamp
                ? new Date(
                  parseInt(data.transaction.timestamp) * 1000
                ).toUTCString()
                : <NotAvailable variant="body2" />}
              (
              {data && data.transaction && data.transaction.timestamp
                ? moment.unix(data.transaction.timestamp).fromNow()
                : null}
              )
            </Typography>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} className={classes.item}>
            <Typography variant="body2" component="h2">
              Tx Type
            </Typography>
            <Typography variant="body2" component="h2">
              {(data.transaction &&
                data.transaction.value && data.transaction.value === 0) ||
                data.transaction &&
                data.transaction.value && data.transaction.value
                ? "Contract Call"
                : "Token Transfer"}
            </Typography>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} className={classes.item}>
            <Typography variant="body2" component="h2" gutterBottom>
              Status
            </Typography>
            <Typography variant="body2" component="h2">
              {data.transaction && data.transaction.pending ? (
                <Chips actionResult="Pending" />
              ) : (
                  <Chips actionResult="Success" />
                )}
            </Typography>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} className={classes.item}>
            <Typography variant="body2" component="h2">
              From
            </Typography>

            {data.transaction && data.transaction.from ?
              <Typography variant="body2" component="h2">
                <Link
                  href="/account/[account]/"
                  as={`/account/${data.transaction.from.address}`}
                  color="secondary"
                >
                  {data.transaction.from.address}
                </Link>
              </Typography>
              : <NotAvailable variant="body2" />}

            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} className={classes.item}>
            <Typography variant="body2" component="h2">
              To
            </Typography>
            {data.transaction && data.transaction.to ?
              <Typography variant="body2" component="h2">
                <Link
                  href="/account/[account]/"
                  as={`/account/${data.transaction.to.address}`}
                  color="secondary"
                >
                  {data.transaction.to.address}
                </Link>
              </Typography>
              : <NotAvailable variant="body2" />}

            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} className={classes.item}>
            <Typography variant="body2" component="h2">
              Value
            </Typography>

            {data.transaction && data.transaction.value ?
              <Typography variant="body2" component="h2">
                {data.transaction.value}
              </Typography>
              : <NotAvailable variant="body2" />}
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} className={classes.item}>
            <Typography variant="body2" component="h2">
              Block Height
            </Typography>
            {data.transaction && data.transaction.blockNumber ?
              < Typography variant="body2" component="h2">
                <Link
                  href={`/block/${data.transaction.blockNumber}`}
                  color="secondary"
                > {data.transaction.blockNumber}
                </Link>
              </Typography>
              : <NotAvailable variant="body2" />}
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} className={classes.item}>
            <Typography variant="body2" component="h2">
              Nonce
            </Typography>
            {data.transaction && data.transaction.nonce ?
              < Typography variant="body2" component="h2">
                {data.transaction.nonce}
              </Typography>
              : <NotAvailable variant="body2" />}
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} className={classes.item}>
            <Typography variant="body2" component="h2">
              Transaction Fee
            </Typography>
            {data.transaction && data.transaction.feeCurrency ?
              <Typography variant="body2" component="h2">
                {data.transaction.feeCurrency} + "cGLD"
            </Typography>
              : <NotAvailable variant="body2" />}
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} className={classes.item}>
            <Typography variant="body2" component="h2">
              Fee Receipient
            </Typography>
            {data.transaction && data.transaction.gatewayFeeRecipient
              ? <Typography variant="body2" component="h2">
                {data.transaction.gatewayFeeRecipient}
              </Typography>
              : <NotAvailable variant="body2" />}
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} className={classes.item}>
            <Typography variant="body2" component="h2">
              Gate Fee
            </Typography>
            {data.transaction && data.transaction.gatewayFee
              ?
              <Typography variant="body2" component="h2">
                {data.transaction.gatewayFee}
              </Typography>
              : <NotAvailable variant="body2" />}

            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} className={classes.item}>
            <Typography variant="body2" component="h2">
              Transaction Speed
            </Typography>
            {data.transaction && data.transaction.speed ?
              <Typography variant="body2" component="h2">
                {data.transaction.speed}
              </Typography>
              : <NotAvailable variant="body2" />}
            <Divider variant="middle" className={classes.divider} />
          </Grid>
          {data && data.transaction && data.transaction.input ?
            <> <Grid item xs={3} md={1} className={classes.item}>
              <Typography variant="body2" component="h2">
                Raw Input
            </Typography>
            </Grid>
              <Grid item xs={2} md={1} className={classes.alignRight}>
                <Chip
                  label="Hex"
                  size="small"
                  className={classes.hex}
                  onClick={handleClickHex}
                />
              </Grid>
              <Grid item xs={3} md={1}>
                <Chip
                  label="UTF-8"
                  size="small"
                  className={classes.uft8}
                  onClick={handleClickUTF8}
                />
              </Grid>

              <Grid item xs={4} md={9} className={classes.alignRight}>
                <IconButton
                  aria-label="copy"
                  size="small"
                  className={classes.alignRight}
                  onClick={copyText}
                >
                  <img src="/images/copy.svg" />
                </IconButton>
              </Grid>

              <Grid item xs={12} className={classes.alignLeft}>
                <FormControl fullWidth variant="filled" size="small" margin="dense">
                  <FilledInput
                    className={classes.inputLabel}
                    id="rawInputForm"
                    type="text"
                    value={
                      asciiToHex(data.transaction.input)
                    }
                    disableUnderline={true}
                    readOnly
                    style={{ padding: "0.7rem" }}
                    multiline

                  />
                </FormControl>
                <Divider variant="middle" className={classes.divider} />
              </Grid> </> : null}

          <Grid item xs={12} className={classes.item}>
            <Typography variant="body2" component="h2">
              Gas Used
            </Typography>
            {data.transaction && data.transaction.gas ?
              <Typography variant="body2" component="h2">
                {data.transaction.gas}
              </Typography>
              : <NotAvailable variant="body2" />}
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} className={classes.item}>
            <Typography variant="body2" >
              Gas Limit
            </Typography>
            {data.transaction && data.transaction.gasLimit
              ? <Typography variant="body2">
                {data.transaction.gasLimit}
              </Typography>
              : <NotAvailable variant="body2" />}
          </Grid>
        </Grid>
      </CardContent>
      <Snackbar open={open} autoHideDuration={6000} onClose={closeAlert}>
        <Alert
          onClose={closeAlert}
          severity="success"
          // variant="outlined"
          className={classes.alertMessage}
        >
          <Typography variant="body1">Copied!</Typography>
        </Alert>
      </Snackbar>{" "}

    </Card >
  );
}

export default TransactionDetails