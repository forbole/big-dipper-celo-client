import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '../components/Link';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import cx from 'clsx';
import Card from '@material-ui/core/Card';
import Layout from '../components/Layout';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import theme from '../themes/dark-theme';
import TablePagination from '@material-ui/core/TablePagination';


interface Column {
  id: 'height' | 'miner' | 'txs' | 'gasUsed' | 'gasLimit'| 'time';
  label: string;
  minWidth?: number;
//   format?: (value: number) => string;
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
  },
  container: {
    maxHeight: 440,
    //padding: 'checkbox',
    borderRadius: 5,
    width: '100%'
  },

  inline:{
    paddingLeft: '0rem',
  },
  card: {
    padding: '1rem',
    justifyContent: 'center',
    margin: '1rem',
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
    }
  }
});


  

function DisplayCard() {
    const classes = useStyles();
    return (
    <Card className={cx(classes.card)} elevation={0}>
    <Grid container spacing={1} justify="center" >
    <Grid item xs={6}  >
      <Typography align='left' variant="body1" >cGLD Price</Typography>
      </Grid>
      <Grid item xs={6}  >
      <Typography align='right' variant="body1" >$2.8</Typography>
      </Grid>
      <Grid item xs={6}  className={classes.inline}>
      <Typography align='left' variant="body1" >Market Cap</Typography>
      </Grid>
      <Grid item xs={6}  className={classes.inline}>
      <Typography align='right' variant="body1" >$10,413,896</Typography>
      </Grid>
    </Grid>
    </Card>
    );
}


export default function Blocks() {
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
    <Layout>
      <Hidden smUp>
    <DisplayCard />
    </Hidden>
    <Paper className={classes.root}>
  <Typography variant="body1" className={classes.box} >
              Latest Blocks </Typography>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align="left"
                  className={classes.inline}
                  padding="checkbox" 
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow key={row.height} >
            <TableCell component="th" scope="row" padding="checkbox" align="left" >
            <Link href="#"  color="secondary"  >
              {row.height}
              </Link>
            </TableCell>
            <TableCell align="left" padding="checkbox" >
            <Link href="#" color="secondary" >
              {row.miner}
              </Link>
              </TableCell>
            <TableCell align="left" padding="checkbox" >{row.txs}</TableCell>
            <TableCell align="left" padding="checkbox" >{row.gasUsed}</TableCell>
            <TableCell align="left" padding="checkbox" >{row.gasLimit}</TableCell>
            <TableCell align="left" padding="checkbox">{row.time}</TableCell>
          </TableRow>
              );
            })}
          </TableBody>
        </Table>
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
    </Layout>

);
}