import { Select, InputLabel, Dialog, IconButton, Button, createStyles } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import React, { useEffect, useLayoutEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import ControlButtons from '../../ControlButtons'
import TextField from '@material-ui/core/TextField';
import LockGoldConfirm from './LockGoldConfirm'
import { GET_ACCOUNT_DETAILS } from '../../../query/Account';
import { useQuery } from "@apollo/client";
import ComponentLoader from '../../../misc/ComponentLoader';
import NotAvailable from '../../../misc/NotAvailable'
import ErrorMessage from '../../../misc/ErrorMessage';
import Ledger from '../../Ledger'
import Login from '../../Login'
import CircularProgress from '@material-ui/core/CircularProgress';
import BigNumber from "bignumber.js";
import LedgerDialog from '../../LedgerDialog'
import { LedgerFormControl } from '../../LedgerDialog'


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        dialogContent: {
            display: "flex",
        },

        dialog: {
            paddingBottom: '1rem'
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

        accountAddress: {
            paddingBottom: "1rem"
        },

        disabledAccountAddress: {
            paddingBottom: "1rem",
            color: "rgba(192,192,192, 1)"
        },


    })
);

type LockGoldProps = { isLoading?: boolean, maxLock?: string };


const LockGold = ({ isLoading, maxLock }: LockGoldProps) => {

    const classes = useStyles();
    const [currentUser, setCurrentUser] = React.useState('');

    useEffect(() => {
        let localUser = localStorage.getItem('currentUserAddress');
        //@ts-ignore
        setCurrentUser(localUser)
    });


    return (
        <>
            <DialogContent >
                <Grid container spacing={1} >
                    <DialogContentText id="ledger-lock-gold" className={classes.dialog}>
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
                                    Lock amount
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <LedgerFormControl action="lock" />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography
                                    variant="body2"
                                    noWrap
                                    className={classes.alignRight}
                                >
                                    Max {new BigNumber(maxLock / process.env.CELO).toFormat(2)} CELO
                                </Typography>
                            </Grid>

                        </Grid>
                    </DialogContentText>
                </Grid>
            </DialogContent>

        </>
    );
}

export default LockGold

