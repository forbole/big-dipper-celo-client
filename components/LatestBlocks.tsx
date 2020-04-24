import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';




const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: 0
      },
  table: {
    minWidth: 100,
    
  },
  container: {
    padding: 0
  },
  box:{
    fontSize: 18,
    letterSpacing: '1px',
    padding: 10,
    display: 'inline-block',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  }
});

function createData(height: string, miner: string, txs: string, time: string) {
  return { height, miner, txs, time};
}

const rows = [
  createData('1087144', 'Michelle Cl…', '7', '14 s ago'),
  createData('1087143', 'Rachel Hug…', '0', '2 mins ago'),
  createData('1087142', 'Will Chavez', '8', '2 mins ago'),
  createData('1087141', 'Will Gibson', '128', '2 mins ago'),
  createData('1087140', 'Pamela', '10', '2 mins ago'),
];

export default function DenseTable() {
  const classes = useStyles();
  const preventDefault = (event: React.SyntheticEvent) => event.preventDefault();
  return (
      <Container style={{ marginTop: 10 }}>
    <TableContainer component={Paper}>
        <Box className={classes.box}>Latest Blocks  <Link href="#" onClick={preventDefault} color="secondary"  style={{ textAlign: 'right' }}>
    {'view more'}
  </Link>
        </Box>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Height</TableCell>
            <TableCell align="right">Miner</TableCell>
            <TableCell align="right">Txs</TableCell>
            <TableCell align="right">Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.height}>
              <TableCell component="th" scope="row">
                {row.height}
              </TableCell>
              <TableCell align="right">{row.miner}</TableCell>
              <TableCell align="right">{row.txs}</TableCell>
              <TableCell align="right">{row.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
}