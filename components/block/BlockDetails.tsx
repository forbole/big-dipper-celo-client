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
import { GET_BLOCK_DETAILS } from '../query/Block'


const useStyles = makeStyles(() => {
  return {
    root: {
      width: "100%",
      padding: "1%",
      borderRadius: 5,
      wordWrap: "break-word",
    },
    item: {
      padding: "0 0 1rem 0.5rem",
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
    },
  };
});

const BlockDetails = () => {
  // // const BlockDetails = (number_value : any  ) => {
  // export default function Block(number_value: any) {
  const router = useRouter();

  if (!router.query.block) return <ContentLoader />;
  //console.log(router.query.block);
  const number = parseInt(router.query.block);
  const prevBlock: number = number - 1;
  const nextBlock: number = number + 1;
  const { loading, error, data } = useQuery(GET_BLOCK_DETAILS, {
    variables: { number },
  });
  const classes = useStyles();
  if (loading) return null;
  if (error) return <>{`Error! ${error.message}`}</>
  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container spacing={1} justify="center" className={classes.item}>
          <Grid item xs={10}>
            <Typography color="textSecondary" variant="subtitle1" paragraph>
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
          <Grid item xs={12} className={classes.item}>
            <Typography variant="body2" component="h2">
              Time
            </Typography>
            <Typography variant="body2" component="h2">
              {data.block && data.block.timestamp
                ? new Date(parseInt(data.block.timestamp) * 1000).toUTCString()
                : "Data currently not available"}{" "}
              (
              {data && data.block && data.block.timestamp
                ? moment.unix(data.block.timestamp).fromNow()
                : null}
              )
            </Typography>
            <Divider variant="middle" className={classes.divider} />
          </Grid>
          <Grid item xs={12} className={classes.item}>
            <Typography variant="body2" component="h2">
              Transactions
            </Typography>
            <Typography variant="body2" component="h2">
              {data.block &&
                data.block.transactions &&
                data.block.transactions.transactionIndex
                ? data.block.transactions.transactionIndex.length()
                : "Data currently not available"}
            </Typography>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} className={classes.item}>
            <Typography variant="body2">Size</Typography>
            <Typography variant="body2" component="h2">
              {data.block && data.block.size
                ? data.block.size
                : "Data currently not available"}
            </Typography>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} className={classes.item}>
            <Typography variant="body2" component="h2">
              Miner
            </Typography>
            <Typography variant="body2" component="h2">
              {data &&
                data.block &&
                data.block.miner &&
                data.block.miner.name ? (
                  <Link href="#" color="secondary">
                    {data.block.miner.name}
                  </Link>
                ) : (
                  "Data currently not available"
                )}
            </Typography>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} className={classes.item}>
            <Typography variant="body2" component="h2">
              Hash
            </Typography>
            <Typography variant="body2" component="h2">
              {data.block && data.block.hash
                ? data.block.hash
                : "Data currently not available"}
            </Typography>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} className={classes.item}>
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
              ) : (
                  "Data currently not available"
                )}
            </Typography>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} className={classes.item}>
            <Typography variant="body2" component="h2">
              Total Difficulty
            </Typography>
            <Typography variant="body2" component="h2">
              {data.block && data.block.totalDifficulty
                ? data.block.totalDifficulty
                : "Data currently not available"}
            </Typography>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} className={classes.item}>
            <Typography variant="body2" component="h2">
              Nonce
            </Typography>
            <Typography variant="body2" component="h2">
              {data.block &&
                data.block.transactions &&
                data.block.transactions.nonce
                ? data.block.transactions.nonce
                : "Data currently not available"}
            </Typography>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} className={classes.item}>
            <Typography variant="body2" component="h2">
              Gas Used
            </Typography>
            <Typography variant="body2" component="h2">
              {data.block && data.block.gasUsed
                ? data.block.gasUsed
                : "Data currently not available"}
            </Typography>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} className={classes.item}>
            <Typography variant="body2" component="h2">
              Gas Limit
            </Typography>
            <Typography variant="body2" component="h2">
              {data.block && data.block.gasLimit
                ? data.block.gasLimit
                : "Data currently not available"}
            </Typography>
            <Divider variant="middle" className={classes.divider} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default BlockDetails