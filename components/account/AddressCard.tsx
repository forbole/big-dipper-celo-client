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
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";


var QRCode = require('qrcode.react');

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

    dialog: {
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      display: "flex"
    },

    dialogTitle: {
      display: "flex",
      paddingBottom: "0rem"

    },

    item: {
      justifyContent: "center",
      display: "flex",
      alignContent: "center",
    },

    qrCode: {
      border: "solid #fff",
      borderWidth: "0.375rem"
    },

    closeDialog: {
      padding: "0",
      marginLeft: "0.5rem",
      float: "right",
    },

    icon: {
      "&:hover, &.Mui-focusVisible": { backgroundColor: "rgba(58, 211, 158, 0.5)" },
      padding: "0rem 0.5rem"
    }
  })
);

type AddressCardProps = { address: string };


const AddressCard = ({ address }: AddressCardProps) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openQR, setOpenQR] = React.useState(false);


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

  const showQR = () => {
    setOpenQR(true);
  };
  const closeQR = () => {
    setOpenQR(false);
  };

  const ShowQRCode = () => {
    return (
      <Dialog
        open={openQR}
        onClose={closeQR}
        aria-labelledby="qr-code-dialog"
        maxWidth="sm"
        className={classes.dialog}
      >
        <DialogTitle id="qr-code-title" className={classes.dialogTitle}>
          <Grid container >
            <Grid item xs={12}>
              <IconButton
                aria-label="Close"
                className={classes.closeDialog}
                onClick={closeQR}
              >
                <img src="/images/cross.svg" color="textPrimary" />
              </IconButton>
            </Grid>
            <Grid item xs={12} className={classes.item}>
              <Typography variant="h6" color="textPrimary">
                Scan Me!
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.item}>
              <Typography variant="caption" color="textSecondary" noWrap>
                {address}
              </Typography>

            </Grid>
          </Grid>
        </DialogTitle>

        <DialogContent >

          <DialogContentText id="qr-code"  >
            <Grid container spacing={1} >
              <Grid item xs={12} className={classes.item}  >
                <QRCode value={`${process.env.uriAccount}/${address}`} className={classes.qrCode} />
              </Grid>
            </Grid>
          </DialogContentText>

        </DialogContent>
      </Dialog >
    )
  }


  return (
    <>
      <Card>
        <CardContent>
          <Grid container spacing={1} className={classes.card}>
            <Grid item xs={2} md={1}>
              <Typography variant="body1" gutterBottom>
                Address
            </Typography>
            </Grid>
            <Grid item xs={3} sm={2}>
              <IconButton
                aria-label="copy"
                size="small"
                onClick={copyText}
                className={classes.icon}
              >
                <img src="/images/copy.svg" />
              </IconButton>
              <IconButton
                aria-label="qrCode"
                size="small"
                onClick={showQR}
                className={classes.icon}
              >
                <img src="/images/qr-code.svg" />
              </IconButton>
              <ShowQRCode />
            </Grid>

            <Grid item xs={12} className={classes.address} >
              <div >
                <Typography variant="body2" align="left" id="accountAddress" >
                  {address}
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
          className={classes.alertMessage}
        >
          <Typography variant="body1">Copied!</Typography>
        </Alert>
      </Snackbar>
    </>
  );
}

export default AddressCard