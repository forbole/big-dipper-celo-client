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
import numbro from 'numbro';
import React from 'react';

import Chips from '../Chips';
import ComponentLoader from '../misc/ComponentLoader';
import ErrorMessage from '../misc/ErrorMessage';
import MiddleEllipsis from '../misc/MiddleEllipsis';
import NotAvailable from '../misc/NotAvailable';
import NavLink from '../NavLink';
import { GET_ACCOUNT_TX } from '../query/Transaction';

const useStyles = makeStyles(() => {
    return {
        root: {
            borderRadius: 5,
            padding: '0',
            width: '100%'
        },
        container: {
            borderRadius: 5,
            width: '100%'
        },

        leftInline: {
            display: 'flex',
            padding: '0 0 0 1rem'
        },
        rightInline: {
            display: 'flex',
            overflow: 'auto',
            padding: '0 1rem 0 0',
            align: 'right'
        },

        box: {
            letterSpacing: '1px',
            padding: '1rem',
            display: 'block',
            overflow: 'hidden',
            whiteSpace: 'nowrap'
        },

        alignRight: {
            paddingRight: '1rem',
            float: 'right'
        },

        txPadding: {
            display: 'flex',
            overflow: 'hidden',
            padding: '0 0 0 0.5rem'
        },
        divider: {
            margin: '0.5rem 0 0 0',
            backgroundColor: 'rgba(232, 232, 232, 1)'
        },
        icon: {
            fill: 'rgba(255, 255, 255, 0.6)'
        },

        chip: {
            marginLeft: '1rem',
            marginRight: '-1rem'
        }
    };
});

type TransactionsProps = { address: string };

