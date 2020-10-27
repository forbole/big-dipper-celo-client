import { Select, InputLabel, Theme, createStyles, makeStyles, Button, Dialog, TextField } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import React, { useEffect, useLayoutEffect } from "react";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import ControlButtons from '../../ControlButtons'
import UnlockGoldConfirm from './UnlockGoldConfirm'
import { GET_ACCOUNT_DETAILS } from '../../../query/Account';
import { useQuery } from "@apollo/client";
import ComponentLoader from '../../../misc/ComponentLoader';
import NotAvailable from '../../../misc/NotAvailable'
import ErrorMessage from '../../../misc/ErrorMessage';
import Ledger from '../../Ledger'
import CircularProgress from '@material-ui/core/CircularProgress';
import BigNumber from 'bignumber.js';
import { LedgerFormControl } from '../../LedgerDialog'


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            justifyContent: "center",
        },
        title: {
            display: "block",
            textAlign: "center",
            paddingTop: "0.5rem",
        },

        dialogTitle: {
            padding: "1rem 1rem 1rem 1rem",
        },

        dialogContent: {
            display: "flex",
        },
        divider: {
            backgroundColor: "rgba(232, 232, 232, 1)",
        },

        dialog: {
            paddingBottom: '1rem'
        },


        item: {
            justifyContent: "center",
        },

        wrapText: {
            wordWrap: 'break-word',
            wordBreak: 'break-all'

        },

        centerContent: {
            display: "flex",
            justifyContent: "center",
        },


        select: {
            justifyContent: "center",
            border: "solid 1px rgba(153, 153, 153, 1)",
            borderWidth: "0.09rem",
            borderRadius: 4,
        },

        leftPadding: {
            paddingLeft: "1rem",
        },

        alignLeft: {
            display: "flex",
            overflow: "auto",
            paddingTop: "0.5rem",
            paddingBottom: "0.2rem",
        },
        alignRight: {
            display: "block",
            float: "right",
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
        },

        bottomPadding: {
            paddingBottom: "1rem"
        },

        accountAddress: {
            paddingBottom: "1rem"
        },

        disabledAccountAddress: {
            paddingBottom: "1rem",
            color: "rgba(192,192,192, 1)"
        },

        centerButtons: {
            justifyContent: "center",
            flexWrap: "wrap",
            padding: "0.1rem",
            textTransform: "none",
        },
        buttonUnlock: {
            justifyContent: "center",
            [theme.breakpoints.down('xs')]: {
                width: "7.5rem",
            },
            width: "9.5rem",
            padding: "0.5rem",
            textTransform: "none",
            border: "solid thin",
            margin: "0.3rem 0 0.2rem 1rem",
        },

        outlinedInput: {
            borderRadius: 5,
            border: "solid 1px rgba(153, 153, 153, 1)",
            padding: "0.25rem 1rem",
        },

        unlockGold: {
            justifyContent: "center",
        },

        errorMessage: {
            color: "red",
            textAlign: "center",
            paddingBottom: "1rem"
        },

        circularProgress: {
            textAlign: "center",
            paddingBottom: "1rem"
        }
    })
);



type UnlockGoldProps = { isLoading?: boolean, maxUnlock: string };


const UnlockGold = ({ isLoading, maxUnlock }: UnlockGoldProps) => {

    const classes = useStyles();
    const [currentUser, setCurrentUser] = React.useState('');


    // const handleClose = () => {
    //     setOpen(false);
    // };

    // const confirmUnlock = async () => {
    //     setOpen(false);
    //     setNextDialog(true)
    //     try {
    //         const from = currentUser
    //         const unlockObject = { amount, from }
    //         await Ledger.unlockCelo(unlockObject)
    //     }
    //     catch (e) {
    //         setLedgerError(true)
    //         setLedgerLoading(true)
    //         setLedgerErrorMessage(Ledger.checkLedgerErrors(e.message))

    //     }
    // };


    useEffect(() => {
        let localUser = localStorage.getItem('currentUserAddress');
        //@ts-ignore
        setCurrentUser(localUser)

    });


    return (
        <>
            <DialogContent >
                <Grid container spacing={1} >
                    <DialogContentText id="ledger-unlock-gold-content" className={classes.dialog}>
                        <Grid container className={classes.dialogContent}>
                            <Grid item xs={12}>
                                <Typography
                                    variant="body2"
                                    noWrap
                                    className={classes.alignLeft}
                                    align="left"
                                >
                                    Account
                </Typography>
                            </Grid>
                            <Grid item xs={12} >
                                <Typography
                                    variant="body2"
                                    noWrap
                                    color="textPrimary"
                                    className={isLoading ? classes.disabledAccountAddress : classes.accountAddress}
                                >
                                    {currentUser}
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography
                                    variant="body2"
                                    noWrap
                                    className={classes.alignLeft}
                                    align="left"
                                >
                                    Unlock amount
                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <LedgerFormControl action="unlock" />

                            </Grid>
                            <Grid item xs={12} className={classes.bottomPadding}>
                                < Typography
                                    variant="body2"
                                    noWrap
                                    className={classes.alignRight}
                                >
                                    Max  {new BigNumber(maxUnlock / process.env.CELO).toFormat(2)} CELO
                                </Typography>

                            </Grid>
                        </Grid>
                    </DialogContentText>
                </Grid>
            </DialogContent>
        </>

    );

};

export default UnlockGold