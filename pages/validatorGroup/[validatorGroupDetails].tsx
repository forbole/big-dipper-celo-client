import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles } from '@material-ui/core/styles';
// import { useRouter } from 'next/router';
import React from 'react';

import AddressCard from '../../components/account/AddressCard';
import GroupMember from '../../components/validatorGroup/GroupMember';
import Overview from '../../components/validatorGroup/Overview';
import Uptime from '../../components/validatorGroup/Uptime';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'center'
        }
    })
);

export default function validatorGroupDetails(): JSX.Element {
    const classes = useStyles();
    // const router = useRouter();
    // const { ValidatorGroupDet } = router.query;
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
