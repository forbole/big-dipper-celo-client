import React, { useEffect } from 'react';
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
import Chips from '../Chips';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useMediaQuery from '@material-ui/core/useMediaQuery';

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
  createData(' 0xd3b4592hfh..', '0xd3b92hdsdf..', '0xd3bretretretert4592hdsw12df..', '2 mins ago', 'Contract Call', '3023412.22 cGLD'),
  createData(' 0xd3b4882hfh..', '0x98b45d12df..', '0xd3b4592hdsw12df..', '5 mins ago', 'Token Transfer', '3023412.22 cGLD'),
  createData(' 0xdsdb4592hfh..', '0xd6hdsw12df..', '0xd3b4592hdsw12df..', '1 mins ago', 'Contract Call', '603412.22 cGLD'),
  createData(' 0xd3b4592hfh..', '0xd3dsw12df..', '0xd3b4592hdsw12df..', '3 mins ago', 'Contract Call', '7023412.22 cGLD'),
  createData(' 0xd3b4592hfh..', '0xd3hdsw12df..', '0xd3b4592hdsw12df..', '8 mins ago', 'Contract Call', '5023412.22 cGLD'),
  createData(' 0xd3b4592hfh..', '0xd392hdsw12df..', '0xd3b4592hdsw12df..', '6 mins ago', 'Contract Call', '8023412.22 cGLD'),
  createData(' 0xd3b4592hfh..', '0xd392hdsw12df..', '0xd3b4592hdsw12df..', '2 mins ago', 'Contract Call', '24023412.22 cGLD'),
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

    txPadding: {
      display: 'flex',
      overflow: 'auto',
      padding: '0 0 0 0.5rem',
    },
    divider: {
      margin: '0.5rem 0 0 0',
      backgroundColor: "rgba(62, 67, 71, 1)",
    },

  }
});




const AccountTransactions = () => {
  const rowsOption1 = 10;
  const rowsOption2 = 30;
  const rowsOption3 = 50;

  const classes = useStyles();
  const theme = useTheme();
  const largeScreen = useMediaQuery(theme.breakpoints.up('sm'));
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5)

  useEffect(() => {
    if (largeScreen) {
      setPageSize(10)
    }
    else {
      setPageSize(5)
    }
  })

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
        <Typography variant="body1" > Transactions {"(1000)"}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.root}>
        <Grid container >
          <Divider variant='middle' />
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
              </TableHead>
              <TableBody>
                {rows.map((row: any, index: number) => {
                  return (
                    <TableRow key={index} >
                      <TableCell component="th" scope="row" padding="checkbox"  >
                        <Grid container spacing={1} style={{ padding: '0.5rem 0' }}>
                          <Grid item xs={8}>

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



                          <Grid item xs={6} >
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

export default AccountTransactions