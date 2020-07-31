import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import Alert from "@material-ui/lab/Alert";
import { IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "0 0 1rem 0",
      display: "inline-flex",
      borderRadius: 5,
      paddingBottom: "0",
    },

    card: {
      display: "inline-flex",
    },

    address: {
      overflowWrap: "break-word",
      padding: "0rem",
      margin: "-0.5rem 0rem",
    },

    alertMessage: {
      background: "#3AD39E",
      color: "rgba(61, 66, 71, 1)",
    },
  })
);




const AddressCard = (props: any) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);


  const copyText = () => {
    let rawInputForm = document.getElementById("accountAddress") as HTMLInputElement
    return navigator.clipboard
      .writeText(rawInputForm.innerHTML)
      .then(() => setOpen(true))
      .catch((err) => {
        console.log("Something went wrong", err);
      })
  };

  const closeAlert = (event?: React.SyntheticEvent, reason?: string) => {
    setOpen(false);
  };


  return (
    <>
      <Card>
        <CardContent>
          <Grid container spacing={1} className={classes.card}>
            <Grid item xs={10} sm={10} md={10}>
              <Typography variant="body1" gutterBottom>
                Address
            </Typography>
            </Grid>
            <Grid item xs={1}>
              <IconButton
                aria-label="copy"
                size="small"
                onClick={copyText}
              >
                <img src="/images/copy.svg" />
              </IconButton>

            </Grid>
            <Grid item xs={1}>
              <IconButton
                aria-label="qrCode"
                size="small"
              >
                <img src="/images/qr-code.svg" />
              </IconButton>

            </Grid>
            <Grid item xs={12} className={classes.address} >
              <div >
                <Typography variant="body2" align="left" id="accountAddress" >
                  {props.address}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </CardContent>

      </Card>
      <Snackbar open={open} autoHideDuration={6000} onClose={closeAlert}>
        <Alert
          onClose={closeAlert}
          severity="success"
          // variant="outlined"
          className={classes.alertMessage}
        >
          <Typography variant="body1">Copied!</Typography>
        </Alert>
      </Snackbar>
    </>
  );
}

export default AddressCard