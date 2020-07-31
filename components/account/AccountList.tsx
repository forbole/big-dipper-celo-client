import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '../Link';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import cx from 'clsx';
import Card from '@material-ui/core/Card';
import Layout from '../Layout';
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
import { useQuery } from "@apollo/react-hooks";
import ComponentLoader from '../misc/ComponentLoader';
import NotAvailable from '../misc/NotAvailable'
import ErrorMessage from '../misc/ErrorMessage';
import MiddleEllipsis from '../misc/MiddleEllipsis'
import numbro from "numbro";


interface Column {
  id: 'rank' | 'address' | 'balance' | 'percentage' | 'txsCount';
  label: string;
}

const columns: Column[] = [
  { id: 'rank', label: 'Rank', },
  { id: 'address', label: 'Address', },
  { id: 'balance', label: 'Balance', },
  { id: 'percentage', label: 'Percentage', },
  { id: 'txsCount', label: 'Txs Count', },
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
      overflowY: 'auto'
    },
    container: {
      borderRadius: 5,
      width: '100%',
      overflowY: 'auto'
    },
    box: {
      letterSpacing: '1px',
      padding: '1rem 0 0.5rem 1rem',
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
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(16);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { loading, error, data } = useQuery(GET_ACCOUNTS, {
  });

  if (loading) return <ComponentLoader />
  if (error) return <ErrorMessage message={error.message} />

  return (
    <Grid container  >
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
                        align="left"
                        className={classes.table}
                        padding="checkbox"
                      >
                        <Typography variant="body2" noWrap className={classes.tableCell}>{column.label}</Typography>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.accounts.accounts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any, index: number) => {
                    return (
                      <TableRow key={index} >
                        <TableCell component="th" scope="row" padding="checkbox" align="left" className={classes.tableCell} >
                          <Typography variant="body2" noWrap> {index + 1}</Typography>
                        </TableCell>
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
                        <TableCell align="left" padding="checkbox" className={classes.tableCell}>
                          <Typography variant="body2" noWrap>{numbro((row.balance).toLocaleString('fullwide')).format("0.000000")} cGLD</Typography>
                        </TableCell>
                        <TableCell align="left" padding="checkbox" className={classes.tableCell}>
                          <Typography variant="body2" noWrap>{row.percentage}</Typography>
                        </TableCell>
                        <TableCell align="left" padding="checkbox" className={classes.tableCell}>
                          <Typography variant="body2" noWrap>{row.txsCount}</Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={data.accounts.accounts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default AccountList