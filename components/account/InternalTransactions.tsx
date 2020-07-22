import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '../Link';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import Divider from '@material-ui/core/Divider';
import Chips from '../Chips';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

interface Data {
  tx: string;
  from: string;
  to: string;
  time: string;
  chip: string;
  total: string;
}

function createData(tx: string, from: string, to: string, time: string, chip: string, total: string) {
  return { tx, from, to, time, chip, total };
}

const rows = [
  createData(' 0xd3b4592hfh..', '0xd3b4dsdf..', '0xd3b4592hdsw12df..', '2 mins ago', 'Delegate All', '3023412.22 cGLD'),
  createData(' 0xd3b4882hfh..', '0x98b45912df..', '0xd3b4592hdsw12df..', '5 mins ago', 'Static Call', '3023412.22 cGLD'),
  createData(' 0xdsdb4592hfh..', '0xd6547f..', '0xd3b4592hdsw12df..', '1 mins ago', 'Create', '603412.22 cGLD'),
  createData(' 0xd3b4592hfh..', '0xd3b2hw12df..', '0xd3b4592hdsw12df..', '3 mins ago', 'Static Call', '7023412.22 cGLD'),
  createData(' 0xd3b4592hfh..', '0xd3b2hw12df..', '0xd3b4592hdsw12df..', '8 mins ago', 'Delegate All', '5023412.22 cGLD'),
  createData(' 0xd3b4592hfh..', '0xd392hdsw12df..', '0xd3b4592hdsw12df..', '6 mins ago', 'Static Call', '8023412.22 cGLD'),
  createData(' 0xd3b4592hfh..', '0xd392hdsw12df..', '0xd3b4592hdsw12df..', '2 mins ago', 'Static Call', '24023412.22 cGLD'),
];


const useStyles = makeStyles(({ spacing }) => {
  return {
    root: {
      borderRadius: 5,
      padding: '0',
      width: '100%',
    },
    container: {
      borderRadius: 5,
      width: '100%'
    },
    txPadding: {
      display: 'flex',
      overflow: 'auto',
      padding: '0 0 0 0.5rem',
    },
    leftInline: {
      display: 'flex',
      overflow: 'auto',
      padding: '0 0 0 1rem',
    },
    rightInline: {
      display: 'flex',
      overflow: 'auto',
      padding: '0 1rem 0 0',
      align: 'right'
    },

    box: {
      letterSpacing: '1px',
      padding: '1rem',
      display: 'block',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
    chip: {
      display: 'block',
      marginLeft: '1rem',
    },
    alignRight: {
      paddingRight: '1rem',
      float: 'right',
    },
    divider: {
      margin: '0.5rem 0 0 0',
      backgroundColor: "rgba(62, 67, 71, 1)",
    },

  }
});




const InternalTransactions = () => {

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="internal-transactions"
        id="internal-transactions"
      >
        <Typography variant="body1"> Internal Transactions (10)</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.root}>
        <Grid container >
          <Divider variant='middle' />
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="internal-transactions table">
              <TableHead>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return (
                    <TableRow key={row.tx} >
                      <TableCell component="th" scope="row" padding="checkbox"  >
                        <Grid container spacing={1} style={{ padding: '0.5rem 0' }}>
                          <Grid item xs={8} >

                            <Typography variant="body2" className={classes.leftInline}>
                              Tx#   <Link href="#" color="secondary" className={classes.leftInline}>
                                {row.tx}
                              </Link>
                            </Typography>
                          </Grid>
                          <Grid item xs={4} >
                            <Typography variant="body2" className={classes.alignRight}>
                              {row.time}
                            </Typography>
                          </Grid>

                          <Grid item xs={5} md={4} >
                            <Typography variant="body2" className={classes.leftInline}>
                              From  <Link href="#" color="secondary" className={classes.txPadding} >
                                {row.from}
                              </Link>
                            </Typography>
                          </Grid>

                          <Grid item xs={7} md={8}>
                            <Typography variant="body2" align='left' className={classes.rightInline}>
                              To  <Link href="#" color="secondary" className={classes.txPadding}>
                                {row.to}
                              </Link>
                            </Typography>
                          </Grid>

                          <Grid item xs={6}  >
                            <Typography variant="body2" className={classes.chip}>
                              <Chips value={row.chip} />
                            </Typography>

                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" className={classes.alignRight} >
                              {row.total}
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>

                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

export default InternalTransactions