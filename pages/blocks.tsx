import Grid from '@material-ui/core/Grid';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';

import LatestBlocks from '../components/Block/LatestBlocks';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'center'
        }
    })
);

export default function Blocks(): JSX.Element {
    const classes = useStyles();
    return (
        <Grid container spacing={2} className={classes.root}>
            <Grid item xs={12}>
                <LatestBlocks pagination={true} displayCard={true} />
            </Grid>
        </Grid>
    );
}
