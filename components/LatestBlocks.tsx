import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Link from '../components/Link';
import Grid from '@material-ui/core/Grid';
import { Divider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';



const useStyles = makeStyles({
    root: {
        padding: '0 0 1rem 0',
        display: "inline-flex",
        overflowY: 'auto'

    },
    box:{
        letterSpacing: '1px',
        padding: '1rem',
        display: 'block',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
    },
    link:{
        float: 'right',
        textAlign: 'right',

    },
    divider: {
      padding: '0 1rem'
    },

    cell:{
      maxHeight: '1rem',
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
    <span  >
    <Grid container  xs={12} md={12} lg={6} className={classes.root} >
    <Grid item xs={12} >
    <TableContainer component={Paper} >
        <Typography variant="body1" className={classes.box} >
        Latest Blocks
       <Link href="/blocks" className={classes.link} color="secondary">
    {'view more'}
  </Link>
  </Typography> 
        <Divider variant='middle' className={classes.divider} />
      <Table  size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Height</TableCell>
            <TableCell align="left">Miner</TableCell>
            <TableCell align="left">Txs</TableCell>
            <TableCell align="left">Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.height}>
              <TableCell component="th" scope="row"  align="left" size='small' >
              <Link href="#" onClick={preventDefault} color="secondary" >
              <Typography variant="caption" noWrap >{row.height}</Typography>
                </Link>
              </TableCell>
              <TableCell align="left" size='small' >
              <Link href="#" onClick={preventDefault} color="secondary" >
              <Typography variant="caption" noWrap>{row.miner}</Typography>
                </Link>
                </TableCell>
              <TableCell align="left" size='small' >
                <Typography variant="caption" noWrap>{row.txs}</Typography>
              </TableCell>
              <TableCell size='small' align="left">
              <Typography variant="caption" noWrap>{row.time}</Typography>
            </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Grid>
    </Grid>
    </span>
  );
}