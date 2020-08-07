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
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { GET_ACCOUNT_TX } from '../query/Transaction'
import ComponentLoader from '../misc/ComponentLoader';
import NotAvailable from '../misc/NotAvailable';
import ErrorMessage from '../misc/ErrorMessage';
import { useQuery } from "@apollo/client";
import MiddleEllipsis from '../misc/MiddleEllipsis'
import moment from "moment";


interface Data {
  tx: string;
  from: string;
  to: string;
  time: string;
  chip: string;
  total: string;
}



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
    icon: {
      fill: "rgba(255,255,255,1)",
    },
  }
});

type AppProps = { address: string };
moment.relativeTimeThreshold("s", 59);
moment.relativeTimeThreshold("ss", 3);

const AccountTransactions = ({ address }: AppProps) => {
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

  const { loading, error, data } = useQuery(GET_ACCOUNT_TX, {
    variables: { address },
    pollInterval: 5000,
  });

  if (loading) return <ComponentLoader />
  if (error) return <ErrorMessage message={error.message} />

  return (

    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon className={classes.icon} />}
        aria-controls="accountTransactionsPanel"
        id="accountTransactionsPanel"
      >
        <Typography variant="body1" > Transactions ({data.transactionsByAccount.totalCounts})</Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.root}>
        <Grid container >
          <Divider variant='middle' />
          <Grid item xs={12}>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                </TableHead>
                <TableBody>
                  {data.transactionsByAccount.transactions.map((row: any, index: number) => {
                    return (
                      <TableRow key={index} >
                        <TableCell component="th" scope="row" padding="checkbox"  >
                          <Grid container spacing={1} style={{ padding: '0.5rem 0' }}>
                            <Grid item xs={8}>

                              <Typography variant="body2" className={classes.leftInline}>
                                Tx#  <Link
                                  href="/transaction/[transaction]/"
                                  as={`../transaction/${row.hash}`}
                                  color="secondary"
                                  className={classes.leftInline}
                                >
                                  {row.hash
                                    ? <MiddleEllipsis text={row.hash} />
                                    : <NotAvailable variant="body2" />}
                                </Link>
                              </Typography>
                            </Grid>
                            <Grid item xs={4} >
                              <Typography variant="body2" className={classes.alignRight}>
                                {row.timestamp
                                  ? moment.unix(row.timestamp).fromNow()
                                  : <NotAvailable variant="body2" />}
                              </Typography>
                            </Grid>

                            <Grid item xs={5} md={4} >
                              <Typography variant="body2" className={classes.leftInline}>
                                From   <Link
                                  href="account/[account]/"
                                  as={`${row.from.address}`}
                                  color="secondary"
                                  className={classes.txPadding}
                                >
                                  {row.from && row.from.address
                                    ? <MiddleEllipsis text={row.from.address} />
                                    : <NotAvailable variant="body2" />}
                                </Link>
                              </Typography>
                            </Grid>

                            <Grid item xs={7} md={8}>
                              <Typography variant="body2" align='left' className={classes.rightInline}>
                                To <Link
                                  href="account/[account]/"
                                  as={`${row.from.address}`}
                                  color="secondary"
                                  className={classes.txPadding}
                                >
                                  {row.to && row.to.address
                                    ? <MiddleEllipsis text={row.to.address} />
                                    : <NotAvailable variant="body2" />}
                                </Link>
                              </Typography>
                            </Grid>

                            <Grid item xs={6} >
                              {row.type ?
                                <Typography variant="body2" className={classes.chip}>

                                  <Chips value={row.type} />
                                </Typography> : null}
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="body2" className={classes.alignRight} >
                                {row.gas
                                  ? row.gas + " CELO"
                                  : <NotAvailable variant="body2" />}
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
              count={data.transactionsByAccount.totalCounts}
              rowsPerPage={pageSize}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}

export default AccountTransactions