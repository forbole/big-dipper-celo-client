import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import { Select, InputLabel } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ControlButtons from '../../ControlButtons'



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
    },

    formControl: {
        paddingBottom: "0.5rem",
        overflow: "hidden",
        textOverflow: "clip",
        display: "flex",
    },

    dialogTitle: {
        padding: "1rem 1rem 0rem 1rem",
    },

    dialogContent: {
        display: "flex",
    },

    divider: {
        margin: "0.15rem 0rem",
        backgroundColor: "rgba(62, 67, 71, 1)",
    },

    dialog: {
        paddingBottom: '1rem'
    },

    item: {
        justifyContent: "center",
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

    message: {
        margin: "0.5rem 0.5rem 0 0.5rem",
    },

    paddingBottom: {
        paddingBottom: '2rem'
    },

    address: {
        overflow: 'hidden',

    },
});



const Revoke = () => {
    let name = "Dan Stanley";
    let name_2 = "Andrea Colemans";

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);




    return (<>
        <DialogTitle
            id="ledger-dialog-validator-group-vote-title"
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
                        Revoke the vote
              </Typography>
                </Grid>
            </Grid>
        </DialogTitle>
        <DialogContent >
            <Grid container spacing={1}>
                <DialogContentText id="ledger-validator-group-vote" className={classes.dialog}>
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
                                                <Typography variant="body2" color="textPrimary" >{name}</Typography>
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
                                                <Typography variant="body2" color="textPrimary" >{name_2}</Typography>
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
                            <div >
                                <Typography variant="body2" noWrap color="textPrimary" gutterBottom>
                                    Validator Group
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
                                                <Typography variant="body2" color="textPrimary" >{name}</Typography>

                                            </MenuItem>

                                            <Divider variant="middle" className={classes.divider} />

                                            <MenuItem value={name_2} className={classes.menu}>
                                                <Typography variant="body2" color="textPrimary" >{name_2}</Typography>

                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </div>
                        </Grid>



                        <Grid item xs={12} className={classes.message}>
                            <div >
                                <Typography variant="body2" noWrap color="textPrimary" gutterBottom>
                                    Amount
        </Typography>
                                <Grid item xs={12} >
                                    <FormControl variant="outlined" fullWidth size="small" className={classes.formControl}>
                                        <InputLabel htmlFor="lock-gold-dialog" > {/*type="number" */}
                                            <Typography
                                                variant="body2"
                                                color="textSecondary"
                                            //lassName={classes.rightPadding}
                                            >
                                                Insert amount
        </Typography>
                                        </InputLabel>
                                        <OutlinedInput
                                            id="id-lock-gold-dialog"
                                            endAdornment={<InputAdornment position="end">CELO</InputAdornment>}
                                            labelWidth={295}
                                        />
                                    </FormControl>
                                    <Typography variant="body2" noWrap color="textSecondary" align="right" className={classes.paddingBottom}>
                                        Max 14.99217479 Locked CELO
        </Typography>
                                </Grid>
                            </div>
                        </Grid>


                        <Grid item xs={12} >
                            <ControlButtons />
                        </Grid>
                    </Grid>
                </DialogContentText>
            </Grid>
        </DialogContent>
    </>
    );
};

export default Revoke