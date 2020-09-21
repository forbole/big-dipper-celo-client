import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import ControlButtons from "../../ControlButtons"
import { Select, InputLabel } from "@material-ui/core";


const useStyles = makeStyles({
    root: {
        justifyContent: "center",
    },
    title: {
        display: "block",
        textAlign: "center",
        paddingTop: "0.5rem",
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
        //width: "18.4375rem",
        overflow: "hidden",
        textOverflow: "clip",
        display: "flex",
    },
    dialogTitle: {
        padding: "1rem 1rem 0rem 1rem",
    },

    divider: {
        margin: "0.15rem 0rem",
        backgroundColor: "rgba(232, 232, 232, 1)",
    },

    item: {
        justifyContent: "center",
    },

    menu: {
        display: "block",
        width: "100%",
        overflow: "hidden",
    },
    message: {
        margin: "0.5rem 0.5rem 0.5rem 0",
    },

    paddingBottom: {
        paddingBottom: '1rem'
    },

    label: {
        paddingBottom: "0.2rem",
    }


});

const DepositDropdown = () => {
    const classes = useStyles();
    let name = "Dan Stanley";
    let name_2 = "Andrea Colemans";
    return (
        <div>
            <Typography variant="body2" noWrap color="textPrimary" className={classes.label}>
                Account
        </Typography>
            <FormControl
                //fullWidth={true}
                size="medium"
                className={classes.formControl}
            >
                <Select
                    defaultValue=""
                    id="deposit-dropdown"
                    color="primary"
                    className={classes.depositSelect}
                    disableUnderline
                //fullWidth={true}
                >
                    <MenuItem value={name} className={classes.menu}>
                        <Typography variant="body2">{name}</Typography>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            noWrap={false}
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

            <div>
                <Typography variant="body2" noWrap color="textPrimary" className={classes.label}>
                    Amount
        </Typography>
                <FormControl
                    variant="outlined"
                    fullWidth
                    size="small"
                    className={classes.formControl}
                >
                    <InputLabel htmlFor="proposal-deposit-label" >
                        <Typography
                            variant="body2"
                            color="textSecondary"
                        >
                            Insert amount
        </Typography>
                    </InputLabel>
                    <OutlinedInput
                        id="id-deposit-dialog"
                    // endAdornment={<InputAdornment position="end">CELO</InputAdornment>}
                    />
                </FormControl>
            </div>
        </div>
    );
}


const Deposit = () => {
    const classes = useStyles();

    return (
        <>
            <DialogTitle
                id="ledger-proposal-deposit-title"
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
                            Deposit
              </Typography>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent >
                <Grid container spacing={1}>
                    <DialogContentText id="ledger-proposal-deposit">
                        <Grid container>
                            <Grid item xs={12} className={classes.message}>
                                <Typography variant="body2" color="textPrimary" gutterBottom>
                                    Deposit amount will be returned to your account after the
                                    proposal active period is finished.
                  </Typography>
                            </Grid>
                            <Grid item xs={12} className={classes.paddingBottom}>
                                <DepositDropdown />
                            </Grid>
                            <Grid item xs={12} className={classes.paddingBottom}>
                                <ControlButtons />
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </Grid>
            </DialogContent>
        </>
    );
};

export default Deposit