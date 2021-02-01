import { useQuery } from '@apollo/client';
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
import numbro from 'numbro';
import React from 'react';

import { GET_ACCOUNTS } from '../Query/Account';
import { GET_TOTAL_SUPPLY } from '../Query/Chain';
import ComponentLoader from '../Utils/ComponentLoader';
import ErrorMessage from '../Utils/ErrorMessage';
import MiddleEllipsis from '../Utils/MiddleEllipsis';
import NavLink from '../Utils/NavLink';
import NotAvailable from '../Utils/NotAvailable';

interface Column {
    id: 'rank' | 'address' | 'balance' | 'percentage' | 'txsCount';
    label: string;
    align: 'left' | 'right';
}

const columns: Column[] = [
    { id: 'rank', label: 'Rank', align: 'left' },
    { id: 'address', label: 'Address', align: 'left' },
    { id: 'balance', label: 'Balance', align: 'right' },
    { id: 'percentage', label: 'Percentage', align: 'right' },
    { id: 'txsCount', label: 'Txs Count', align: 'right' }
];

const useStyles = makeStyles(({ spacing }) => {
    return {
        root: {
            width: '100%',
            overflowY: 'auto',
            padding: '0.5rem'
        },
        container: {
            borderRadius: 5,
            width: '100%',
            overflowY: 'auto'
        },
        box: {
            letterSpacing: '1px',
            padding: '0.6rem',
            display: 'inline-flex',
            overflow: 'hidden',
            whiteSpace: 'nowrap'
        },
        tableCell: {
            overflow: 'auto',
            padding: '0.4rem',
            border: 'none'
        },
        table: {
            padding: '0.2rem',
            border: 'none'
        },
        inline: {
            paddingLeft: '0rem'
        },
        card: {
            padding: '1rem',
            justifyContent: 'center',
            marginBottom: '1rem',
            background: 'rgba(255, 255, 255, 1)',
            alignItems: 'center',
            borderRadius: 5,
            boxShadow: '0 2px 4px 0 rgba(138, 148, 159, 0.2)',
            '& > *:nth-child(1)': {
                marginRight: spacing(2)
            },
            '& > *:nth-child(2)': {
                flex: 'auto'
            }
        },
        divider: {
            margin: '0.5rem',
            backgroundColor: 'rgba(232, 232, 232, 1)'
        }
    };
});

