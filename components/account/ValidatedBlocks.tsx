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
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';


interface Column {
  id: 'height' | 'miner' | 'txs' | 'gasUsed' | 'gasLimit' | 'time';
  label: string;
}

const columns: Column[] = [
  { id: 'height', label: 'Height', },
  { id: 'miner', label: 'Validator', },
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
  return { height, miner, txs, gasUsed, gasLimit, time };
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
    box: {
      letterSpacing: '1px',
      padding: '1rem',
      display: 'inline-flex',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
    time: {
      padding: '0.01em',
      margin: '0.5em'
    },
    tableCell: {
      overflow: 'auto',
      padding: '0 0.5rem'
    },
    table: {
      background: '#4D5155',
      padding: '0'
    },

    divider: {
      backgroundColor: "rgba(62, 67, 71, 1)",
    }
  }
});




const ValidatedBlocks = () => {
  const rowsOption1 = 10;
  const rowsOption2 = 30;
  const rowsOption3 = 50;

  const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageSize(+event.target.value);
    setPage(0);
  };

  return (

    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="body1" >Validated Blocks</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.root}>
        <Grid container >
          <Divider variant='middle' className={classes.divider} />
          <TableContainer className={classes.container}>
            <Paper className={classes.tableCell}>
              <Table >
                <TableHead>
                  <TableRow>
                    {columns.map((column: any, index: number) => (
                      <TableCell
                        key={index}
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
                  {rows.map((row: any, index: number) => {
                    return (
                      <TableRow key={index} >
                        <TableCell component="th" scope="row" padding="checkbox" align="left" className={classes.tableCell} >
                          <Link href="#" color="secondary"  >
                            <Typography variant="body2" noWrap> {row.height}</Typography>
                          </Link>
                        </TableCell>
                        <TableCell align="left" padding="checkbox" className={classes.tableCell}>
                          <Link href="#" color="secondary" >
                            <Typography variant="body2" noWrap>{row.miner}</Typography>
                          </Link>
                        </TableCell>
                        <TableCell align="left" padding="checkbox" className={classes.tableCell}>
                          <Typography variant="body2" noWrap>{row.txs}</Typography>
                        </TableCell>
                        <TableCell align="left" padding="checkbox" className={classes.tableCell}>
                          <Typography variant="body2" noWrap>{row.gasUsed}</Typography>
                        </TableCell>
                        <TableCell align="left" padding="checkbox" className={classes.tableCell}>
                          <Typography variant="body2" noWrap>{row.gasLimit}</Typography>
                        </TableCell>
                        <TableCell align="left" padding="checkbox" >
                          <Typography variant="body2" noWrap>{row.time}</Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[rowsOption1, rowsOption2, rowsOption3]}
            component="div"
            count={rows.length}
            rowsPerPage={pageSize}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

export default ValidatedBlocks