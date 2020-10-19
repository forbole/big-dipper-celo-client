import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ProposalDetails from "../../components/proposal/ProposalDetails";
import { useRouter } from "next/router";
import AddressCard from "../../components/account/AddressCard";
import Overview from "../../components/validatorGroup/Overview";
import GroupMember from "../../components/validatorGroup/GroupMember";
import Uptime from "../../components/validatorGroup/Uptime";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            justifyContent: "center",
        },

    })
);

export default function validatorGroupDetails() {
    const classes = useStyles();
    const router = useRouter();
    const { ValidatorGroupDet } = router.query;
    return (
            <Grid container spacing={2} className={classes.root}>
                <Grid item xs={12}>
                    <AddressCard address="" />
                </Grid>
                <Grid item xs={12}>
                    <Overview />
                </Grid>
                <Grid item xs={12}>
                    <GroupMember />
                </Grid>
                <Grid item xs={12}>
                    <Uptime />
                </Grid>
            </Grid>
    );
}
