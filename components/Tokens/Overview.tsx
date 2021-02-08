import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            paddingBottom: '0.5rem'
        },

        alignLeft: {
            display: 'flex',
            overflow: 'auto',
            padding: '0 0 0 1rem'
        },

        alignRight: {
            display: 'inline-block',
            float: 'right',
            paddingRight: '1rem'
        },

        box: {
            letterSpacing: '1px',
            padding: '1rem',
            display: 'block',
            overflow: 'hidden',
            whiteSpace: 'nowrap'
        },
        divider: {
            backgroundColor: 'rgba(232, 232, 232, 1)'
        }
    })
);

const TokenOverview = (): JSX.Element => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography variant="body1" className={classes.box}>
                        Overview
                    </Typography>
                    <Divider variant="middle" className={classes.divider} />
                </Grid>

                <Grid item xs={6}>
                    <Typography variant="body2" gutterBottom className={classes.alignLeft}>
                        Price
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body2" gutterBottom className={classes.alignRight}>
                        {'$0.00001'}
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Divider variant="middle" />
                </Grid>

                <Grid item xs={7}>
                    <Typography variant="body2" gutterBottom className={classes.alignLeft}>
                        Fully Diluted Market Cap
                    </Typography>
                </Grid>

                <Grid item xs={5}>
                    <Typography variant="body2" gutterBottom className={classes.alignRight}>
                        {'$2,110,316.72'}
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Divider variant="middle" />
                </Grid>

                <Grid item xs={4}>
                    <Typography variant="body2" gutterBottom className={classes.alignLeft}>
                        Total Supply
                    </Typography>
                </Grid>

                <Grid item xs={8}>
                    <Typography variant="body2" gutterBottom className={classes.alignRight}>
                        {'$2,476,706.161 cUSD'}
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Divider variant="middle" />
                </Grid>

                <Grid item xs={4}>
                    <Typography variant="body2" gutterBottom className={classes.alignLeft}>
                        Holders
                    </Typography>
                </Grid>

                <Grid item xs={8}>
                    <Typography variant="body2" gutterBottom className={classes.alignRight}>
                        {'6,148 '} addresses
                    </Typography>
                </Grid>
            </Grid>
        </Card>
    );
};

export default TokenOverview;
