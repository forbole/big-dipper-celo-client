import Grid from '@material-ui/core/Grid';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useRouter } from 'next/router';
import React from 'react';

import AccountPage from '../../components/Account/AccountPage';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'center'
        }
    })
);

export default function Account(): JSX.Element {
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
