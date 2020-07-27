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
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import ContentLoader from "react-content-loader";
import moment from "moment";
import LedgerButtons from "../ledger/LedgerButtons";


const useStyles = makeStyles(() => {
    return {
        root: {
            width: "100%",
            borderRadius: 5,
            wordWrap: "break-word",
        },
        item: {
            padding: "0.5rem",
        },
        divider: {
            margin: "0.15rem 0rem",
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

        centerContent: {
            display: "flex",
            margin: "1rem 0 -0.5rem 0",
            justifyContent: "center",
        },

        MuiCardContentRootlastChild: {
            paddingBottom: "0rem",
        },

        cardItem: {
            padding: "1rem"
        }
    };
});

const Overview = () => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardContent>
                <Grid container spacing={1} justify="center" className={classes.item}>
                    <Grid item xs={12}>
                        <Typography color="textSecondary" variant="subtitle1" gutterBottom>
                            Overview
            </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider variant="middle" className={classes.divider} />
                    </Grid>
                    <Grid item xs={6} className={classes.item}>
                        <Typography variant="body2">
                            Group Name
            </Typography>
                    </Grid>
                    <Grid item xs={6} className={classes.item}>
                        <Typography variant="body2" align="right" >
                            Nan Valdez G
                            {/* {data.block && data.block.timestamp
                ? new Date(parseInt(data.block.timestamp) * 1000).toUTCString()
                : "Data currently not available"}{" "}
              (
              {data && data.block && data.block.timestamp
                ? moment.unix(data.block.timestamp).fromNow()
                : null}
              ) */}
                        </Typography>
                        
                    </Grid>
                    <Grid item xs={12}>
                        <Divider variant="middle" className={classes.divider} />
                    </Grid>

                    <Grid item xs={6} className={classes.item}>
                        <Typography variant="body2" >
                            Locked cGLD
            </Typography>
                    </Grid>
                    <Grid item xs={6} className={classes.item}>
                        <Typography variant="body2" align="right" >
                            2,000 CGLD
                            {/* {data.block &&
              data.block.transactions &&
              data.block.transactions.transactionIndex
                ? data.block.transactions.transactionIndex.length()
                : "Data currently not available"} */}
                        </Typography>

                    </Grid>

                    <Grid item xs={12}>
                        <Divider variant="middle" className={classes.divider} />
                    </Grid>

                    <Grid item xs={6} className={classes.item}>
                        <Typography variant="body2"  >
                            Group Share
            </Typography>
                    </Grid>
                    <Grid item xs={6} className={classes.item}>
                        <Typography variant="body2" align="right"  >
                            10%
                            {/* {data.block && data.block.hash
                ? data.block.hash
                : "Data currently not available"} */}
                        </Typography>
                    </Grid>

                    <Divider variant="middle" className={classes.divider} />


                    <Grid item xs={6} className={classes.item}>
                        <Typography variant="body2"  >
                            Uptime
            </Typography>
                    </Grid>
                    <Grid item xs={6} className={classes.item}>

                        <Typography variant="body2" align="right"  >
                            100%
                            {/* {data.block && data.block.parentHash ? (
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
              )} */}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Divider variant="middle" className={classes.divider} />
                    </Grid>

                    <Grid item xs={6} className={classes.item}>
                        <Typography variant="body2"  >
                            Attestation
            </Typography>
                    </Grid>
                    <Grid item xs={6} className={classes.item}>
                        <Typography variant="body2" align="right"  >
                            10.9%
                            {/* {data.block && data.block.totalDifficulty
                ? data.block.totalDifficulty
                : "Data currently not available"} */}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Divider variant="middle" className={classes.divider} />
                    </Grid>

                    <Grid item xs={12} className={classes.item}>
                        <Typography variant="body2"  >
                            Description
            </Typography>
                        <Typography variant="body2"  >
                            Integer at faucibus urna. Nullam condimentum leo id elit sagittis auctor. Curabitur elementum nunc a leo imperdiet, nec elementum diam elementum. Etiam elementum euismod commodo. Proin eleifend eget quam ut efficitur. Mauris a accumsan mauris.
                            {/* {data.block &&
              data.block.transactions &&
              data.block.transactions.nonce
                ? data.block.transactions.nonce
                : "Data currently not available"} */}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Divider variant="middle" className={classes.divider} />
                    </Grid>

                    <Grid item xs={12} className={classes.centerContent}>
                        <LedgerButtons option="ValidatorGroupVote" />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default Overview