const AccountList = (): JSX.Element => {
    const classes = useStyles();

    const SETPAGE = process.env.SETPAGE ? parseInt(process.env.SETPAGE) : 0;
    const ROWXXSMALL = process.env.ROWXXSMALL ? parseInt(process.env.ROWXXSMALL) : 5;
    const ROWXSMALL = process.env.ROWXSMALL ? parseInt(process.env.ROWXSMALL) : 10;
    const ROWSMALL = process.env.ROWSMALL ? parseInt(process.env.ROWSMALL) : 15;
    const ROWMEDIUM = process.env.ROWMEDIUM ? parseInt(process.env.ROWMEDIUM) : 30;
    const ROWLARGE = process.env.ROWLARGE ? parseInt(process.env.ROWLARGE) : 50;
    const ROWXLARGE = process.env.ROWXLARGE ? parseInt(process.env.ROWXLARGE) : 100;
    const CELO_FRACTION = process.env.CELO_FRACTION ? parseInt(process.env.CELO_FRACTION) : 1e18;

    const [pageNumber, setPageNumber] = React.useState(SETPAGE);
    const [pageSize, setPageSize] = React.useState(ROWMEDIUM);
    const page = pageNumber + 1;
    const field = 'balance';

    const handleChangePage = (event: any, newPage: number) => {
        setPageNumber(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPageSize(+event.target.value);
        setPageNumber(SETPAGE);
    };

    const { loading, error, data } = useQuery(GET_ACCOUNTS, {
        variables: { pageSize, page, field }
    });

    const totalSupply = useQuery(GET_TOTAL_SUPPLY, {});

    if (loading) return <ComponentLoader />;
    if (error) return <ErrorMessage />;

    return (
        <Grid container>
            <Grid item xs={12}>
                <Paper className={classes.root}>
                    <Typography variant="body1" className={classes.box}>
                        Accounts{' '}
                    </Typography>
                    <TableContainer className={classes.container}>
                        <Paper className={classes.tableCell}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
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
                                    {data.accounts.accounts.map((row: any, index: number) => {
                                        return (
                                            <TableRow
                                                key={index}
                                                style={
                                                    index % 2
                                                        ? {
                                                              background: 'rgba(248, 248, 248, 1)',
                                                              border: 'none'
                                                          }
                                                        : { background: 'rgb(255,255,255)' }
                                                }>
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                    padding="checkbox"
                                                    align="left"
                                                    className={classes.tableCell}>
                                                    <Typography
                                                        variant="body2"
                                                        color="textPrimary"
                                                        noWrap>
                                                        {pageSize * pageNumber + index + 1}
                                                    </Typography>
                                                </TableCell>
                                                {row.address ? (
                                                    <TableCell
                                                        align="left"
                                                        padding="checkbox"
                                                        className={classes.tableCell}>
                                                        <NavLink
                                                            href={`/account/${row.address}`}
                                                            name={
                                                                <Typography variant="body2" noWrap>
                                                                    <MiddleEllipsis
                                                                        text={row.address}
                                                                    />
                                                                </Typography>
                                                            }
                                                        />
                                                    </TableCell>
                                                ) : (
                                                    <NotAvailable variant="body2" />
                                                )}
                                                <TableCell
                                                    align="right"
                                                    padding="checkbox"
                                                    className={classes.tableCell}>
                                                    {row.balance ? (
                                                        <Typography
                                                            variant="body2"
                                                            color="textSecondary"
                                                            noWrap>
                                                            {new BigNumber(row.balance)
                                                                .dividedBy(CELO_FRACTION)
                                                                .toFormat(2)}{' '}
                                                            CELO
                                                        </Typography>
                                                    ) : (
                                                        <NotAvailable variant="body2" />
                                                    )}
                                                </TableCell>
                                                <TableCell
                                                    align="right"
                                                    padding="checkbox"
                                                    className={classes.tableCell}>
                                                    {row.balance &&
                                                    totalSupply &&
                                                    totalSupply.data &&
                                                    totalSupply.data.chain &&
                                                    totalSupply.data.chain.cUSDTotalSupply ? (
                                                        <Typography
                                                            variant="body2"
                                                            color="textSecondary"
                                                            noWrap>
                                                            {numbro(
                                                                (row.balance /
                                                                    totalSupply.data.chain
                                                                        .cUSDTotalSupply) *
                                                                    100
                                                            ).format('0.00')}{' '}
                                                            {'%'}
                                                        </Typography>
                                                    ) : (
                                                        <NotAvailable variant="body2" />
                                                    )}
                                                </TableCell>
                                                <TableCell
                                                    align="right"
                                                    padding="checkbox"
                                                    className={classes.tableCell}>
                                                    {row.txCount ? (
                                                        <Typography
                                                            variant="body2"
                                                            color="textSecondary"
                                                            noWrap>
                                                            {numbro(row.txCount).format('0,000')}
                                                        </Typography>
                                                    ) : (
                                                        <Typography
                                                            variant="body2"
                                                            color="textSecondary"
                                                            noWrap>
                                                            0
                                                        </Typography>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </Paper>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[
                            ROWXXSMALL,
                            ROWXSMALL,
                            ROWSMALL,
                            ROWMEDIUM,
                            ROWLARGE,
                            ROWXLARGE
                        ]}
                        component="div"
                        count={data.accounts.totalCounts}
                        rowsPerPage={pageSize}
                        page={pageNumber}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        backIconButtonProps={{
                            'aria-label': 'Previous',
                            disabled: pageNumber === 0
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'Next'
                        }}
                    />
                </Paper>
            </Grid>
        </Grid>
    );
};

export default AccountList;
