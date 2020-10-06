import { Select, InputLabel, Dialog, IconButton, Button, createStyles } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import React, { useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import ControlButtons from '../../ControlButtons'
import TextField from '@material-ui/core/TextField';


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
            padding: "1rem 1rem 0rem 1rem",
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
            border: "solid 1px rgba(153, 153, 153, 1) ",
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

        centerButtons: {
            justifyContent: "center",
            flexWrap: "wrap",
            padding: "0.1rem",
            textTransform: "none",
        },
        buttonLock: {
            justifyContent: "center",
            [theme.breakpoints.down('xs')]: {
                width: "7.5rem",
            },
            width: "9.5rem",
            padding: "0.5rem",
            textTransform: "none",
            border: "solid thin",
            margin: "0.3rem 1rem 0.2rem 0",
        },

        outlinedInput: {
            borderRadius: 5,
            border: "solid 1px rgba(153, 153, 153, 1)",
            padding: "0.25rem 1rem",
        },

        lockGold: {
            justifyContent: "center",
        },

    })
);

const LockGoldDialog = () => {
    const classes = useStyles();

    return (
        <FormControl variant="outlined" fullWidth size="small">
            <TextField id="lock-gold-dialog" label=""
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">CELO</InputAdornment>
                    ),
                    disableUnderline: true
                }}
                defaultValue="0"
                className={classes.outlinedInput} />

        </FormControl>
    );
}


const TokenDropdown = () => {
    const classes = useStyles();
    let name = "Michelle Clark";
    let name_2 = "Ada Adams";
    return (
        <FormControl fullWidth={true} size="medium">
            <Select
                defaultValue=""
                id="grouped-select"
                color="primary"
                className={classes.select}
                disableUnderline={true}
                fullWidth={true}

            >
                <ListSubheader>Accounts:</ListSubheader>
                <Divider className={classes.divider} />

                <ListSubheader></ListSubheader>
                <MenuItem value={1}>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        className={classes.leftPadding}
                    >
                        {name}
                    </Typography>
                </MenuItem>

                <Divider variant="middle" className={classes.divider} />

                <ListSubheader></ListSubheader>

                <MenuItem value={2}>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        className={classes.leftPadding}
                    >
                        {name_2}
                    </Typography>
                </MenuItem>
            </Select>
        </FormControl>
    );
}


const LockGold = () => {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState('' || null);

    useEffect(() => {
        let localUser = localStorage.getItem('currentUserAddress');
        return () => {
            // @ts-ignore
            setCurrentUser(localUser)
        };
    });

    const handleClose = () => {
        setOpen(false);
    };

    const handleLock = () => {
        setOpen(true);
    };

    return (
        <>
            <Grid container spacing={2} className={classes.lockGold} >
                <Grid item xs={6} className={classes.centerContent} >
                    <div className={classes.centerButtons}>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleLock}
                            className={classes.buttonLock}
                        >
                            <Typography variant="body1">Lock CELO</Typography>
                        </Button>
                    </div>
                </Grid>
            </Grid>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="ledger-dialog"
                //fullWidth
                maxWidth="sm"
            >
                <DialogTitle id="ledger-lock-gold-title" className={classes.dialogTitle}>
                    <Grid container className={classes.item}>
                        <Grid item xs={12}>
                            <Typography variant="h6" color="textPrimary" noWrap className={classes.title}>
                                Lock CELO
              </Typography>
                        </Grid>
                    </Grid>
                </DialogTitle>

                <DialogContent >
                    <Grid container spacing={1} >
                        <DialogContentText id="ledger-lock-gold-content" className={classes.dialog}>
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
                                <Grid item xs={12} className={classes.bottomPadding}>
                                    <TokenDropdown />
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
                                    <LockGoldDialog />
                                </Grid>
                                <Grid item xs={12} className={classes.bottomPadding}>
                                    <Typography
                                        variant="body2"
                                        noWrap
                                        className={classes.alignRight}
                                    >
                                        Max {"14.99217479 CELO"}
                                    </Typography>
                                </Grid>

                                <ControlButtons />

                            </Grid>
                        </DialogContentText>
                    </Grid>
                </DialogContent>
            </Dialog>

        </>
    );
};

export default LockGold