import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "../components/Link";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Layout from "../components/Layout";
import CardContent from "@material-ui/core/CardContent";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import Chips from "../components/Chips";
import IconButton from "@material-ui/core/IconButton";

import { useRouter } from "next/router";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import TablePagination from "@material-ui/core/TablePagination";
import * as numbro from "numbro";
import moment from "moment";

//import MiddleEllipsis from "react-middle-ellipsis";

const GET_TX_DETAILS = gql`
  query Transaction($hash: String!) {
    transaction(hash: $hash) {
      value
      blockNumber
      nonce
      feeCurrency
      gatewayFeeRecipient
      gatewayFee
      gas
      hash
      input
      timestamp
      gas
      from {
        address
      }
      to {
        address
      }
    }
  }
`;

const useStyles = makeStyles(({ spacing, palette }) => {
  return {
    root: {
      width: "100%",
      padding: "1%",
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
    },
    inputLabel: {
      wordWrap: "break-word",
      padding: "0.5rem",
      fontSize: "0.75rem",
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
    },
  };
});

export default function TransactionDetails(hash_value: String) {
  const hash = hash_value.hash_value ? hash_value.hash_value.toString() : 0;
  const { loading, error, data } = useQuery(GET_TX_DETAILS, {
    variables: { hash },
  });
  const classes = useStyles();

  function ascii_to_hex(str: String) {
    var arr1 = [];
    for (var n = 0, l = str.length; n < l; n++) {
      var hex = Number(str.charCodeAt(n)).toString(16);
      arr1.push(hex);
    }
    return arr1.join("");
  }

  let inputValue =
    data && data.transaction && data.transaction.input
      ? data.transaction.input
      : null;

  if (loading) return null;
  if (error) return `Error! ${error}`;
  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container spacing={1} className={classes.item}>
          <Grid item xs={12}>
            <Typography color="textSecondary" variant="subtitle1" paragraph>
              Transaction Details
            </Typography>
          </Grid>
          <Divider />
          <Grid item xs={12} className={classes.item}>
            <Typography variant="caption" component="h2">
              Hash
            </Typography>
            <Typography variant="caption" component="h2">
              {data.transaction && data.transaction.hash
                ? data.transaction.hash
                : "Data currently not available"}
            </Typography>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} className={classes.item}>
            <Typography variant="caption" component="h2">
              Time
            </Typography>
            <Typography variant="caption" component="h2">
              {data && data.transaction && data.transaction.timestamp
                ? new Date(
                    parseInt(data.transaction.timestamp) * 1000
                  ).toUTCString()
                : "Data currently not available"}{" "}
              (
              {data && data.transaction && data.transaction.timestamp
                ? moment.unix(data.transaction.timestamp).fromNow()
                : null}
              )
            </Typography>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} className={classes.item}>
            <Typography variant="caption" component="h2">
              Tx Type
            </Typography>
            <Typography variant="caption" component="h2">
              {data.transaction.value === 0 || data.transaction.value
                ? "Contract Call"
                : "Token Transfer"}
            </Typography>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} className={classes.item}>
            <Typography variant="caption" component="h2">
              Status
            </Typography>
            <Typography variant="caption" component="h2">
              {!data.transaction.pending ? (
                <Chips value="Pending" />
              ) : (
                <Chips value="Success" />
              )}
            </Typography>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} className={classes.item}>
            <Typography variant="caption" component="h2">
              From
            </Typography>

            <Typography variant="caption" component="h2">
              {data.transaction && data.transaction.from ? (
                <Link
                  href="/account/[account]/"
                  as={`/account/${data.transaction.from.address}`}
                  color="secondary"
                >
                  {data.transaction.from.address}
                </Link>
              ) : (
                "Data currently not available"
              )}
            </Typography>

            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} className={classes.item}>
            <Typography variant="caption" component="h2">
              To
            </Typography>
            <Typography variant="caption" component="h2">
              {data.transaction && data.transaction.to ? (
                <Link
                  href="/account/[account]/"
                  as={`/account/${data.transaction.to.address}`}
                  color="secondary"
                >
                  {data.transaction.to.address}
                </Link>
              ) : (
                "Data currently not available"
              )}
            </Typography>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} className={classes.item}>
            <Typography variant="caption" component="h2">
              Value
            </Typography>
            <Typography variant="caption" component="h2">
              {data.transaction && data.transaction.value
                ? data.transaction.value
                : "Data currently not available"}
            </Typography>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} className={classes.item}>
            <Typography variant="caption" component="h2">
              Block Height
            </Typography>
            <Typography variant="caption" component="h2">
              <Link
                href={`/block/${data.transaction.blockNumber}`}
                color="secondary"
              >
                {data.transaction && data.transaction.blockNumber
                  ? data.transaction.blockNumber
                  : "Data currently not available"}
              </Link>
            </Typography>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} className={classes.item}>
            <Typography variant="caption" component="h2">
              Block Confirmation
            </Typography>
            <Typography variant="caption" component="h2">
              22,733
            </Typography>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} className={classes.item}>
            <Typography variant="caption" component="h2">
              Nonce
            </Typography>
            <Typography variant="caption" component="h2">
              {data.transaction && data.transaction.nonce
                ? data.transaction.nonce
                : "Data currently not available"}
            </Typography>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} className={classes.item}>
            <Typography variant="caption" component="h2">
              Transaction Fee
            </Typography>
            <Typography variant="caption" component="h2">
              {data.transaction && data.transaction.feeCurrency
                ? data.transaction.feeCurrency + "cGLD"
                : "Data currently not available"}{" "}
            </Typography>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} className={classes.item}>
            <Typography variant="caption" component="h2">
              Fee Receipient
            </Typography>
            <Typography variant="caption" component="h2">
              {data.transaction && data.transaction.gatewayFeeRecipient
                ? data.transaction.gatewayFeeRecipient
                : "Data currently not available"}
            </Typography>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} className={classes.item}>
            <Typography variant="caption" component="h2">
              Gate Fee
            </Typography>
            <Typography variant="caption" component="h2">
              {data.transaction && data.transaction.gatewayFee
                ? data.transaction.gatewayFee
                : "Data currently not available"}
            </Typography>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} className={classes.item}>
            <Typography variant="caption" component="h2">
              Transaction Speed
            </Typography>
            <Typography variant="caption" component="h2">
              1.5 seconds
            </Typography>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={3} md={1} className={classes.item}>
            <Typography variant="caption" component="h2">
              Raw Input
            </Typography>
          </Grid>
          <Grid item xs={2} md={1} className={classes.alignRight}>
            <Chips value={"Hex"} inputValue={ascii_to_hex(inputValue)} />
          </Grid>
          <Grid item xs={3} md={1}>
            <Chips value={"UTF-8"} inputValue={ascii_to_hex(inputValue)} />
          </Grid>

          <Grid item xs={4} md={9} className={classes.alignRight}>
            {/* <CopyToClipboard onCopy={this.onCopy} text={value}>
                <IconButton aria-label="copy" size="small">
                <img src="/images/copy.svg" />
                </IconButton>
          </CopyToClipboard>
                 */}

            <IconButton
              aria-label="copy"
              size="small"
              className={classes.alignRight}
            >
              <img src="/images/copy.svg" />
            </IconButton>
          </Grid>
          <Grid item xs={12} className={classes.alignLeft}>
            <FormControl fullWidth variant="filled" size="small" margin="dense">
              <FilledInput
                className={classes.inputLabel}
                value={
                  ascii_to_hex(inputValue)
                  // data.transaction && data.transaction.input
                  //   ? ascii_to_hex(data.transaction.input)
                  //   : " "
                }
                disableUnderline={true}
                readOnly
                style={{ padding: "0.7rem" }}
                multiline
              />
            </FormControl>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} className={classes.item}>
            <Typography variant="caption" component="h2">
              Gas Used
            </Typography>
            <Typography variant="caption" component="h2">
              {data.transaction && data.transaction.gas
                ? data.transaction.gas
                : "Data currently not available"}
            </Typography>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} className={classes.item}>
            <Typography variant="caption" component="h2">
              Gas Limit
            </Typography>
            <Typography variant="caption" component="h2">
              20,000.000
            </Typography>
            <Divider variant="middle" className={classes.divider} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
