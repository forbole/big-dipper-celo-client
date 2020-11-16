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
import { BigNumber } from 'bignumber.js';
import moment from 'moment';
import React, { useEffect } from 'react';

import Chips from '../Chips';
import ComponentLoader from '../misc/ComponentLoader';
import ErrorMessage from '../misc/ErrorMessage';
import MiddleEllipsis from '../misc/MiddleEllipsis';
import NotAvailable from '../misc/NotAvailable';
import NavLink from '../NavLink';
import { GET_TX } from '../query/Transaction';

const useStyles = makeStyles({
    root: {
        width: '100%',
        height: '100%',
        padding: '1.5%',
        borderRadius: 5,
        wordWrap: 'break-word',
        margin: '0'
    },
    container: {
        borderRadius: 5,
        width: '100%',
        height: '100%'
    },

    leftInline: {
        display: 'flex',
        overflow: 'auto',
        padding: '0 0 0 1rem',
        align: 'left'
    },
    rightInline: {
        display: 'flex',
        overflow: 'auto',
        padding: '0 1rem 0 0',
        align: 'right'
    },

    box: {
        letterSpacing: '1px',
        padding: '0.6rem 0.6rem 1rem 0.6rem',
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
        padding: '0 0 0 0.5rem'
    },

    link: {
        float: 'right'
    },

    truncateText: {
        overflow: 'hidden',
        textOverflow: 'clip ellipsis clip 0 3ch',
        minWidth: '1rem',
        maxWidth: '40rem'
    },

    chip: {
        marginLeft: '1rem'
    },

    divider: {
        backgroundColor: 'rgba(232, 232, 232, 1)',
        margin: '0 1rem',
        display: 'flex'
    }
});


type LatestTxsProps = { pagination: boolean };

