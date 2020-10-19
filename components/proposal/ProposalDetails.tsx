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
import gql from "@apollo/client";
import { useQuery } from "@apollo/client";
import ContentLoader from "react-content-loader";
import moment from "moment";
import LedgerButtons from "../ledger/LedgerButtons";
import NotAvailable from '../misc/NotAvailable'
import ErrorMessage from '../misc/ErrorMessage';


const useStyles = makeStyles(() => {
  return {
    root: {
      width: "100%",
      // padding: "1%",
      borderRadius: 5,
      wordWrap: "break-word",
    },
    item: {
      padding: "0 0 0 0.5rem",
    },
    divider: {
      margin: "0.5rem 0 0 0",
      backgroundColor: "rgba(232, 232, 232, 1)",
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
    },

    centerContent: {
      display: "flex",
      margin: "1rem 0 -0.5rem 0",
      justifyContent: "center",
    },

    MuiCardContentRootlastChild: {
      paddingBottom: "0rem",
    },
  };
});

const ProposalDetails = () => {
  // // const BlockDetails = (number_value : any  ) => {
  // export default function Block(number_value: any) {
  //   const router = useRouter();

  //   if (!router.query.block) return <ContentLoader />;
  //   //console.log(router.query.block);
  //   const number = parseInt(router.query.block);
  const number = 1;
  const prevProposal: number = number - 1;
  const nextProposal: number = number + 1;
  //   const { loading, error, data } = useQuery(GET_BLOCK_DETAILS, {
  //     variables: { number },
  //   });
  const classes = useStyles();
  //   if (loading) return null;
  //   if (error) return <ErrorMessage message={error.message} />
  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container spacing={1} justify="center" className={classes.item}>
          <Grid item xs={10}>
            <Typography color="textSecondary" variant="subtitle1" gutterBottom>
              Proposals Details
            </Typography>
          </Grid>

          <Grid item xs={1}>
            <Link
              href={`/proposal/${prevProposal}`}
              color="secondary"
            >
              <IconButton
                aria-label="Previous Proposal"
                className={classes.iconButtonRight}
              >
                <ArrowBackIosIcon className={classes.arrowIcon} />
              </IconButton>
            </Link>
          </Grid>
          <Grid item xs={1}>
            <Link
              href={`/proposal/${nextProposal}`}
              color="secondary"
            >
              {" "}
              <IconButton
                aria-label="Next Proposal"
                className={classes.iconButtonLeft}
              >
                <ArrowForwardIosIcon className={classes.arrowIcon} />
              </IconButton>
            </Link>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12} className={classes.item}>
            <Typography variant="body2">
              Proposal ID
            </Typography>
            <Typography variant="body2" >
              {/* {data.block && data.block.timestamp
                ? new Date(parseInt(data.block.timestamp) * 1000).toUTCString()
                : <NotAvailable variant="body2" />}
              (
              {data && data.block && data.block.timestamp
                ? moment.unix(data.block.timestamp).fromNow()
                : null}
              ) */}
            </Typography>
            <Divider variant="middle" className={classes.divider} />
          </Grid>
          <Grid item xs={12} className={classes.item}>
            <Typography variant="body2" >
              Proposer
            </Typography>
            <Typography variant="body2" >
              {/* {data.block &&
              data.block.transactions &&
              data.block.transactions.transactionIndex
                ? data.block.transactions.transactionIndex.length()
                : <NotAvailable variant="body2" />} */}
            </Typography>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} className={classes.item}>
            <Typography variant="body2">Size</Typography>
            <Typography variant="body2" >
              {/* {data.block && data.block.size
                ? data.block.size
                : <NotAvailable variant="body2" />} */}
            </Typography>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} className={classes.item}>
            <Typography variant="body2">
              Type
            </Typography>
            <Typography variant="body2" >
              {/* {data &&
              data.block &&
              data.block.miner &&
              data.block.miner.name ? (
                <Link href="#" color="secondary">
                  {data.block.miner.name}
                </Link>
              ) : <NotAvailable variant="body2" />} */}
            </Typography>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} className={classes.item}>
            <Typography variant="body2"  >
              Title
            </Typography>
            <Typography variant="body2"  >
              {/* {data.block && data.block.hash
                ? data.block.hash
                : <NotAvailable variant="body2" />} */}
            </Typography>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} className={classes.item}>
            <Typography variant="body2"  >
              Description
            </Typography>

            <Typography variant="body2"  >
              {/* {data.block && data.block.parentHash ? (
                <Link
                  href="transaction/[transaction]/"
                  as={`transaction/${data.block.parentHash}`}
                  color="secondary"
                  //className={classes.leftInline}
                >
                  {data.block.parentHash}
                </Link>
              ) : <NotAvailable variant="body2" />} */}
            </Typography>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} className={classes.item}>
            <Typography variant="body2"  >
              Deposit
            </Typography>
            <Typography variant="body2"  >
              {/* {data.block && data.block.totalDifficulty
                ? data.block.totalDifficulty
                : <NotAvailable variant="body2" />} */}
            </Typography>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} className={classes.item}>
            <Typography variant="body2"  >
              Submitted Time
            </Typography>
            <Typography variant="body2"  >
              {/* {data.block &&
              data.block.transactions &&
              data.block.transactions.nonce
                ? data.block.transactions.nonce
                : <NotAvailable variant="body2" />} */}
            </Typography>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} className={classes.item}>
            <Typography variant="body2"  >
              Deposit End Time
            </Typography>
            <Typography variant="body2"  >
              {/* {data.block && data.block.gasUsed
                ? data.block.gasUsed
                : <NotAvailable variant="body2" />} */}
            </Typography>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} className={classes.item}>
            <Typography variant="body2"  >
              Voting Start Time
            </Typography>
            <Typography variant="body2"  >
              {/* {data.block && data.block.gasLimit
                ? data.block.gasLimit
                : <NotAvailable variant="body2" />} */}
            </Typography>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} className={classes.item}>
            <Typography variant="body2"  >
              Voting End Time
            </Typography>
            <Typography variant="body2"  >
              {/* {data.block && data.block.gasLimit
                ? data.block.gasLimit
                : <NotAvailable variant="body2" />} */}
            </Typography>
            <Divider variant="middle" className={classes.divider} />
          </Grid>
          <Grid item xs={12} sm={2} className={classes.centerContent}>
            <LedgerButtons option="Vote" />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default ProposalDetails