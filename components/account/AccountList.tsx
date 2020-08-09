import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '../Link';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import cx from 'clsx';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import theme from '../../themes/celo-theme';
import TablePagination from '@material-ui/core/TablePagination';
import Divider from '@material-ui/core/Divider';
import { GET_ACCOUNTS } from '../query/Account'
import { GET_TOTAL_SUPPLY } from '../query/Chain'
import { useQuery } from "@apollo/client";
import ComponentLoader from '../misc/ComponentLoader';
import NotAvailable from '../misc/NotAvailable'
import ErrorMessage from '../misc/ErrorMessage';
import MiddleEllipsis from '../misc/MiddleEllipsis'
import numbro from "numbro";
import getConfig from 'next/config'

const BigNumber = require('bignumber.js');

interface Column {
  id: 'rank' | 'address' | 'balance' | 'percentage' | 'txsCount';
  label: string;
  align: string;
}

const columns: Column[] = [
  { id: 'rank', label: 'Rank', align: 'left' },
  { id: 'address', label: 'Address', align: 'left' },
  { id: 'balance', label: 'Balance', align: 'right' },
  { id: 'percentage', label: 'Percentage', align: 'right' },
  { id: 'txsCount', label: 'Txs Count', align: 'right' },
];

interface Data {
  rank: string;
  address: string;
  balance: string;
  percentage: string;
  txsCount: string;
}



const useStyles = makeStyles(({ spacing }) => {
  return {
    root: {
      width: '100%',
      overflowY: 'auto',
      padding: "0.5rem"
    },
    container: {
      borderRadius: 5,
      width: '100%',
      overflowY: 'auto'
    },
    box: {
      letterSpacing: '1px',
      padding: "0.5rem",
      display: 'inline-flex',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
    tableCell: {
      overflow: 'auto',
      padding: '0.4rem'
    },
    table: {
      background: '#4D5155',
      padding: '0'
    },
    inline: {
      paddingLeft: '0rem',
    },
    card: {
      padding: '1rem',
      justifyContent: 'center',
      marginBottom: '1rem',
      background: '#43484C',
      alignItems: 'center',
      borderRadius: 5,
      boxShadow: '0 2px 4px 0 rgba(138, 148, 159, 0.2)',
      '& > *:nth-child(1)': {
        marginRight: spacing(2),
      },
      '& > *:nth-child(2)': {
        flex: 'auto',
      },

    },
    divider: {
      margin: '0.5rem',
      backgroundColor: "rgba(62, 67, 71, 1)",
    },
  }
});



const AccountList = () => {
  const classes = useStyles();
  const { publicRuntimeConfig } = getConfig()

  const [page, setPage] = React.useState(publicRuntimeConfig.setPage);
  const [pageSize, setPageSize] = React.useState(publicRuntimeConfig.rowMedium)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageSize(+event.target.value);
    setPage(publicRuntimeConfig.setPage);
  };

  const { loading, error, data } = useQuery(GET_ACCOUNTS, {
    variables: { pageSize, page },
  });

  const totalSupply = useQuery(GET_TOTAL_SUPPLY, {
  });



  if (loading) return <ComponentLoader />
  if (error) return <ErrorMessage message={error.message} />

  return (
    <Grid container>
      <Grid item xs={12} >
        <Paper className={classes.root}>
          <Typography variant="body1" className={classes.box} >
            Accounts </Typography>
          <TableContainer className={classes.container}>
            <Paper className={classes.tableCell}>
              <Table >
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        className={classes.table}
                        padding="checkbox"
                      >
                        <Typography variant="body2" noWrap className={classes.tableCell}>{column.label}</Typography>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.accounts.accounts.map((row: any, index: number) => {
                    return (
                      <TableRow key={index} >
                        <TableCell component="th" scope="row" padding="checkbox" align="left" className={classes.tableCell} >
                          <Typography variant="body2" noWrap> {index + 1}</Typography>
                        </TableCell>
                        {row.address ?
                          <TableCell align="left" padding="checkbox" className={classes.tableCell}>
                            <Link
                              href="/account/[account]/"
                              as={`/account/${row.address}`}
                              color="secondary"
                            >
                              <Typography variant="body2" noWrap>
                                <MiddleEllipsis text={row.address} />
                              </Typography>
                            </Link>
                          </TableCell>
                          : <NotAvailable variant="body2" />}
                        <TableCell align="right" padding="checkbox" className={classes.tableCell}>
                          {row.balance ?
                            <Typography variant="body2" noWrap>
                              {BigNumber.prototype.toFormat.call(
                                new BigNumber(row.balance)
                              )} CELO
                              </Typography>
                            : <NotAvailable variant="body2" />}
                        </TableCell>
                        <TableCell align="right" padding="checkbox" className={classes.tableCell}>
                          {row.balance && totalSupply && totalSupply.data && totalSupply.data.chain && totalSupply.data.chain.cUSDTotalSupply ?
                            <Typography variant="body2" noWrap>{numbro((row.balance / totalSupply.data.chain.cUSDTotalSupply) * 100).format("0.0000000")}</Typography>
                            : <NotAvailable variant="body2" />}
                        </TableCell>
                        <TableCell align="right" padding="checkbox" className={classes.tableCell}>
                          {row.txCount ?
                            <Typography variant="body2" noWrap >{numbro(row.txCount).format("0,000")}</Typography>
                            : '0'}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[publicRuntimeConfig.rowSmall, publicRuntimeConfig.rowMedium, publicRuntimeConfig.rowLarge, publicRuntimeConfig.rowXlarge,]}
            component="div"
            count={data.accounts.totalCounts}
            rowsPerPage={pageSize}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            backIconButtonProps={{
              'aria-label': 'Previous',
              'disabled': page === 1,
            }}
            nextIconButtonProps={{
              'aria-label': 'Next',
            }}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default AccountList