const AccountTransactions = ({ address }: TransactionsProps): JSX.Element => {
    const SETPAGE = process.env.SETPAGE ? parseInt(process.env.SETPAGE) : 0;
    const ROWXXSMALL = process.env.ROWXXSMALL ? parseInt(process.env.ROWXXSMALL) : 5;
    const ROWXSMALL = process.env.ROWXSMALL ? parseInt(process.env.ROWXSMALL) : 10;
    const ROWSMALL = process.env.ROWSMALL ? parseInt(process.env.ROWSMALL) : 15;
    const ROWMEDIUM = process.env.ROWMEDIUM ? parseInt(process.env.ROWMEDIUM) : 30;
    const ROWLARGE = process.env.ROWLARGE ? parseInt(process.env.ROWLARGE) : 50;
    const ROWXLARGE = process.env.ROWXLARGE ? parseInt(process.env.ROWXLARGE) : 100;

    const [pageNumber, setPageNumber] = React.useState(SETPAGE);
    const [pageSize, setPageSize] = React.useState(ROWXXSMALL);
    const page = pageNumber + 1;

    const classes = useStyles();

    const handleChangePage = (event: unknown, newPage: number) => {
        setPageNumber(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPageSize(+event.target.value);
        setPageNumber(SETPAGE);
    };

    const { loading, error, data } = useQuery(GET_ACCOUNT_TX, {
        variables: { address, pageSize, page },
        pollInterval: 5000
    });

    if (loading) return <ComponentLoader />;
    if (error) return <ErrorMessage message={error.message} />;
    if (data && data.transactionsByAccount && data.transactionsByAccount.totalCounts > 0) {
        return (
            <Accordion defaultExpanded>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon className={classes.icon} />}
                    aria-controls="accountTransactionsPanel"
                    id="accountTransactionsPanel">
                    <Typography variant="body1">
                        {' '}
                        Transactions (
                        {numbro(data.transactionsByAccount.totalCounts).format('0,000')})
                    </Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.root}>
                    <Grid container>
                        <Divider variant="middle" />
                        <Grid item xs={12}>
                            <TableContainer className={classes.container}>
                                <Table>
                                    <TableHead></TableHead>
                                    <TableBody>
                                        {data.transactionsByAccount.transactions.map(
                                            (row: any, index: number) => {
                                                return (
                                                    <TableRow key={index}>
                                                        <TableCell
                                                            component="th"
                                                            scope="row"
                                                            padding="checkbox">
                                                            <Grid
                                                                container
                                                                spacing={1}
                                                                style={{ padding: '0.5rem 0' }}>
                                                                <Grid item xs={8}>
                                                                    <Typography
                                                                        variant="body2"
                                                                        className={
                                                                            classes.leftInline
                                                                        }>
                                                                        Tx#
                                                                        <NavLink
                                                                            href={`/transaction/${row.hash}`}
                                                                            className={
                                                                                classes.leftInline
                                                                            }
                                                                            name={
                                                                                row.hash ? (
                                                                                    <MiddleEllipsis
                                                                                        text={
                                                                                            row.hash
                                                                                        }
                                                                                    />
                                                                                ) : (
                                                                                    <NotAvailable variant="body2" />
                                                                                )
                                                                            }
                                                                        />
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item xs={4}>
                                                                    <Typography
                                                                        variant="body2"
                                                                        className={
                                                                            classes.alignRight
                                                                        }>
                                                                        {row.timestamp ? (
                                                                            moment
                                                                                .unix(row.timestamp)
                                                                                .format(
                                                                                    'Do MMMM YYYY, h:mm:ss a'
                                                                                )
                                                                        ) : (
                                                                            <NotAvailable variant="body2" />
                                                                        )}
                                                                    </Typography>
                                                                </Grid>

                                                                <Grid item xs={5} md={4}>
                                                                    <Typography
                                                                        variant="body2"
                                                                        className={
                                                                            classes.leftInline
                                                                        }>
                                                                        From{'  '}
                                                                        {row.from &&
                                                                        row.from.address ? (
                                                                            <NavLink
                                                                                href={`/account/${row.from.address}`}
                                                                                className={
                                                                                    classes.txPadding
                                                                                }
                                                                                name={
                                                                                    <MiddleEllipsis
                                                                                        text={
                                                                                            row.from
                                                                                                .address
                                                                                        }
                                                                                    />
                                                                                }
                                                                            />
                                                                        ) : (
                                                                            <NotAvailable variant="body2" />
                                                                        )}
                                                                    </Typography>
                                                                </Grid>

                                                                <Grid item xs={7} md={8}>
                                                                    <Typography
                                                                        variant="body2"
                                                                        align="left"
                                                                        className={
                                                                            classes.rightInline
                                                                        }>
                                                                        To
                                                                        <NavLink
                                                                            href={`/account/${row.to.address}`}
                                                                            className={
                                                                                classes.txPadding
                                                                            }
                                                                            name={
                                                                                row.to &&
                                                                                row.to.address ? (
                                                                                    <MiddleEllipsis
                                                                                        text={
                                                                                            row.to
                                                                                                .address
                                                                                        }
                                                                                    />
                                                                                ) : (
                                                                                    <NotAvailable variant="body2" />
                                                                                )
                                                                            }
                                                                        />
                                                                    </Typography>
                                                                </Grid>

                                                                <Grid
                                                                    item
                                                                    xs={12}
                                                                    lg={8}
                                                                    className={classes.chip}>
                                                                    {row.type &&
                                                                    row.to &&
                                                                    row.to.contract &&
                                                                    row.to.contract.name ? (
                                                                        <Chips
                                                                            type={row.type}
                                                                            contractName={
                                                                                row.to.contract.name
                                                                            }
                                                                        />
                                                                    ) : row.type ? (
                                                                        <Chips type={row.type} />
                                                                    ) : null}
                                                                </Grid>
                                                                <Grid item xs={12} lg={4}>
                                                                    <Typography
                                                                        variant="body2"
                                                                        className={
                                                                            classes.alignRight
                                                                        }>
                                                                        {row.gas ? (
                                                                            row.gas + ' CELO'
                                                                        ) : (
                                                                            <NotAvailable variant="body2" />
                                                                        )}
                                                                    </Typography>
                                                                </Grid>
                                                            </Grid>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            }
                                        )}
                                    </TableBody>
                                </Table>
                                <TablePagination
                                    className="account-txs"
                                    rowsPerPageOptions={[
                                        ROWXXSMALL,
                                        ROWXSMALL,
                                        ROWSMALL,
                                        ROWMEDIUM,
                                        ROWLARGE,
                                        ROWXLARGE
                                    ]}
                                    component="div"
                                    count={data.transactionsByAccount.totalCounts}
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
                            </TableContainer>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        );
    } else {
        return null as any;
    }
};

export default AccountTransactions;
