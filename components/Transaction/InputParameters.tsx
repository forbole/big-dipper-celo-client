import { useQuery } from '@apollo/client';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import { GET_TX_DETAILS } from '../Query/Transaction';
import ComponentLoader from '../Utils/ComponentLoader';
import NavLink from '../Utils/NavLink';

const useStyles = makeStyles(() => {
    return {
        root: {
            width: '100%',
            borderRadius: 5,
            wordWrap: 'break-word',
            margin: 'none'
        },

        item: {
            padding: '0 0 1rem 0.5rem'
        },
        tableCell: {
            overflow: 'auto',
            padding: '0.4rem',
            border: 'none'
        }
    };
});

type InputParametersProps = { hash: string };

const InputParameters = ({ hash }: InputParametersProps): JSX.Element => {
    const classes = useStyles();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { loading, error, data } = useQuery(GET_TX_DETAILS, {
        variables: { hash }
    });

    if (loading) return <ComponentLoader />;

    if (data?.transaction?.decodedInput) {
        return (
            <Card className={classes.root}>
                <CardContent>
                    <Grid container spacing={2} className={classes.item}>
                        <Grid item xs={12}>
                            <Typography color="textPrimary" variant="subtitle1">
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
                                {data?.transaction?.decodedInput?.params ? (
                                    <TableBody>
                                        {data?.transaction?.decodedInput?.params?.map(
                                            (row: any, index: number) => (
                                                <TableRow key={index}>
                                                    <TableCell
                                                        component="th"
                                                        scope="row"
                                                        padding="checkbox"
                                                        className={classes.tableCell}>
                                                        <Typography
                                                            color="textPrimary"
                                                            variant="body2">
                                                            {row?.name}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell
                                                        component="th"
                                                        scope="row"
                                                        padding="checkbox"
                                                        align="left"
                                                        className={classes.tableCell}>
                                                        <Typography
                                                            color="textPrimary"
                                                            variant="body2">
                                                            {row?.type}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell
                                                        component="th"
                                                        scope="row"
                                                        padding="checkbox"
                                                        align="right"
                                                        className={classes.tableCell}>
                                                        {row?.value.startsWith('0x') ? (
                                                            <NavLink
                                                                href={`/account/${row.value}`}
                                                                name={
                                                                    <Typography variant="body2">
                                                                        {row.value}
                                                                    </Typography>
                                                                }
                                                            />
                                                        ) : (
                                                            <Typography
                                                                color="textSecondary"
                                                                variant="body2">
                                                                {row?.value}
                                                            </Typography>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        )}
                                    </TableBody>
                                ) : (
                                    <TableBody>
                                        {data?.transaction?.decodedInput?.map((row: any) =>
                                            row?.events.map((event: any, i: number) => (
                                                <TableRow key={i}>
                                                    <TableCell
                                                        component="th"
                                                        scope="row"
                                                        padding="checkbox"
                                                        className={classes.tableCell}>
                                                        <Typography
                                                            color="textPrimary"
                                                            variant="body2">
                                                            {event?.name}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell
                                                        component="th"
                                                        scope="row"
                                                        padding="checkbox"
                                                        align="left"
                                                        className={classes.tableCell}>
                                                        <Typography
                                                            color="textPrimary"
                                                            variant="body2">
                                                            {event?.type}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell
                                                        component="th"
                                                        scope="row"
                                                        padding="checkbox"
                                                        align="right"
                                                        className={classes.tableCell}>
                                                        {event?.value.startsWith('0x') === true ? (
                                                            <NavLink
                                                                href={`/account/${event.value}`}
                                                                name={
                                                                    <Typography variant="body2">
                                                                        {event?.value}
                                                                    </Typography>
                                                                }
                                                            />
                                                        ) : (
                                                            <Typography
                                                                color="textSecondary"
                                                                variant="body2">
                                                                {event?.value}
                                                            </Typography>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                )}
                            </Table>
                        </TableContainer>
                    </Grid>
                </CardContent>
            </Card>
        );
    } else return null as any;
};

export default InputParameters;
