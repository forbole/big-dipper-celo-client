import { useQuery } from '@apollo/client';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import ComponentLoader from '../misc/ComponentLoader';
import ErrorMessage from '../misc/ErrorMessage';
import NotAvailable from '../misc/NotAvailable';
import { GET_TX_DETAILS } from '../query/Transaction';

const useStyles = makeStyles(({ spacing }) => {
    return {
        card: {
            display: 'flex',
            padding: '1rem',
            justifyContent: 'center',
            background: 'rgba(255, 255, 255, 1)',
            borderRadius: 5
        }
    };
});
type InputCardProps = { hash: string };

const InputCard = ({ hash }: InputCardProps) => {
    const classes = useStyles();
    const callData: any = [];

    const { loading, error, data } = useQuery(GET_TX_DETAILS, {
        variables: { hash }
    });

    if (loading) return <ComponentLoader />;
    if (error) return <ErrorMessage message={error.message} />;

    for (const c in data.transaction.decodedInput.params) {
        (callData[c] = data.transaction.decodedInput.params[c].type),
            (callData[c] += ' '),
            (callData[c] += data.transaction.decodedInput.params[c].name);
    }

    return (
        <Card className={classes.card}>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <Typography align="left" variant="body2">
                        Method Id
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography align="right" variant="body2" color="textSecondary">
                        {data.transaction.input.substr(0, data.transaction.input.indexOf('000000'))}
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <Typography align="left" variant="body2">
                        Call
                    </Typography>
                </Grid>
                <Grid item xs={11}>
                    <Typography align="right" variant="body2" color="textSecondary">
                        {data.transaction.decodedInput.name}({callData.toString()})
                    </Typography>
                </Grid>
            </Grid>
        </Card>
    );
};

export default InputCard;
