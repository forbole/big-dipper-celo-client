import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import { Select, InputLabel } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import Container from "@material-ui/core/Container";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";
import ListSubheader from "@material-ui/core/ListSubheader";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";
import Link from "../Link";
import Card from "@material-ui/core/Card";
import Paper from '@material-ui/core/Paper';


import Hidden from "@material-ui/core/Hidden";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormHelperText from "@material-ui/core/FormHelperText";
import LedgerButtons from "./LedgerButtons";

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ControlButtons from './ControlButtons'



const useStyles = makeStyles({
    root: {
        justifyContent: "center",
    },
    title: {
        display: "block",
        textAlign: "center",
        paddingTop: "0.5rem",
    },
    leftInline: {
        display: "flex",
        overflow: "auto",
        padding: "0 0 0 1rem",
    },

    bottomPadding: {
        overflow: "auto",
        padding: "1%",
    },

    select: {
        justifyContent: "center",
        border: "solid rgba(255, 255, 255, 0.6) ",
        borderWidth: "0.09rem",
        borderRadius: 4,
    },

    depositSelect: {
        justifyContent: "center",
        border: "solid rgba(255, 255, 255, 0.6) ",
        borderWidth: "0.09rem",
        borderRadius: 4,
        paddingLeft: "0.5rem",
        //minWidth: "18.4375rem",
    },

    formControl: {
        paddingBottom: "1rem",
        //width: "18.4375rem" || "24rem",
        overflow: "hidden",
        textOverflow: "clip",
        display: "flex",
    },

    centerContent: {
        display: "flex",
        //margin: "1rem 0 -0.5rem 0",
        justifyContent: "center",
    },

    dialogRoot: {
        padding: "1rem",
    },

    dialogPadding: {
        padding: "1rem",
    },

    dialogTitle: {
        padding: "1rem 1rem 0rem 1rem",
    },

    dialogContent: {
        display: "block",
    },

    inputLabel: {
        fontSize: "15px",
        paddingLeft: "1rem",
    },

    alignLeft: {
        display: "flex",
        overflow: "auto",
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
    },

    alignRight: {
        display: "block",
        float: "right",
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
    },

    alignRightPrice: {
        display: "block",
        float: "right",
        paddingRight: "1rem",
        marginTop: "-0.5rem",
    },

    button: {
        justifyContent: "center",
        minWidth: "8rem",
        marginBottom: "1rem",
    },

    box: {
        letterSpacing: "1px",
        padding: "1rem",
        display: "block",
        overflow: "hidden",
        whiteSpace: "nowrap",
    },
    chip: {
        display: "block",
        marginLeft: "1rem",
    },

    divider: {
        margin: "0.15rem 0rem",
        backgroundColor: "rgba(62, 67, 71, 1)",
    },

    searchbar: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        verticalAlign: "middle",
    },

    label: {
        height: "2rem",
        verticalAlign: "middle",
        padding: "0 1rem 1rem 0",
        fontSize: "12px",
    },
    container: {
        justifyContent: "center",
        padding: "0rem",
    },

    rightPadding: {
        paddingLeft: "1rem",
    },

    dialog: {
        paddingBottom: '1rem'
    },

    controlButtonLabel: {
        display: "flex",
        textTransform: "none",
        borderRadius: 4,
        justifyContent: "center",
        minHeight: "2.5rem",
        maxWidth: "8.4375rem",
        textAlign: "center",
    },

    proposalButtonLabel: {
        display: "flex",
        textTransform: "none",
        borderRadius: 4,
        justifyContent: "center",
        minHeight: "2.5rem",
        width: "18.44rem",
        textAlign: "center",
    },

    controlButton: {
        justifyContent: "center",
        flexWrap: "wrap",
        paddingTop: "2rem",
        textTransform: "none",
        borderRadius: 4,
        //minHeight: "2.5rem",
        width: "100%",
    },

    item: {
        justifyContent: "center",
        // check thiss textAlign: "-webkit-center",
    },

    icon: {
        fill: "rgba(255, 255, 255, 0.8)",
        paddingRight: "0.5rem",
        fontWeight: 400,
    },

    menu: {
        display: "block",
        width: "100%",
        overflow: "hidden",
    },

    iconButtonRight: {
        padding: "0",
        marginLeft: "0.5rem",
    },
    iconButtonLeft: {
        //padding: "0",
        marginRight: "0.5rem",
    },

    lockGoldMessage: {
        marginTop: "1rem",
        marginBottom: "-0.8rem",
    },

    alignCenter: {
        justifyContent: "center",
        paddingBottom: "2.5rem",
    },

    imgSuccess: {
        justifyContent: "center",
        paddingBottom: "1.25rem",
    },

    message: {
        margin: "0.5rem 0.5rem 0 0.5rem",
    },

    txHash: {
        overflowWrap: "anywhere",
        textAlign: "left",
    },

    hideOverflow: {
        paddingBottom: "1rem"
    },

    voteNoButton: {
        backgroundColor: "rgba(240, 65, 85, 1)",
        textTransform: "none",
        width: '100%',
        color: '#fff',
        fontWeight: 400,
    },
    voteYesButton: {
        backgroundColor: "rgba(58, 211, 158, 1)",
        textTransform: "none",
        width: '100%',
        color: '#fff',
        fontWeight: 400,
    },

    voteNoWithVetoButton: {
        backgroundColor: "rgba(250, 149, 30, 1)",
        textTransform: "none",
        width: '100%',
        color: '#fff',
        fontWeight: 400,

    },
    voteAbstainButton: {
        backgroundColor: "rgba(55, 148, 240, 1)",
        textTransform: "none",
        width: '100%',
        color: '#fff',
        fontWeight: 400,
    },

    paddingBottom: {
        paddingBottom: '1rem'
    },

    address: {
        overflow: 'hidden',

    },
    rootPaper: {
        //padding: '1rem'
    },

    wrapText: {
        wordWrap: 'break-word',

    }


});



