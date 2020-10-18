import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import NavLink from '../../../NavLink';

const useStyles = makeStyles({
    root: {
        justifyContent: 'center'
    },

    item: {
        justifyContent: 'center'
    },

    controlButton: {
        justifyContent: "center",
        flexWrap: "wrap",
        paddingTop: "3rem",
        textTransform: "none",
        borderRadius: 4,
        width: "100%",
    },
    controlButtonLabel: {
        display: 'flex',
        textTransform: 'none',
        borderRadius: 4,
        justifyContent: 'center',
        minHeight: '2.5rem',
        textAlign: 'center'
    },

    icon: {
        paddingBottom: "1rem",
        paddingTop: "3.5rem"
    },

    paddingBottom: {
        paddingBottom: "1rem"
    },
    
    dialogContent:{
        padding: "4.2rem"
    }
});

type UnlockGoldSuccessProps = { isOpen: boolean };


const UnlockGoldSuccess = ({ isOpen }: UnlockGoldSuccessProps): JSX.Element => {

    const classes = useStyles();
    const [open, setOpen] = React.useState(isOpen);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <DialogContent>
                <Grid container spacing={1} className={classes.root}>
                    <DialogContentText id="ledger-validator-group-vote">
                        <Grid container className={classes.item}>
                            <Grid item xs={12} alignItems="center" className={classes.icon}>
                                <Typography noWrap align="center">
                                    <img src="/images/success-icon.svg" alt="Success" />
                                </Typography>
                            </Grid>
                            <Grid item xs={12} alignItems="center">
                                <Typography
                                    variant="body2"
                                    noWrap
                                    align="center"
                                    color="textPrimary">
                                    Unlocked Successfully
                                </Typography>
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                md={10}
                                className={classes.controlButton}
                                alignItems="center">
                                <NavLink
                                    href="/transactions"
                                    name={
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            className={classes.controlButtonLabel}
                                            fullWidth={true}
                                            onClick={handleClose}>
                                            <Typography variant="body2" noWrap>
                                                View Transactions
                                            </Typography>
                                        </Button>
                                    }
                                />
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </Grid>
            </DialogContent>
        </>
    );
};

export default UnlockGoldSuccess;
