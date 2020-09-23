import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { useRouter } from "next/router";
import PriceCard from "../components/PriceCard";
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
            <Grid container spacing={2} className={classes.root}>
                <Grid item xs={12} >
                <PriceCard />
                </Grid>
                <Grid item xs={12} >
                    <ValidatorVotesList />
                </Grid>

            </Grid>
    );
}
