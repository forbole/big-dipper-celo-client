import { useQuery } from '@apollo/client';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import React, { useEffect } from 'react';

import Link from '../Link';
import ComponentLoader from '../misc/ComponentLoader';
import ErrorMessage from '../misc/ErrorMessage';
import NotAvailable from '../misc/NotAvailable';
import { GET_TX_DETAILS } from '../query/Transaction';

const useStyles = makeStyles(({ spacing, palette }) => {
    return {
        root: {
            width: '100%',
            borderRadius: 5,
            wordWrap: 'break-word',
            margin: 'none'
        },

        item: {
            padding: '0 0 1rem 0.5rem'
        }
    };
});

type InputParametersProps = { hash: string };

const InputParameters = ({ hash }: InputParametersProps) => {
    const classes = useStyles();

    const { loading, error, data } = useQuery(GET_TX_DETAILS, {
        variables: { hash }
    });

    if (loading) return <ComponentLoader />;
    if (error) return <ErrorMessage message={error.message} />;
    return (
        <Card className={classes.root}>
            <CardContent>
                <Grid container spacing={2} className={classes.item}>
                    <Grid item xs={12}>
                        <Typography color="textSecondary" variant="subtitle1">
                            Input
                        </Typography>
                    </Grid>
                    <Divider />

                    <TableContainer>
                        <Table aria-label="input-params">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="left">Type</TableCell>
                                    <TableCell align="right">Data</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.transaction.decodedInput.params.map((row: any) => (
                                    <TableRow key={data.transaction.blockNumber}>
                                        <TableCell component="th" scope="row">
                                            <Typography color="textPrimary" variant="body2">
                                                {row.name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Typography color="textPrimary" variant="body2">
                                                {row.type}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography color="textSecondary" variant="body2">
                                                {row.value}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default InputParameters;
