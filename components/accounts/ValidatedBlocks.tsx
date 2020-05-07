import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '../Link';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import cx from 'clsx';
import Card from '@material-ui/core/Card';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';


interface Column {
  id: 'height' | 'miner' | 'txs' | 'gasUsed' | 'gasLimit'| 'time';
  label: string;
}

const columns: Column[] = [
  { id: 'height', label: 'Height', },
  { id: 'miner', label: 'Miner', },
  {
    id: 'txs',
    label: 'Txs',
  },
  {
    id: 'gasUsed',
    label: 'Gas Used', 
  },
  {
    id: 'gasLimit',
    label: 'Gas Limit',
  },
  {
    id: 'time',
    label: 'Time',
  },
];

interface Data {
    height: string;
    miner: string;
    txs: string;
    gasUsed: string;
    gasLimit: string;
    time: string;
}

function createData(height: string, miner: string, txs: string, gasUsed: string, gasLimit: string, time: string) {
    return { height, miner, txs, gasUsed, gasLimit, time};
  }

  const rows = [
    createData('1087144', 'Michelle Cl…', '7', '1215', '548946', '14s ago'),
    createData('1087143', 'Rachel Hug…', '0', '54889', '5484894', '2 mins ago'),
    createData('1087142', 'Will Chavez', '8', '4515868', '656888', '2 mins ago'),
    createData('1087141', 'Will Gibson', '128', '56165', '646868', '2 mins ago'),
    createData('1087140', 'Pamela', '10', '34685468', '54684', '2 mins ago'),
    createData('1087144', 'Michelle Cl…', '7', '1215', '548946', '14s ago'),
    createData('1087143', 'Rachel Hug…', '0', '54889', '5484894', '2 mins ago'),
    createData('1087142', 'Will Chavez', '8', '4515868', '656888', '2 mins ago'),
    createData('1087141', 'Will Gibson', '128', '56165', '646868', '2 mins ago'),
    createData('1087140', 'Pamela', '10', '34685468', '54684', '2 mins ago'),
    createData('1087144', 'Michelle Cl…', '7', '1215', '548946', '14s ago'),
    createData('1087143', 'Rachel Hug…', '0', '54889', '5484894', '2 mins ago'),
    createData('1087142', 'Will Chavez', '8', '4515868', '656888', '2 mins ago'),
    createData('1087141', 'Will Gibson', '128', '56165', '646868', '2 mins ago'),
    createData('1087140', 'Pamela', '10', '34685468', '54684', '2 mins ago'),
    createData('1087144', 'Michelle Cl…', '7', '1215', '548946', '14s ago'),
    createData('1087143', 'Rachel Hug…', '0', '54889', '5484894', '2 mins ago'),
    createData('1087142', 'Will Chavez', '8', '4515868', '656888', '2 mins ago'),
    createData('1087141', 'Will Gibson', '128', '56165', '646868', '2 mins ago'),
    createData('1087140', 'Pamela', '10', '34685468', '54684', '2 mins ago'),
  ];
  

const useStyles = makeStyles(({ spacing }) => {
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
        box:{
            letterSpacing: '1px',
            padding: '1rem',
            display: 'inline-flex',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
        },
        time:{
            padding: '0.01em',
            margin: '0.5em'
        },
        tableCell:{
            overflow: 'auto',
            padding: '0 0.5rem'
        },
        table:{
            background: '#4D5155',
            padding: '0'
        }
  }
});

 


export default function ValidatedBlocks() {
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

    <Paper className={classes.root}>
  <Typography variant="body1" className={classes.box} >
              Validated Blocks </Typography>
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
                  <Typography variant="caption" noWrap className={classes.tableCell}>{column.label}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow key={row.height} >
            <TableCell component="th" scope="row" padding="checkbox" align="left" className={classes.tableCell} >
            <Link href="#"  color="secondary"  >
            <Typography variant="caption"  noWrap> {row.height}</Typography>
              </Link>
            </TableCell>
            <TableCell align="left" padding="checkbox" className={classes.tableCell}>
            <Link href="#" color="secondary" >
            <Typography variant="caption" noWrap>{row.miner}</Typography>
              </Link>
              </TableCell>
            <TableCell align="left" padding="checkbox" className={classes.tableCell}>
            <Typography variant="caption" noWrap>{row.txs}</Typography>
            </TableCell>
            <TableCell align="left" padding="checkbox" className={classes.tableCell}>
            <Typography variant="caption" noWrap>{row.gasUsed}</Typography>
            </TableCell>
            <TableCell align="left" padding="checkbox" className={classes.tableCell}>
            <Typography variant="caption" noWrap>{row.gasLimit}</Typography>
            </TableCell>
            <TableCell align="left" padding="checkbox" >
            <Typography variant="caption" noWrap>{row.time}</Typography>
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
);
}