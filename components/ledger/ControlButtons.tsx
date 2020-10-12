import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";


const useStyles = makeStyles({
    controlButton: {
        display: "flex",
        textTransform: "none",
        borderRadius: 4,
        justifyContent: "center",
        minHeight: "2.5rem",
        minWidth: "8.4375rem",
        textAlign: "center",
        '&:disabled': {
            color: "#000",
            backgroundColor: "rgba(167,227,208, 0.8)"
        }
    },

    root: {
        justifyContent: "center",
        textAlign: "center",
        padding: "0 1rem",
        display: "flex",
    },
    confirmButton: {
        color: "rgba(255, 255, 255, 1)"
    },


});

type ControlButtonsProps = { showRetry?: boolean, handleClick?: any, handleClose?: any, showDisabled?: boolean };


const ControlButtons = ({ showRetry, handleClick, handleClose }: ControlButtonsProps): JSX.Element => {
    const classes = useStyles();

    return (
        <Grid container spacing={1}>
            <Grid item xs={6} alignItems="center">
                <div className={classes.root}>
                    <Button
                        variant="outlined"
                        color="secondary"
                        className={classes.controlButton}
                        //fullWidth={true}
                        onClick={handleClose}
                    >
                        <Typography variant="body2" noWrap>
                            Cancel
                        </Typography>
                    </Button>
                </div>
            </Grid>
            <Grid item xs={6} className={classes.root}>
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.controlButton}
                    //fullWidth={true}
                    onClick={handleClick}
                    disabled={showDisabled}
                >
                    <Typography variant="body2" noWrap className={classes.confirmButton}>
                        {!showRetry ? "Confirm" : "Retry"}
                    </Typography>
                </Button>
            </Grid>
        </Grid>
    );
};

export default ControlButtons;
