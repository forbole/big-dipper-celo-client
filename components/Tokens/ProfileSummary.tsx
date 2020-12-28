import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import NavLink from '../Utils/NavLink';

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

        contract: {
            overflowWrap: 'break-word',
            flexWrap: 'wrap',
            display: 'block',
            width: '15rem',
            textAlign: 'right'
        },

        contractAddress: {
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            flexWrap: 'wrap'
        },
        divider: {
            backgroundColor: 'rgba(232, 232, 232, 1)'
        }
    })
);

const ProfileSummary = (): JSX.Element => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography variant="body1" className={classes.box}>
                        Profile Summary
                    </Typography>
                    <Divider variant="middle" className={classes.divider} />
                </Grid>

                <Grid item xs={4}>
                    <Typography variant="body2" gutterBottom className={classes.alignLeft}>
                        Contract
                    </Typography>
                </Grid>

                <Grid item xs={8}>
                    <Typography
                        variant="body2"
                        gutterBottom
                        className={classes.alignRight}
                        noWrap={false}>
                        <NavLink
                            href="/"
                            name="0xa561131a1c8ac25925fb848bca45a74af61e5a38"
                            className={classes.contract}
                        />
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Divider variant="middle" />
                </Grid>

                <Grid item xs={7}>
                    <Typography variant="body2" gutterBottom className={classes.alignLeft}>
                        Decimals
                    </Typography>
                </Grid>

                <Grid item xs={5}>
                    <Typography variant="body2" gutterBottom className={classes.alignRight}>
                        {'16'}
                    </Typography>
                </Grid>
            </Grid>
        </Card>
    );
};

export default ProfileSummary;