const Vote = () => {
    let name = "Dan Stanley";
    let name_2 = "Andrea Colemans";

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="ledger-dialog-vote"
            // fullWidth
            maxWidth="xs"
        >
            <DialogTitle
                id="ledger-dialog-vote-title"
                className={classes.dialogTitle}
            >
                <Grid container className={classes.item}>
                    <Grid item xs={12}>
                        <Typography
                            variant="h6"
                            noWrap
                            className={classes.title}
                            color="textPrimary"
                        >
                            Vote
              </Typography>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent >
                <Grid container spacing={1}>
                    <DialogContentText id="ledger-vote" className={classes.dialog}>
                        <Grid container className={classes.dialogContent}>

                            {/* {DepositDropdown()}
                </Grid> */}

                            <Grid item xs={12} className={classes.message}>
                                <div >
                                    <Typography variant="body2" noWrap color="textPrimary" gutterBottom>
                                        Account
        </Typography>
                                    <Grid item xs={12} >
                                        <FormControl
                                            //fullWidth={true}
                                            size="medium"
                                            className={classes.formControl}
                                        >
                                            <Select
                                                defaultValue=""
                                                id="deposit-dropdown"
                                                color="secondary"
                                                className={classes.depositSelect}
                                                disableUnderline
                                                fullWidth={true}
                                                IconComponent={KeyboardArrowDownIcon}
                                                classes={{
                                                    icon: classes.icon,
                                                }}
                                            >
                                                <MenuItem value={name} className={classes.menu}>
                                                    <Typography variant="body2">{name}</Typography>
                                                    <Typography
                                                        variant="body2"
                                                        color="textSecondary"
                                                        //noWrap={false}
                                                        //className={classes.dropdownItem}
                                                        className={classes.address}
                                                    >
                                                        {"0xB177242c85d34cc72e1cc0301eb6f08770ED8a6B"}
                                                    </Typography>
                                                </MenuItem>

                                                <Divider variant="middle" className={classes.divider} />

                                                <MenuItem value={name_2} className={classes.menu}>
                                                    <Typography variant="body2">{name_2}</Typography>
                                                    <Typography variant="body2" color="textSecondary" gutterBottom>
                                                        {"0x456f41406B32c45D59E539e4BBA3D7898c3584dA"}
                                                    </Typography>
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </div>
                            </Grid>

                            <Grid item xs={12} className={classes.message}>
                                <Typography variant="body1" color="textPrimary" gutterBottom>
                                    You’re going to vote for
                  </Typography>
                                <Typography variant="body2" color="textPrimary" className={classes.paddingBottom}>
                                    Don’t Burn Deposits for Rejected Governance Proposals Unless Vetoed
                  </Typography>
                            </Grid>
                            <Grid item xs={12} className={classes.paddingBottom} >
                                <Button variant="contained" className={classes.voteYesButton}>
                                    Yes
</Button>
                            </Grid>
                            <Grid item xs={12} className={classes.paddingBottom} >
                                <Button variant="contained" className={classes.voteNoButton}>
                                    No
</Button>
                            </Grid>
                            <Grid item xs={12} className={classes.paddingBottom} >
                                <Button variant="contained" className={classes.voteNoWithVetoButton}>
                                    No With Veto
</Button>
                            </Grid>
                            <Grid item xs={12} >
                                <Button variant="contained" className={classes.voteAbstainButton}>
                                    Abstain
</Button>
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default Vote