import { useQuery } from '@apollo/client';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import moment from 'moment';
import getConfig from 'next/config';
import React from 'react';

import ComponentLoader from '../misc/ComponentLoader';
import ErrorMessage from '../misc/ErrorMessage';
import MiddleEllipsis from '../misc/MiddleEllipsis';
import NotAvailable from '../misc/NotAvailable';
import NavLink from '../NavLink';
import { GET_ACCOUNT_DETAILS } from '../query/Account';
import { DOWNTIME } from '../query/Downtime';

interface Column {
    id: 'height' | 'proposer' | 'txs' | 'gasUsed' | 'gasLimit' | 'time';
    label: string;
}

const columns: Column[] = [
    { id: 'height', label: 'Height' },
    { id: 'proposer', label: 'Proposer' },
    { id: 'txs', label: 'Txs' },
    { id: 'gasUsed', label: 'Gas Used' },
    { id: 'gasLimit', label: 'Gas Limit' },
    { id: 'time', label: 'Time' }
];

const useStyles = makeStyles(() => {
    return {
        root: {
            width: '100%',
            padding: '0 0.5rem 0.5rem 0.5rem',
            overflowY: 'auto',
            marginTop: '-0.5rem'
        },
        container: {
            borderRadius: 5,
            width: '100%',
            overflowY: 'auto'
        },
        box: {
            letterSpacing: '1px',
            padding: '1rem',
            display: 'inline-flex',
            overflow: 'hidden',
            whiteSpace: 'nowrap'
        },
        tableCell: {
            overflow: 'auto',
            padding: '0.5rem'
        },
        table: {
            background: 'rgba(246, 247, 249, 1)',
            padding: '0'
        },
        divider: {
            backgroundColor: 'rgba(232, 232, 232, 1)'
        },
        icon: {
            fill: 'rgba(255, 255, 255, 0.6)'
        }
    };
});

type DowntimeProps = { address: string };

const Downtime = ({ address }: DowntimeProps): JSX.Element => {
    const classes = useStyles();
    const { publicRuntimeConfig } = getConfig();

    const [page, setPage] = React.useState(publicRuntimeConfig.setPage);
    const [pageSize, setPageSize] = React.useState(publicRuntimeConfig.rowXsmall);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPageSize(+event.target.value);
        setPage(publicRuntimeConfig.setPage);
    };

    const accountQuery = useQuery(GET_ACCOUNT_DETAILS, {
        variables: { address }
    });

    address =
        accountQuery.data &&
        accountQuery.data.account &&
        accountQuery.data.account.accountSummary &&
        accountQuery.data.account.accountSummary.authorizedSigners &&
        accountQuery.data.account.accountSummary.authorizedSigners.validator
            ? accountQuery.data.account.accountSummary.authorizedSigners.validator
            : '';

    const { loading, error, data } = useQuery(DOWNTIME, {
        variables: { address, pageSize, page },
        pollInterval: 5000
    });

    if (loading) return <ComponentLoader />;
    if (error) return <ErrorMessage message={error.message} />;

    return (
        <Accordion defaultExpanded>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon className={classes.icon} />}
                aria-controls="accountDowntimePanel"
                id="accountDowntimePanel">
                <Typography variant="body1"> Downtime</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.root}>
                <Grid container className={classes.tableCell}>
                    <Divider variant="middle" className={classes.divider} />
                    <Grid item xs={12}>
                        <TableContainer className={classes.container}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align="left"
                                                className={classes.table}
                                                padding="checkbox">
                                                <Typography
                                                    variant="body2"
                                                    noWrap
                                                    className={classes.tableCell}>
                                                    {column.label}
                                                </Typography>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.downtime.blocks.map((row: any, index: number) => {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                    align="left"
                                                    padding="checkbox"
                                                    className={classes.tableCell}>
                                                    <NavLink
                                                        href={`/block/${row.number}`}
                                                        name={
                                                            <Typography variant="body2" noWrap>
                                                                {row.number}
                                                            </Typography>
                                                        }
                                                    />
                                                </TableCell>
                                                <TableCell
                                                    align="left"
                                                    padding="checkbox"
                                                    className={classes.tableCell}>
                                                    {row.miner &&
                                                    row.miner.name &&
                                                    row.miner.address ? (
                                                        <NavLink
                                                            href={`/account/${row.miner.address}`}
                                                            name={
                                                                <Typography variant="body2" noWrap>
                                                                    {row.miner.name}
                                                                </Typography>
                                                            }
                                                        />
                                                    ) : (
                                                        <NotAvailable variant="body2" />
                                                    )}
                                                </TableCell>
                                                <TableCell
                                                    align="left"
                                                    padding="checkbox"
                                                    className={classes.tableCell}>
                                                    {row.transactions &&
                                                    row.transactions.transactionIndex ? (
                                                        <MiddleEllipsis
                                                            text={row.transactions.transactionIndex}
                                                        />
                                                    ) : (
                                                        '0'
                                                    )}
                                                </TableCell>
                                                <TableCell
                                                    align="left"
                                                    padding="checkbox"
                                                    className={classes.tableCell}>
                                                    {row.gasUsed ? (
                                                        <Typography variant="body2" noWrap>
                                                            {row.gasUsed}
                                                        </Typography>
                                                    ) : (
                                                        <NotAvailable variant="body2" />
                                                    )}
                                                </TableCell>
                                                <TableCell
                                                    align="left"
                                                    padding="checkbox"
                                                    className={classes.tableCell}>
                                                    {row.gasLimit ? (
                                                        <Typography variant="body2" noWrap>
                                                            {row.gasLimit}
                                                        </Typography>
                                                    ) : (
                                                        <NotAvailable variant="body2" />
                                                    )}
                                                </TableCell>
                                                <TableCell align="left" padding="checkbox">
                                                    {row.timestamp ? (
                                                        <Typography variant="body2" noWrap>
                                                            {moment
                                                                .unix(row.timestamp)
                                                                .format('Do MMMM YYYY, h:mm:ss a')}
                                                        </Typography>
                                                    ) : (
                                                        <NotAvailable variant="body2" />
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[
                                publicRuntimeConfig.rowXsmall,
                                publicRuntimeConfig.rowSmall,
                                publicRuntimeConfig.rowMedium,
                                publicRuntimeConfig.rowLarge,
                                publicRuntimeConfig.rowXlarge
                            ]}
                            component="div"
                            count={data.downtime.totalCounts}
                            rowsPerPage={pageSize}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            backIconButtonProps={{
                                'aria-label': 'Previous',
                                disabled: page === 1
                            }}
                            nextIconButtonProps={{
                                'aria-label': 'Next'
                            }}
                        />
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>
    );
};

export default Downtime;
