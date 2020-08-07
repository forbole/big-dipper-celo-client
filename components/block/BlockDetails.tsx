import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "../Link";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import ContentLoader from "react-content-loader";
import moment from "moment";
import ComponentLoader from '../misc/ComponentLoader';
import NotAvailable from '../misc/NotAvailable'
import ErrorMessage from '../misc/ErrorMessage';
import { GET_BLOCK_DETAILS } from '../query/Block'


const useStyles = makeStyles(() => {
  return {
    root: {
      width: "100%",
      borderRadius: 5,
      wordWrap: "break-word",
    },

    divider: {
      margin: "0.5rem 0 0 0",
      backgroundColor: "rgba(62, 67, 71, 1)",
    },
    arrowIcon: {
      padding: "0.25rem",
      justifyContent: "center",
      border: "solid rgba(67, 72, 76, 1) ",
      borderRadius: 5,
      backgroundColor: "rgba(77, 81, 85, 1)",
      color: "rgba(255, 255, 255, 0.6)",
      height: "1.5rem",
      width: "1.5rem",
    },
    iconButtonRight: {
      padding: "0",
      float: "right",
    },
    iconButtonLeft: {
      padding: "0",
      float: "left",
      marginLeft: "-0.625rem"
    },
  };
});

const BlockDetails = () => {
  const router = useRouter();

  if (!router.query.block) return <ContentLoader />;

  //parse to String first to satisfy typecheck 
  const number = parseInt(router.query.block.toString());
  const prevBlock: number = number - 1;
  const nextBlock: number = number + 1;
  const { loading, error, data } = useQuery(GET_BLOCK_DETAILS, {
    variables: { number },
  });
  const classes = useStyles();
  if (loading) return <ComponentLoader />
  if (error) return <ErrorMessage message={error.message} />
  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container spacing={2} justify="center" >
          <Grid item xs={10}>
            <Typography color="textPrimary" variant="subtitle1" >
              Block #{number}
            </Typography>
          </Grid>

          <Grid item xs={1}>
            <Link
              href="/block/[block]/"
              as={`/block/${prevBlock}`}
              color="secondary"
            >
              <IconButton
                aria-label="Previous Block"
                className={classes.iconButtonRight}
              >
                <ArrowBackIosIcon className={classes.arrowIcon} />
              </IconButton>
            </Link>
          </Grid>
          <Grid item xs={1}>
            <Link
              href="/block/[block]/"
              as={`/block/${nextBlock}`}
              color="secondary"
            >
              {" "}
              <IconButton
                aria-label="Next Block"
                className={classes.iconButtonLeft}
              >
                <ArrowForwardIosIcon className={classes.arrowIcon} />
              </IconButton>
            </Link>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12} >
            <Typography variant="body2" component="h2">
              Time
            </Typography>
            <Typography variant="body2" component="h2">
              {data.block && data.block.timestamp
                ? new Date(parseInt(data.block.timestamp) * 1000).toUTCString()
                : <NotAvailable variant="body2" />}
              (
              {data && data.block && data.block.timestamp
                ? moment.unix(data.block.timestamp).fromNow()
                : null}
              )
            </Typography>
            <Divider variant="middle" className={classes.divider} />
          </Grid>
          <Grid item xs={12} >
            <Typography variant="body2" component="h2">
              Transactions
            </Typography>
            <Typography variant="body2" component="h2">
              {data.block &&
                data.block.transactions &&
                data.block.transactions.transactionIndex
                ? data.block.transactions.transactionIndex
                : "0"}
            </Typography>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} >
            <Typography variant="body2">Size</Typography>
            <Typography variant="body2" component="h2">
              {data.block && data.block.size
                ? data.block.size
                : <NotAvailable variant="body2" />}
            </Typography>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} >
            <Typography variant="body2" component="h2">
              Validator
            </Typography>
            <Typography variant="body2" component="h2">
              {data &&
                data.block &&
                data.block.miner &&
                data.block.miner.name ? (
                  <Link href="#" color="secondary">
                    {data.block.miner.name}
                  </Link>
                ) : <NotAvailable variant="body2" />}
            </Typography>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} >
            <Typography variant="body2" component="h2">
              Hash
            </Typography>
            <Typography variant="body2" component="h2">
              {data.block && data.block.hash
                ? data.block.hash
                : <NotAvailable variant="body2" />}
            </Typography>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} >
            <Typography variant="body2" component="h2">
              Parent Hash
            </Typography>

            <Typography variant="body2" component="h2">
              {data.block && data.block.parentHash ? (
                <Link
                  href="transaction/[transaction]/"
                  as={`transaction/${data.block.parentHash}`}
                  color="secondary"
                //className={classes.leftInline}
                >
                  {data.block.parentHash}
                </Link>
              ) : <NotAvailable variant="body2" />}
            </Typography>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} >
            <Typography variant="body2" component="h2">
              Total Difficulty
            </Typography>
            <Typography variant="body2" component="h2">
              {data.block && data.block.totalDifficulty
                ? data.block.totalDifficulty
                : <NotAvailable variant="body2" />}
            </Typography>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} >
            <Typography variant="body2" component="h2">
              Nonce
            </Typography>
            <Typography variant="body2" component="h2">
              {data.block &&
                data.block.transactions &&
                data.block.transactions.nonce
                ? data.block.transactions.nonce
                : <NotAvailable variant="body2" />}
            </Typography>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} >
            <Typography variant="body2" component="h2">
              Gas Used
            </Typography>
            <Typography variant="body2" component="h2">
              {data.block && data.block.gasUsed
                ? data.block.gasUsed
                : <NotAvailable variant="body2" />}
            </Typography>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} >
            <Typography variant="body2" component="h2">
              Gas Limit
            </Typography>
            <Typography variant="body2" component="h2">
              {data.block && data.block.gasLimit
                ? data.block.gasLimit
                : <NotAvailable variant="body2" />}
            </Typography>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} >
            <Typography variant="body2" component="h2" gutterBottom>
              Signers
            </Typography>
            {data.block && data.block.signers
              ?
              data.block.signers.map((row: any, index: number) => {
                return (
                  <span key={index}>

                    <Typography variant="body2" gutterBottom >
                      <Link
                        href="/validatorGroup/[validatorGroupDetails]/"
                        as={row.validator && row.validator.validatorGroup && row.validator.validatorGroup.address ?
                          `/validatorGroup/${row.validator.validatorGroup.address}` : ""}
                        color="secondary">
                        {row.validator.name}
                      </Link>
                    </Typography>
                  </span>
                )
              })
              : <NotAvailable variant="body2" />}
          </Grid>


        </Grid>
      </CardContent>
    </Card>
  );
}

export default BlockDetails
