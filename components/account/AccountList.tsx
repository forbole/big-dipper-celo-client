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


interface Column {
  id: 'rank' | 'moniker' | 'balance' | 'percentage' | 'txsCount';
  label: string;
}

const columns: Column[] = [
  { id: 'rank', label: 'Rank', },
  { id: 'moniker', label: 'Moniker', },
  { id: 'balance', label: 'Balance',},
  { id: 'percentage', label: 'Percentage',},
  { id: 'txsCount',label: 'Txs Count', },
];

interface Data {
    rank: string;
    moniker: string;
    balance: string;
    percentage: string;
    txsCount: string;
}

function createData(rank: string, moniker: string, balance: string, percentage: string, txsCount: string) {
    return { rank, moniker, balance, percentage, txsCount};
  }

  const rows = [
    createData('1', 'Michelle Cl…', '12,859.009432 cGLD', '6%', '19' ),
    createData('2', 'Rachel Hug…', '11,374.009573 cGLD', '5%', '24'),
    createData('3', 'Will Chavez', '10,384.395824 cGLD', '9%', '65'),
    createData('4', 'Will Gibson', '10,384.395824 cGLD', '6%', '444'),
    createData('5', 'Pamela', '6,937.009423 cGLD', '12%', '22'),
    createData('6', 'Michelle Cl…', '8,998.039425 cGLD', '10%', '114' ),
    createData('7', 'Rachel Hug…', '6,937.009423 cGLD', '9%', '787' ),
    createData('8', 'Will Chavez', '10,004.958632 cGLD', '2%', '78'),
    createData('9', 'Will Gibson', '12,859.009432 cGLD', '1%', '5' ),
    createData('10', 'Pamela',  '10,004.958631 cGLD', '6%', '22'),
    createData('11', 'Michelle Cl…', '6,937.009423 cGLD', '7%', '35'),
    createData('12', 'Rachel Hug…', '10,004.958632 cGLD', '8%', '67'),
    createData('13', 'Will Chavez', '10,104.958632 cGLD', '1%', '42'),
    createData('14', 'Will Gibson', '6,937.009423 cGLD', '4%', '12'),
    createData('15', 'Pamela', '10,344.958632 cGLD','5%' ,'76' ),
    createData('16', 'Michelle Cl…', '6,937.009423 cGLD', '6%', '45'),
    createData('17', 'Rachel Hug…', '10,004.958632 cGLD', '14%', '34'),
    createData('18', 'Will Chavez', '12,859.009431 cGLD', '11%', '37'),
    createData('19', 'Will Gibson', '6,937.009423 cGLD', '18%', '57'),
    createData('20', 'Pamela',  '10,004.958636 cGLD', '12%', '17'),
  ];
  

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
        box:{
          letterSpacing: '1px',
          padding: '1rem',
          display: 'inline-flex',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        },
        tableCell:{
            overflow: 'auto',
            padding: '0.4rem'
        },
        table:{
            background: '#4D5155',
            padding: '0'
        },
        inline:{
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

          blocks:{
            // padding: '1.5%',
          },

          divider:{
            margin: '0.5rem',
        },
      }
});



export default function AccountList() {
const classes = useStyles();
const [page, setPage] = React.useState(0);
const [rowsPerPage, setRowsPerPage] = React.useState(10);

const handleChangePage = (event: unknown, newPage: number) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
  setRowsPerPage(+event.target.value);
  setPage(0);
};

return (
<Grid container className={classes.blocks}>
  <Grid item xs={12} >
  <Paper className={classes.root}>
<Typography variant="body1" className={classes.box} >
            Accounts </Typography>
            <Divider variant='middle' className={classes.divider}/>
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
          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
            return (
              <TableRow key={row.rank} >
          <TableCell component="th" scope="row" padding="checkbox" align="left" className={classes.tableCell} >
          <Link href="#"  color="secondary"  >
          <Typography variant="body2"  noWrap> {row.rank}</Typography>
            </Link>
          </TableCell>
          <TableCell align="left" padding="checkbox" className={classes.tableCell}>
          <Link href="#" color="secondary" >
          <Typography variant="body2" noWrap>{row.moniker}</Typography>
            </Link>
            </TableCell>
          <TableCell align="left" padding="checkbox" className={classes.tableCell}>
          <Typography variant="body2" noWrap>{row.balance}</Typography>
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
      count={rows.length}
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