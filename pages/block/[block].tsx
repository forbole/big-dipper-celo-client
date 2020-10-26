import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import React from 'react';

import BlockDetails from '../../components/block/BlockDetails';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'center'
        }
    })
);

export default function Block() {
    const classes = useStyles();
    const router = useRouter();
    const blockNumber: string = router.query.block as string;

    return (
        <Grid container spacing={2} className={classes.root}>
            <Grid item xs={12}>
                <BlockDetails blockNumber={blockNumber} />
            </Grid>
        </Grid>
    );
}
