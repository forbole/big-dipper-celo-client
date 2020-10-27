import { useQuery } from '@apollo/client';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import BigNumber from 'bignumber.js';
import getConfig from 'next/config';
import React from 'react';

import Link from '../Link';
import ComponentLoader from '../misc/ComponentLoader';
import ErrorMessage from '../misc/ErrorMessage';
import NotAvailable from '../misc/NotAvailable';
import { GET_PROPOSAL } from '../query/Proposal';
import { GET_TX_DETAILS } from '../query/Transaction';

interface Column {
    id: 'depositor' | 'amount' | 'time';
    label: string;
    align: 'left' | 'right';
}

const columns: Column[] = [
    { id: 'depositor', label: 'Depositor', align: 'left' },
    { id: 'amount', label: 'Amount', align: 'right' },
    { id: 'time', label: 'Time', align: 'right' }
];

const useStyles = makeStyles(() => {
    return {
        root: {
            width: '100%',
            padding: '0.5rem',
            borderRadius: 5,
            overflowY: 'auto'
        },
        container: {
            borderRadius: 5,
            width: '100%',
            overflow: 'auto'
        },
        box: {
            letterSpacing: '1px',
            padding: '1rem',
            display: 'inline-flex',
            overflow: 'hidden',
            whiteSpace: 'nowrap'
        },
        time: {
            padding: '0.01em',
            margin: '0.5em'
        },
        tableCell: {
            overflow: 'auto',
            padding: '0.5rem'
        },
        table: {
            background: 'rgba(246, 247, 249, 1)',
            padding: '0'
        },
        paper: {
            padding: '1rem',
            width: '100%'
        },
        headerLabel: {
            padding: '0 0 1rem 0.5rem'
        },
        divider: {
            backgroundColor: 'rgba(232, 232, 232, 1)'
        }
    };
});

type DepositListProps = { proposal: string };

const DepositList = ({ proposal }: DepositListProps): JSX.Element => {
    const classes = useStyles();
    const proposalNumber = parseInt(proposal);
    const { publicRuntimeConfig } = getConfig();
    const hashValue = '';

    const [hash, setHash] = React.useState('');
    const [page, setPage] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(publicRuntimeConfig.rowXsmall);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPageSize(+event.target.value);
    };

    const { loading, error, data } = useQuery(GET_PROPOSAL, {
        variables: { proposalNumber }
    });

    const txDetails = useQuery(GET_TX_DETAILS, {
        variables: { hash }
    });

    // useEffect(() => {
    //   setHash(hashValue)
    // })

    const CELO_FRACTION = process.env.CELO_FRACTION ? parseInt(process.env.CELO_FRACTION) : 1e18;

    if (loading) return <ComponentLoader />;
    if (error) return <ErrorMessage message={error.message} />;

    return (
        <Grid container spacing={1} justify="center" className={classes.container}>
            <Paper className={classes.paper}>
                <TableContainer>
                    <Typography
                        color="textSecondary"
                        variant="subtitle1"
                        className={classes.headerLabel}>
                        Deposit (200 CELO)
                    </Typography>

                    <Divider variant="middle" className={classes.divider} />
                    <Table size="medium">
                        <TableHead>
                            <TableRow>
                                {columns.map((column: any, index: number) => (
                                    <TableCell
                                        key={index}
                                        align={column.align}
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
                            {Object.keys(data.proposal.upvoteList)
                                .slice(page * pageSize, page * pageSize + pageSize)
                                .map(function (row: any, index: number) {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                                padding="checkbox"
                                                align="left"
                                                className={classes.tableCell}>
                                                {data.proposal &&
                                                data.proposal.upvoteList[row] &&
                                                data.proposal.upvoteList[row].returnValues &&
                                                data.proposal.upvoteList[row].returnValues
                                                    .account ? (
                                                    <Link
                                                        href="/account/[account]/"
                                                        as={`/account/${data.proposal.upvoteList[row].returnValues.account}`}
                                                        color="secondary">
                                                        <Typography variant="body2" noWrap>
                                                            {' '}
                                                            {
                                                                data.proposal.upvoteList[row]
                                                                    .returnValues.account
                                                            }
                                                        </Typography>
                                                    </Link>
                                                ) : (
                                                    <NotAvailable variant="body2" />
                                                )}
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                                padding="checkbox"
                                                className={classes.tableCell}>
                                                {data.proposal &&
                                                data.proposal.upvoteList[row] &&
                                                data.proposal.upvoteList[row].returnValues &&
                                                data.proposal.upvoteList[row].returnValues
                                                    .upvotes ? (
                                                    <Typography variant="body2" noWrap>
                                                        {new BigNumber(
                                                            data.proposal.upvoteList[row]
                                                                .returnValues.upvotes /
                                                                CELO_FRACTION
                                                        ).toFormat()}
                                                    </Typography>
                                                ) : (
                                                    <NotAvailable variant="body2" />
                                                )}
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                                padding="checkbox"
                                                className={classes.tableCell}>
                                                {txDetails.data &&
                                                txDetails.data.transaction &&
                                                txDetails.data.transaction.timestamp ? (
                                                    <Typography variant="body2" noWrap>
                                                        {new Date(
                                                            parseInt(
                                                                txDetails.data.transaction.timestamp
                                                            ) * 1000
                                                        ).toUTCString()}
                                                    </Typography>
                                                ) : (
                                                    <NotAvailable variant="body2" />
                                                )}
                                            </TableCell>
                                            {/* <TableCell
                        align="left"
                        padding="checkbox"
                        className={classes.tableCell}
                      >
                        <Typography variant="body2" noWrap>
                          {row.gasUsed}
                        </Typography>
                      </TableCell>
                      <TableCell
                        align="left"
                        padding="checkbox"
                        className={classes.tableCell}
                      >
                        <Typography variant="body2" noWrap>
                          {row.gasLimit}
                        </Typography>
                      </TableCell>
                      <TableCell align="left" padding="checkbox">
                        <Typography variant="body2" noWrap>
                          {row.time}
                        </Typography>
                      </TableCell> */}
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
                    count={Object.keys(data.proposal.upvoteList).length}
                    rowsPerPage={pageSize}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    backIconButtonProps={{
                        'aria-label': 'Previous'
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next'
                    }}
                />
            </Paper>
        </Grid>
    );
};

export default DepositList;
