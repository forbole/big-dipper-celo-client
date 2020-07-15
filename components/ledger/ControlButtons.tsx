import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";



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
    const [, setOpen] = React.useState(false);

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