const LatestTransactions = ({ pagination }: LatestTxsProps): JSX.Element => {
    const SETPAGE = process.env.SETPAGE ? parseInt(process.env.SETPAGE) : 0;
    const ROWXXSMALL = process.env.ROWXXSMALL ? parseInt(process.env.ROWXXSMALL) : 5;
    const ROWXSMALL = process.env.ROWXSMALL ? parseInt(process.env.ROWXSMALL) : 10;
    const ROWSMALL = process.env.ROWSMALL ? parseInt(process.env.ROWSMALL) : 15;
    const ROWMEDIUM = process.env.ROWMEDIUM ? parseInt(process.env.ROWMEDIUM) : 30;
    const ROWLARGE = process.env.ROWLARGE ? parseInt(process.env.ROWLARGE) : 50;
    const ROWXLARGE = process.env.ROWXLARGE ? parseInt(process.env.ROWXLARGE) : 100;
    const CELO_FRACTION = process.env.CELO_FRACTION ? parseInt(process.env.CELO_FRACTION) : 1e18;

    const classes = useStyles();
    const [pageNumber, setPageNumber] = React.useState(SETPAGE);
    const [pageSize, setPageSize] = React.useState(ROWSMALL);
    const page = pageNumber + 1;

    useEffect(() => {
        if (pagination === false) {
            setPageSize(ROWXXSMALL);
        }
    });

    const handleChangePage = (event: unknown, newPage: number) => {
        setPageNumber(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPageSize(+event.target.value);
        setPageNumber(SETPAGE);
    };

    const { loading, error, data } = useQuery(GET_TX, {
        variables: { pageSize, page },
        pollInterval: 5000
    });

    // if (loading) return <ComponentLoader />;
    if (error) return <ErrorMessage message={error.message} />;

    if (data && data.transactions)
        return (
            <>
                <Grid container className={classes.container}>
                    <Grid item xs={12}>
                        <Paper className={classes.root}>
                            <Typography variant="body1" className={classes.box}>
                                Latest Transactions{' '}
                                {pagination === false ? (
                                    <NavLink
                                        href="/transactions"
                                        name="view more"
                                        className={classes.link}
                                        textSecondary
                                    />
                                ) : null}
                            </Typography>
                            {data && data.transactions ? (
                                <TableContainer className={classes.container}>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead></TableHead>
                                        <TableBody>
                                            {data.transactions.transactions.map(
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
                                                                    style={{
                                                                        padding: '0.2rem 0',
                                                                        background:
                                                                            'rgba(255, 255, 255, 1)'
                                                                    }}>
                                                                    <Grid item xs={5}>
                                                                        <Typography
                                                                            variant="body2"
                                                                            className={
                                                                                classes.leftInline
                                                                            }
                                                                            noWrap>
                                                                            Tx#
                                                                            <NavLink
                                                                                href={`transaction/${row.hash}`}
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
                                                                                        ''
                                                                                    )
                                                                                }
                                                                            />
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item xs={7}>
                                                                        <Typography
                                                                            variant="body2"
                                                                            className={
                                                                                classes.alignRight
                                                                            }
                                                                            noWrap
                                                                            color="textSecondary">
                                                                            {row.timestamp ? (
                                                                                moment
                                                                                    .unix(
                                                                                        row.timestamp
                                                                                    )
                                                                                    .format(
                                                                                        'Do MMMM YYYY, h:mm:ss a'
                                                                                    )
                                                                            ) : (
                                                                                <NotAvailable
                                                                                    className={
                                                                                        classes.alignRight
                                                                                    }
                                                                                    variant="body2"
                                                                                />
                                                                            )}
                                                                        </Typography>
                                                                    </Grid>

                                                                    <Grid item xs={4} md={5}>
                                                                        <Typography
                                                                            variant="body2"
                                                                            className={
                                                                                classes.leftInline
                                                                            }
                                                                            noWrap>
                                                                            From
                                                                            {row.from &&
                                                                            row.from.address ? (
                                                                                <NavLink
                                                                                    href={`account/${row.from.address}`}
                                                                                    className={
                                                                                        classes.leftInline
                                                                                    }
                                                                                    name={
                                                                                        row.from &&
                                                                                        row.from
                                                                                            .address ? (
                                                                                            <MiddleEllipsis
                                                                                                text={
                                                                                                    row
                                                                                                        .from
                                                                                                        .address
                                                                                                }
                                                                                            />
                                                                                        ) : (
                                                                                            ''
                                                                                        )
                                                                                    }
                                                                                />
                                                                            ) : null}
                                                                        </Typography>
                                                                    </Grid>

                                                                    <Grid item xs={4} md={5}>
                                                                        <Typography
                                                                            variant="body2"
                                                                            align="left"
                                                                            className={
                                                                                classes.rightInline
                                                                            }
                                                                            noWrap>
                                                                            To
                                                                            {row.to &&
                                                                            row.to.address ? (
                                                                                <NavLink
                                                                                    href={`account/${row.to.address}`}
                                                                                    className={
                                                                                        classes.leftInline
                                                                                    }
                                                                                    name={
                                                                                        <MiddleEllipsis
                                                                                            text={
                                                                                                row
                                                                                                    .to
                                                                                                    .address
                                                                                            }
                                                                                        />
                                                                                    }
                                                                                />
                                                                            ) : (
                                                                                ''
                                                                            )}
                                                                        </Typography>
                                                                    </Grid>

                                                                    <Grid item xs={4} md={2}>
                                                                        {row.value ? (
                                                                            <Typography
                                                                                variant="body1"
                                                                                className={
                                                                                    classes.alignRight
                                                                                }>
                                                                                {new BigNumber(
                                                                                    row.value /
                                                                                        CELO_FRACTION
                                                                                ).toFormat(2) +
                                                                                    ' CELO'}
                                                                            </Typography>
                                                                        ) : (
                                                                            <NotAvailable
                                                                                className={
                                                                                    classes.alignRight
                                                                                }
                                                                                variant="body2"
                                                                            />
                                                                        )}
                                                                    </Grid>

                                                                    <Grid
                                                                        item
                                                                        xs={12}
                                                                        md={9}
                                                                        className={classes.chip}>
                                                                        {row.type &&
                                                                        row.to &&
                                                                        row.to.contract &&
                                                                        row.to.contract.name ? (
                                                                            <Chips
                                                                                type={row.type}
                                                                                contractName={
                                                                                    row.to.contract
                                                                                        .name
                                                                                }
                                                                            />
                                                                        ) : row.type ? (
                                                                            <Chips
                                                                                type={row.type}
                                                                            />
                                                                        ) : null}
                                                                    </Grid>

                                                                    <Grid item xs={12}>
                                                                        <Divider
                                                                            className={
                                                                                classes.divider
                                                                            }
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                }
                                            )}
                                        </TableBody>
                                    </Table>

                                    {pagination === true ? (
                                        <TablePagination
                                            className="pagination"
                                            rowsPerPageOptions={[
                                                ROWXXSMALL,
                                                ROWXSMALL,
                                                ROWSMALL,
                                                ROWMEDIUM,
                                                ROWLARGE,
                                                ROWXLARGE
                                            ]}
                                            component="div"
                                            count={
                                                data &&
                                                data.transactions &&
                                                data.transactions.totalCounts
                                                    ? data.transactions.totalCounts
                                                    : 0
                                            }
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
                                    ) : null}
                                </TableContainer>
                            ) : (
                                ''
                            )}
                        </Paper>
                    </Grid>
                </Grid>
            </>
        );
    else return null as any;
};

export default LatestTransactions;
