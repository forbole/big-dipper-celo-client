import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Layout from "../components/Layout";
import Grid from "@material-ui/core/Grid";
import { useRouter } from "next/router";
import MarketCard from "../components/MarketCard";
import ValidatorVotesList from "../components/validatorGroup/ValidatorVotesList"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            justifyContent: "center",
        },

    })
);

export default function ValidatorVotes() {
    const classes = useStyles();
    const router = useRouter();
    const { ValidatorVotesQuery } = router.query;

    return (
        <Layout>
            <Grid container spacing={2} className={classes.root}>
                <Grid item xs={12} >
                    <MarketCard />
                </Grid>
                <Grid item xs={12} >
                    <ValidatorVotesList />
                </Grid>

            </Grid>
        </Layout>
    );
}
