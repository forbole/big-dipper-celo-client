import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
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


const useStyles = makeStyles({
    controlButtonLabel: {
        display: "flex",
        textTransform: "none",
        borderRadius: 4,
        justifyContent: "center",
        minHeight: "2.5rem",
        maxWidth: "8.4375rem",
        textAlign: "center",
    },


    root: {
        justifyContent: "center",
    },

});


const ControlButtons = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Grid container spacing={1} className={classes.root}>
            <Grid item xs={6} >
                <Button
                    variant="outlined"
                    color="secondary"
                    className={classes.controlButtonLabel}
                    fullWidth={true}
                    onClick={handleClose}
                >
                    <Typography variant="body2" noWrap>
                        Cancel
            </Typography>
                </Button>
                {/* </div> */}
            </Grid>
            <Grid item xs={6}>
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.controlButtonLabel}
                    fullWidth={true}
                    onClick={handleClose}
                >
                    <Typography variant="body2" noWrap>
                        Confirm
            </Typography>
                </Button>
            </Grid>
        </Grid>
    );
};

export default ControlButtons