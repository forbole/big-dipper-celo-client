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
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";




const useStyles = makeStyles(() => {
    return {
        root: {
            width: "100%",
            // padding: "1%",
            borderRadius: 5,
            wordWrap: "break-word",
        },
        item: {
            padding: "0.5rem",
        },

        member: {
            display: "inline-flex",
            verticalAlign: "middle",

        },
        divider: {
            margin: "0.15rem 0rem",
            backgroundColor: "rgba(232, 232, 232, 1)",
        },
        arrowIcon: {
            padding: "0.25rem",
            justifyContent: "center",
            border: "solid rgba(67, 72, 76, 1) ",
            borderRadius: 5,
            backgroundColor: "rgba(246, 247, 249, 1)",
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
        },

        dotIcon: {
            height: "0.7rem",
            width: "0.7rem",
            verticalAlign: "middle",
            color: "rgba(251, 204, 92, 1)",
            margin: "0 0.25rem",
        },

        memberNumber: {
            paddingRight: "0.5rem",
            marginTop: "0.2rem"
        },

        lowerItem: {
            marginTop: "0.3rem"
        },
        alignRight: {
            alignItems: "right"
        }
    };
});

const GroupMember = () => {

    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <Grid container spacing={1}  className={classes.item}>
                    <Grid item xs={12} className={classes.member}>
                        <Typography color="textPrimary" variant="subtitle1" >
                            Group member (2) <FiberManualRecordIcon className={classes.dotIcon} />
                        </Typography>
                        <Typography color="textPrimary" variant="body1" className={classes.memberNumber} >
                            Elected
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider variant="middle" className={classes.divider} />
                    </Grid>
                    <Grid item xs={6} className={classes.member}>
                        <Typography variant="body2" className={classes.memberNumber}>
                            #1
            </Typography>
                        <Link
                            href="account/[account]/"
                            as={`account/${1}`}
                            color="secondary"
                        >
                            <Typography variant="body1" >
                                Vincent Lynch <FiberManualRecordIcon className={classes.dotIcon} />
                            </Typography>
                        </Link>
                    </Grid>

                    <Grid item xs={6} >
                        <Typography variant="body1" align="right" color="textPrimary">
                            1,000 CGLD
                        </Typography>
                    </Grid>

                    <Grid item xs={6} >
                        <Typography variant="caption" >
                            99.8%
            </Typography>
                        <Typography variant="caption" >
                            10.9%
            </Typography>
                    </Grid>
                    <Grid item xs={6} >
                        <Typography variant="body2" align="right" >
                            0.987CGLD
            </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Divider variant="middle" className={classes.divider} />
                    </Grid>

                    <Grid item xs={6} className={classes.member}>
                        <Typography variant="body2" className={classes.memberNumber}>
                            #2
            </Typography>
                        <Link
                            href="account/[account]/"
                            as={`account/${1}`}
                            color="secondary"
                        >
                            <Typography variant="body1" >
                                Michelle Clark
                            </Typography>
                        </Link>
                    </Grid>

                    <Grid item xs={6} >
                        <Typography variant="body1" align="right" color="textPrimary">
                            1,000 CGLD
                        </Typography>
                    </Grid>

                    <Grid item xs={6} >
                        <Typography variant="caption" >
                            99.8%
            </Typography>
                        <Typography variant="caption" >
                            10.9%
            </Typography>
                    </Grid>
                    <Grid item xs={6} >
                        <Typography variant="body2" align="right" >
                            0.987CGLD
            </Typography>
                    </Grid>


                </Grid>
            </CardContent >
        </Card >
    );
}

export default GroupMember