import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import React from 'react';

import AccountPage from '../../components/account/AccountPage';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'center'
        }
    })
);

export default function Account() {
    const classes = useStyles();
    const router = useRouter();
    const accountAddress: string = router.query.account as string;

    return (
        <Grid container className={classes.root}>
            <Grid item xs={12}>
                <AccountPage address={accountAddress} />
            </Grid>
        </Grid>
    );
}
