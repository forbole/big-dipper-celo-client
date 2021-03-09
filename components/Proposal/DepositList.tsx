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
import moment from 'moment';
import React from 'react';

import { GET_PROPOSAL } from '../Query/Proposal';
import ComponentLoader from '../Utils/ComponentLoader';
import NavLink from '../Utils/NavLink';
import NotAvailable from '../Utils/NotAvailable';
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
            padding: '0.5rem',
            border: 'none'
        },
        table: {
            background: 'rgba(246, 247, 249, 1)',
            padding: '0',
            border: 'none'
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

type DepositListProps = { proposal: number };

const DepositList = ({ proposal }: DepositListProps): JSX.Element => {
    const SETPAGE = process.env.SETPAGE ? parseInt(process.env.SETPAGE) : 0;
    const ROWXXSMALL = process.env.ROWXXSMALL ? parseInt(process.env.ROWXXSMALL) : 5;
    const ROWXSMALL = process.env.ROWXSMALL ? parseInt(process.env.ROWXSMALL) : 10;
    const ROWSMALL = process.env.ROWSMALL ? parseInt(process.env.ROWSMALL) : 15;
    const ROWMEDIUM = process.env.ROWMEDIUM ? parseInt(process.env.ROWMEDIUM) : 30;
    const ROWLARGE = process.env.ROWLARGE ? parseInt(process.env.ROWLARGE) : 50;
    const ROWXLARGE = process.env.ROWXLARGE ? parseInt(process.env.ROWXLARGE) : 100;
    const CELO_FRACTION = process.env.CELO_FRACTION ? parseInt(process.env.CELO_FRACTION) : 1e18;

    const [pageNumber, setPageNumber] = React.useState(SETPAGE);
    const [pageSize, setPageSize] = React.useState(ROWXSMALL);

    const classes = useStyles();
    const page = pageNumber;
    const proposalNumber = proposal;
    let totalDeposited = 0;

    const handleChangePage = (event: unknown, newPage: number) => {
        setPageNumber(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPageSize(+event.target.value);
        setPageNumber(SETPAGE);
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { loading, error, data } = useQuery(GET_PROPOSAL, {
        variables: { proposalNumber }
    });

    const calculateTotalDeposited = () => {
        if (data?.proposal?.upvoteList) {
            for (const c in data?.proposal?.upvoteList) {
                if (data?.proposal?.upvoteList[c]?.returnValues?.upvotes) {
                    totalDeposited =
                        totalDeposited +
                        data?.proposal?.upvoteList[c]?.returnValues?.upvotes / CELO_FRACTION;
                }
            }
        }
        return new BigNumber(totalDeposited).toFormat(2);
    };

    if (loading) return <ComponentLoader />;

    return (
        <Grid container spacing={1} justify="center" className={classes.container}>
            <Paper className={classes.paper}>
                <TableContainer>
                    <Typography
                        color="textPrimary"
                        variant="subtitle1"
                        className={classes.headerLabel}>
                        Deposit ({calculateTotalDeposited()})
                    </Typography>

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
                            {data?.proposal?.upvoteList
                                ? Object.keys(data?.proposal?.upvoteList)
                                      .slice(page * pageSize, page * pageSize + pageSize)
                                      .map(function (row: any, index: number) {
                                          return (
                                              <TableRow
                                                  key={index}
                                                  style={
                                                      index % 2
                                                          ? {
                                                                background:
                                                                    'rgba(248, 248, 248, 1)',
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
                                                      {data?.proposal?.upvoteList[row]?.returnValues
                                                          ?.account ? (
                                                          <NavLink
                                                              href={`/account/${data?.proposal?.upvoteList[row]?.returnValues?.account}`}
                                                              name={
                                                                  <Typography
                                                                      variant="body2"
                                                                      noWrap>
                                                                      {
                                                                          data?.proposal
                                                                              ?.upvoteList[row]
                                                                              ?.returnValues
                                                                              ?.account
                                                                      }
                                                                  </Typography>
                                                              }
                                                          />
                                                      ) : (
                                                          <NotAvailable variant="body2" />
                                                      )}
                                                  </TableCell>
                                                  <TableCell
                                                      align="right"
                                                      padding="checkbox"
                                                      className={classes.tableCell}>
                                                      {data?.proposal?.upvoteList[row]?.returnValues
                                                          ?.upvotes ? (
                                                          <Typography
                                                              variant="body2"
                                                              noWrap
                                                              color="textPrimary">
                                                              {new BigNumber(
                                                                  data?.proposal?.upvoteList[
                                                                      row
                                                                  ]?.returnValues?.upvotes
                                                              )
                                                                  .dividedBy(CELO_FRACTION)
                                                                  .toFormat(2)}{' '}
                                                          </Typography>
                                                      ) : (
                                                          <NotAvailable variant="body2" />
                                                      )}
                                                  </TableCell>
                                                  <TableCell
                                                      align="right"
                                                      padding="checkbox"
                                                      className={classes.tableCell}>
                                                      {data?.proposal?.upvoteList[row]
                                                          ?.timestamp ? (
                                                          <Typography
                                                              variant="body2"
                                                              noWrap
                                                              color="textPrimary">
                                                              {moment
                                                                  .unix(
                                                                      data?.proposal?.upvoteList[
                                                                          row
                                                                      ]?.timestamp
                                                                  )
                                                                  .format(
                                                                      'Do MMMM YYYY, h:mm:ss a'
                                                                  )}
                                                          </Typography>
                                                      ) : (
                                                          <NotAvailable variant="body2" />
                                                      )}
                                                  </TableCell>
                                              </TableRow>
                                          );
                                      })
                                : null}
                        </TableBody>
                    </Table>
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
                    count={
                        data?.proposal?.upvoteList
                            ? Object.keys(data?.proposal?.upvoteList).length
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
            </Paper>
        </Grid>
    );
};

export default DepositList;
