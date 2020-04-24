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
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Divider } from '@material-ui/core';


const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: 0
      },
  container: {
    padding: 0
  },
  box:{
    fontSize: 18,
    letterSpacing: '1px',
    padding: 10,
    display: 'block',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  link:{
    float: 'right',
    textAlign: 'right',

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
    <Grid container spacing={1} style={{ marginTop: 10, marginBottom: 10}} >
    <Grid item xs={12} md={12} lg={12} >
    <TableContainer component={Paper}>
        <Box className={classes.box}>Latest Blocks  <Link className={classes.link} href="#" onClick={preventDefault} color="secondary">
    {'view more'}
  </Link>
        </Box>
        <Divider variant='middle' />
      <Table  size="small" aria-label="a dense table">
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
              <Link href="#" onClick={preventDefault} color="secondary"  align="right" >
                {row.height}
                </Link>
              </TableCell>
              <TableCell align="right">
              <Link href="#" onClick={preventDefault} color="secondary"  align="right" >
                {row.miner}
                </Link>
                </TableCell>
              <TableCell align="right">{row.txs}</TableCell>
              <TableCell align="right">{row.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Grid>
    </Grid>
  );
}