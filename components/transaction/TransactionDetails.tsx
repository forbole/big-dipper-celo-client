import { useQuery } from '@apollo/client';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import moment from 'moment';
import React from 'react';

import Chips from '../Chips';
import ComponentLoader from '../misc/ComponentLoader';
import ErrorMessage from '../misc/ErrorMessage';
import NotAvailable from '../misc/NotAvailable';
import NavLink from '../NavLink';
import { GET_TX_DETAILS } from '../query/Transaction';

const useStyles = makeStyles(() => {
    return {
        root: {
            width: '100%',
            borderRadius: 5,
            wordWrap: 'break-word',
            margin: 'none'
        },
        inline: {
            paddingLeft: 0
        },

        item: {
            padding: '0 0 1rem 0.5rem'
        },
        divider: {
            margin: '0.5rem 0 0 0',
            backgroundColor: 'rgba(232, 232, 232, 1)'
        },
        inputLabel: {
            wordWrap: 'break-word',
            padding: '0.5rem',
            fontSize: '0.75rem',
            backgroundColor: 'rgba(246, 247, 249, 1)'
        },
        alignRight: {
            display: 'inline-flex',
            float: 'right',
            paddingRight: '1rem'
        },
        alignLeft: {
            display: 'flex',
            float: 'left',
            paddingRight: '1rem'
        },

        MuiFilledInputInput: {
            padding: '0rem',
            minHeight: '3rem',
            maxHeight: '6rem'
        },

        hex: {
            borderRadius: 5,
            backgroundColor: 'rgba(255, 255, 255, 1)',
            border: 'solid 0.5px rgba(121, 121, 121, 0.8)',
            padding: '0.1rem',
            fontSize: '0.7rem',
            width: '3rem',
            height: '1rem',
            color: 'rgba(121, 121, 121, 1)',
            marginRight: '1rem',
            '&:hover': { backgroundColor: 'rgba(58, 211, 158, 0.5)' },
            '&:focus': { backgroundColor: 'rgba(58, 211, 158, 0.5)' }
        },

        uft8: {
            borderRadius: 4,
            backgroundColor: 'rgba(255, 255, 255, 1)',
            opacity: 5,
            border: 'solid 0.5px rgba(121, 121, 121, 0.8)',
            //borderWidth: "0.5px",
            //padding: "0.1rem",
            fontSize: '0.6rem',
            width: '3.2rem',
            height: '1rem',
            color: 'rgba(121, 121, 121, 1)',
            '&:hover': { backgroundColor: 'rgba(58, 211, 158, 0.5)' },
            '&:focus': { backgroundColor: 'rgba(58, 211, 158, 0.5)' }
        },
        alertMessage: {
            background: '#3AD39E'
        },
        copyButton: {
            float: 'right',
            paddingRight: '1rem'
        }
    };
});

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

type TxDetailsProps = { hash: string };

