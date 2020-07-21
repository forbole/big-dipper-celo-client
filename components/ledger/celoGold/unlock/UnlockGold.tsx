import { Select, InputLabel } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
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

    dialogTitle: {
        padding: "1rem 1rem 0rem 1rem",
    },

    dialogContent: {
        display: "flex",
    },
    divider: {
        backgroundColor: "rgba(62, 67, 71, 1)",
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
        border: "solid rgba(255, 255, 255, 0.6) ",
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
    }
});

const UnlockGoldDialog = () => {

    return (
        <FormControl variant="outlined" fullWidth size="small">
            <InputLabel htmlFor="unlock-gold-dialog" >
                <Typography
                    variant="body2"
                    color="textSecondary"
                >
                    Insert Amount
        </Typography>
            </InputLabel>
            <OutlinedInput
                id="unlock-gold-dialog"
                endAdornment={<InputAdornment position="end">cGLD</InputAdornment>}
                labelWidth={295}
            />
        </FormControl>
    );
}


const TokenDropdown = () => {
    const classes = useStyles();
    let name = "Michelle Clark";
    let name_2 = "Ada Adams";
    return (
        <FormControl fullWidth size="medium">
            <Select
                defaultValue=""
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


const UnlockGold = () => {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <DialogTitle id="ledger-unlock-gold-title" className={classes.dialogTitle}>
                <Grid container className={classes.item}>
                    <Grid item xs={12}>
                        <Typography variant="h6" color="textPrimary" noWrap className={classes.title}>
                            Unlock Celo Gold
              </Typography>
                    </Grid>
                </Grid>
            </DialogTitle>

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
                                    Unlock amount
                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <UnlockGoldDialog />
                            </Grid>
                            <Grid item xs={12} className={classes.bottomPadding}>
                                <Typography
                                    variant="body2"
                                    noWrap
                                    className={classes.alignRight}
                                >
                                    Max {"14.99217479 cGLD"}
                                </Typography>
                            </Grid>

                            <ControlButtons />

                        </Grid>
                    </DialogContentText>
                </Grid>
            </DialogContent>
        </>
    );
};

export default UnlockGold