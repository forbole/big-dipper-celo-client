import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import { Select } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';



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

    dialogContent: {
        display: "block",
    },
    divider: {
        margin: "0.15rem 0rem",
        backgroundColor: "rgba(62, 67, 71, 1)",
    },

    dialog: {
        paddingBottom: '1rem'
    },
    controlButton: {
        justifyContent: "center",
        flexWrap: "wrap",
        paddingTop: "2rem",
        textTransform: "none",
        borderRadius: 4,
        width: "100%",
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
});



const ProposalVote = () => {
    let name = "Dan Stanley";
    let name_2 = "Andrea Colemans";

    const classes = useStyles();
    const [, setOpen] = React.useState(false);




    return (
        <>
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
        </>
    );
};

export default ProposalVote