const TransactionDetails = ({ hash }: TxDetailsProps): JSX.Element => {
    const classes = useStyles();

    const { loading, error, data } = useQuery(GET_TX_DETAILS, {
        variables: { hash }
    });
    const [open, setOpen] = React.useState(false);

    const inputValue =
        data && data.transaction && data.transaction.input ? data.transaction.input : null;

    const copyText = () => {
        const rawInputForm = document.getElementById('rawInputForm') as HTMLInputElement;
        return navigator.clipboard
            .writeText(rawInputForm.value)
            .then(() => setOpen(true))
            .catch((err) => {
                console.log('Something went wrong', err);
            });
    };

    const closeAlert = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    function asciiToHex(str: string) {
        const arr1 = [];
        for (let n = 0, l = str.length; n < l; n++) {
            const hex = Number(str.charCodeAt(n)).toString(16);
            arr1.push(hex);
        }
        return arr1.join('').toString();
    }

    const handleClickHex = () => {
        const rawInputForm = document.getElementById('rawInputForm') as HTMLInputElement;
        rawInputForm.value = asciiToHex(inputValue);
        return rawInputForm.value;
    };

    const handleClickUTF8 = () => {
        const rawInputForm = document.getElementById('rawInputForm') as HTMLInputElement;
        rawInputForm.value = inputValue;
        return rawInputForm.value;
    };

    if (loading) return <ComponentLoader />;
    if (error) return <ErrorMessage message={error.message} />;
    return (
        <Card className={classes.root}>
            <CardContent>
                <Grid container spacing={2} className={classes.item}>
                    <Grid item xs={12}>
                        <Typography color="textPrimary" variant="subtitle1" paragraph>
                            Transaction Details
                        </Typography>
                    </Grid>
                    <Divider />
                    <Grid item xs={12} className={classes.item}>
                        <Typography variant="body2">Hash</Typography>
                        {data.transaction && data.transaction.hash ? (
                            <Typography variant="body2">{data.transaction.hash}</Typography>
                        ) : (
                            <NotAvailable variant="body2" />
                        )}
                        <Divider variant="middle" className={classes.divider} />
                    </Grid>

                    <Grid item xs={12} className={classes.item}>
                        <Typography variant="body2">Time</Typography>
                        <Typography variant="body2">
                            {data && data.transaction && data.transaction.timestamp ? (
                                new Date(parseInt(data.transaction.timestamp) * 1000).toUTCString()
                            ) : (
                                <NotAvailable variant="body2" />
                            )}
                            (
                            {data && data.transaction && data.transaction.timestamp
                                ? moment
                                      .unix(data.transaction.timestamp)
                                      .format('Do MMMM YYYY, h:mm:ss a')
                                : null}
                            )
                        </Typography>
                        <Divider variant="middle" className={classes.divider} />
                    </Grid>

                    <Grid item xs={12} className={classes.item}>
                        <Typography variant="body2">Tx Type</Typography>
                        {data.transaction && data.transaction.type ? (
                            <Typography variant="body2">
                                {data.transaction.type.charAt(0).toUpperCase() +
                                    data.transaction.type.slice(1)}
                            </Typography>
                        ) : (
                            <NotAvailable variant="body2" />
                        )}
                        <Divider variant="middle" className={classes.divider} />
                    </Grid>

                    <Grid item xs={12} className={classes.item}>
                        <Typography variant="body2" gutterBottom>
                            Status
                        </Typography>
                        <Typography variant="body2">
                            {data.transaction && data.transaction.pending ? (
                                <Chips actionResult="Pending" />
                            ) : (
                                <Chips actionResult="Success" />
                            )}
                        </Typography>
                        <Divider variant="middle" className={classes.divider} />
                    </Grid>

                    <Grid item xs={12} className={classes.item}>
                        <Typography variant="body2">From</Typography>

                        {data.transaction && data.transaction.from ? (
                            <NavLink
                                href={`/account/${data.transaction.from.address}`}
                                name={
                                    <Typography variant="body2">
                                        {' '}
                                        {data.transaction.from.address}
                                    </Typography>
                                }
                            />
                        ) : (
                            <NotAvailable variant="body2" />
                        )}

                        <Divider variant="middle" className={classes.divider} />
                    </Grid>

                    <Grid item xs={12} className={classes.item}>
                        <Typography variant="body2">To</Typography>
                        {data.transaction && data.transaction.to ? (
                            <NavLink
                                href={`/account/${data.transaction.to.address}`}
                                name={
                                    <Typography variant="body2">
                                        {' '}
                                        {data.transaction.to.address}
                                    </Typography>
                                }
                            />
                        ) : (
                            <NotAvailable variant="body2" />
                        )}

                        <Divider variant="middle" className={classes.divider} />
                    </Grid>

                    <Grid item xs={12} className={classes.item}>
                        <Typography variant="body2">Value</Typography>

                        {data.transaction && data.transaction.value ? (
                            <Typography variant="body2">{data.transaction.value}</Typography>
                        ) : (
                            <NotAvailable variant="body2" />
                        )}
                        <Divider variant="middle" className={classes.divider} />
                    </Grid>

                    <Grid item xs={12} className={classes.item}>
                        <Typography variant="body2">Block Height</Typography>
                        {data.transaction && data.transaction.blockNumber ? (
                            <NavLink
                                href={`/block/${data.transaction.blockNumber}`}
                                name={
                                    <Typography variant="body2">
                                        {data.transaction.blockNumber}
                                    </Typography>
                                }
                            />
                        ) : (
                            <NotAvailable variant="body2" />
                        )}
                        <Divider variant="middle" className={classes.divider} />
                    </Grid>

                    <Grid item xs={12} className={classes.item}>
                        <Typography variant="body2">Nonce</Typography>
                        {data.transaction && data.transaction.nonce ? (
                            <Typography variant="body2">{data.transaction.nonce}</Typography>
                        ) : (
                            <NotAvailable variant="body2" />
                        )}
                        <Divider variant="middle" className={classes.divider} />
                    </Grid>

                    <Grid item xs={12} className={classes.item}>
                        <Typography variant="body2">Transaction Fee</Typography>
                        {data.transaction && data.transaction.feeCurrency ? (
                            <Typography variant="body2">
                                {data.transaction.feeCurrency} + CELO
                            </Typography>
                        ) : (
                            <NotAvailable variant="body2" />
                        )}
                        <Divider variant="middle" className={classes.divider} />
                    </Grid>

                    <Grid item xs={12} className={classes.item}>
                        <Typography variant="body2">Fee Receipient</Typography>
                        {data.transaction && data.transaction.gatewayFeeRecipient ? (
                            <Typography variant="body2">
                                {data.transaction.gatewayFeeRecipient}
                            </Typography>
                        ) : (
                            <NotAvailable variant="body2" />
                        )}
                        <Divider variant="middle" className={classes.divider} />
                    </Grid>

                    <Grid item xs={12} className={classes.item}>
                        <Typography variant="body2">Gate Fee</Typography>
                        {data.transaction && data.transaction.gatewayFee ? (
                            <Typography variant="body2">{data.transaction.gatewayFee}</Typography>
                        ) : (
                            <NotAvailable variant="body2" />
                        )}

                        <Divider variant="middle" className={classes.divider} />
                    </Grid>

                    <Grid item xs={12} className={classes.item}>
                        <Typography variant="body2">Transaction Speed</Typography>
                        {data.transaction && data.transaction.speed ? (
                            <Typography variant="body2">{data.transaction.speed}</Typography>
                        ) : (
                            <NotAvailable variant="body2" />
                        )}
                        <Divider variant="middle" className={classes.divider} />
                    </Grid>
                    {data && data.transaction && data.transaction.input ? (
                        <>
                            {' '}
                            <Grid item xs={3} md={1} className={classes.item}>
                                <Typography variant="body2">Raw Input</Typography>
                            </Grid>
                            <Grid item xs={2} md={6} className={classes.alignRight}>
                                <Chip
                                    label="Hex"
                                    size="small"
                                    className={classes.hex}
                                    onClick={handleClickHex}
                                />

                                <Chip
                                    label="UTF-8"
                                    size="small"
                                    className={classes.uft8}
                                    onClick={handleClickUTF8}
                                />
                            </Grid>
                            <Grid item xs={4} md={5}>
                                <IconButton
                                    aria-label="copy"
                                    size="small"
                                    className={classes.copyButton}
                                    onClick={copyText}>
                                    <img src="/images/copy.svg" alt="Copy" />
                                </IconButton>
                            </Grid>
                            <Grid item xs={12} className={classes.alignLeft}>
                                <FormControl fullWidth variant="filled" size="small" margin="dense">
                                    <FilledInput
                                        className={classes.inputLabel}
                                        id="rawInputForm"
                                        type="text"
                                        value={asciiToHex(data.transaction.input)}
                                        disableUnderline={true}
                                        readOnly
                                        style={{ padding: '0.7rem' }}
                                        multiline
                                    />
                                </FormControl>
                                <Divider variant="middle" className={classes.divider} />
                            </Grid>{' '}
                        </>
                    ) : null}

                    <Grid item xs={12} className={classes.item}>
                        <Typography variant="body2">Gas Used</Typography>
                        {data.transaction && data.transaction.gas ? (
                            <Typography variant="body2">{data.transaction.gas}</Typography>
                        ) : (
                            <NotAvailable variant="body2" />
                        )}
                        <Divider variant="middle" className={classes.divider} />
                    </Grid>

                    <Grid item xs={12} className={classes.item}>
                        <Typography variant="body2">Gas Limit</Typography>
                        {data.transaction && data.transaction.gasLimit ? (
                            <Typography variant="body2">{data.transaction.gasLimit}</Typography>
                        ) : (
                            <NotAvailable variant="body2" />
                        )}
                    </Grid>
                </Grid>
            </CardContent>
            <Snackbar open={open} autoHideDuration={6000} onClose={closeAlert}>
                <Alert
                    onClose={closeAlert}
                    severity="success"
                    // variant="outlined"
                    className={classes.alertMessage}>
                    <Typography variant="body1">Copied!</Typography>
                </Alert>
            </Snackbar>{' '}
        </Card>
    );
};

export default TransactionDetails;
