import Grid from '@material-ui/core/Grid';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useRouter } from 'next/router';
import React from 'react';

import AddressCard from '../../components/Account/AddressCard';
import GroupMember from '../../components/ValidatorGroup/GroupMember';
import Overview from '../../components/ValidatorGroup/Overview';
import Uptime from '../../components/ValidatorGroup/Uptime';

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
    const router = useRouter();
    const validatorGroup: string = router.query.validatorGroupDetails as string;

    return (
        <Grid container spacing={2} className={classes.root}>
            <Grid item xs={12}>
                <AddressCard address={validatorGroup} />
            </Grid>
            <Grid item xs={12}>
                <Overview address={validatorGroup} />
            </Grid>
            <Grid item xs={12} lg={6}>
                <GroupMember validatorGroupAddress={validatorGroup} />
            </Grid>
            <Grid item xs={12} lg={6}>
                <Uptime address={validatorGroup} />
            </Grid>
        </Grid>
    );
}
