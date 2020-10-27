import { IconButton } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import QRCode from 'qrcode.react';
import React from 'react';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            padding: '0 0 1rem 0',
            display: 'inline-flex',
            borderRadius: 5,
            paddingBottom: '0'
        },

        card: {
            display: 'inline-flex'
        },

        address: {
            overflowWrap: 'break-word',
            padding: '0rem',
            margin: '-0.5rem 0rem'
        },

        alertMessage: {
            background: '#3AD39E',
            color: 'rgba(61, 66, 71, 1)'
        },

        dialog: {
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            display: 'flex'
        },

        dialogTitle: {
            display: 'flex',
            paddingBottom: '0rem'
        },

        item: {
            justifyContent: 'center',
            display: 'flex',
            alignContent: 'center'
        },

        qrCode: {
            border: 'solid #fff',
            borderWidth: '0.375rem'
        },

        iconButtonRight: {
            padding: '0',
            marginLeft: '0.5rem',
            float: 'right'
        }
    })
);

type AddressCardProps = { address: string };

const AddressCard = ({ address }: AddressCardProps): JSX.Element => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [openQR, setOpenQR] = React.useState(false);

    const copyText = () => {
        const rawInputForm = document.getElementById('accountAddress') as HTMLInputElement;
        return navigator.clipboard
            .writeText(rawInputForm.innerHTML)
            .then(() => setOpen(true))
            .catch((err) => {
                console.log('Something went wrong', err);
            });
    };

    const closeAlert = () => {
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
                className={classes.dialog}>
                <DialogTitle id="qr-code-title" className={classes.dialogTitle}>
                    <Grid container>
                        <Grid item xs={12}>
                            <IconButton
                                aria-label="Close"
                                className={classes.iconButtonRight}
                                onClick={closeQR}>
                                <img src="/images/cross.svg" color="textPrimary" alt="Close" />
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

                <DialogContent>
                    <DialogContentText id="qr-code">
                        <Grid container spacing={1}>
                            <Grid item xs={12} className={classes.item}>
                                <QRCode
                                    value={`${process.env.uriAccount}/${address}`}
                                    className={classes.qrCode}
                                />
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        );
    };

    return (
        <>
            <Card>
                <CardContent>
                    <Grid container spacing={1} className={classes.card}>
                        <Grid item xs={10}>
                            <Typography variant="body1" gutterBottom>
                                Address
                            </Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <IconButton aria-label="Copy" size="small" onClick={copyText}>
                                <img src="/images/copy.svg" alt="Copy" />
                            </IconButton>
                        </Grid>
                        <Grid item xs={1}>
                            <IconButton aria-label="qrCode" size="small" onClick={showQR}>
                                <img src="/images/qr-code.svg" alt="Show QR" />
                            </IconButton>
                            <ShowQRCode />
                        </Grid>
                        <Grid item xs={12} className={classes.address}>
                            <div>
                                <Typography variant="body2" align="left" id="accountAddress">
                                    {address}
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <Snackbar open={open} autoHideDuration={6000} onClose={closeAlert}>
                <Alert onClose={closeAlert} severity="success" className={classes.alertMessage}>
                    <Typography variant="body1">Copied!</Typography>
                </Alert>
            </Snackbar>
        </>
    );
};

export default AddressCard;
