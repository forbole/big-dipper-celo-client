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
import numbro from "numbro";
import getConfig from 'next/config'


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
      overflow: 'hidden',
      padding: '0 0 0 0.5rem',
    },
    divider: {
      margin: '0.5rem 0 0 0',
      backgroundColor: "rgba(62, 67, 71, 1)",
    },
    icon: {
      fill: "rgba(255, 255, 255, 0.6)",
    },
  }
});

moment.relativeTimeThreshold("s", 59);
moment.relativeTimeThreshold("ss", 3);

type TransactionsProps = { address: string };

const AccountTransactions = ({ address }: TransactionsProps) => {

  const classes = useStyles();
  const { publicRuntimeConfig } = getConfig()

  const [page, setPage] = React.useState(publicRuntimeConfig.setPage);
  const [pageSize, setPageSize] = React.useState(publicRuntimeConfig.rowXxsmall)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageSize(+event.target.value);
    setPage(publicRuntimeConfig.setPage);
  };

  const { loading, error, data } = useQuery(GET_ACCOUNT_TX, {
    variables: { address, pageSize, page },
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
        <Typography variant="body1" > Transactions ({numbro(data.transactionsByAccount.totalCounts).format("0,000")})</Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.root}>
        <Grid container >
          <Divider variant='middle' />
          <Grid item xs={12}>
            <TableContainer className={classes.container}>
              <Table >
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

                                  <Chips type={row.type} contractName="" actionResult="" />
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
              <TablePagination
                className="account-txs"
                rowsPerPageOptions={[publicRuntimeConfig.rowXxsmall, publicRuntimeConfig.rowXsmall, publicRuntimeConfig.rowSmall, publicRuntimeConfig.rowMedium, publicRuntimeConfig.rowLarge, publicRuntimeConfig.rowXlarge,]}
                component="div"
                count={data.transactionsByAccount.totalCounts}
                rowsPerPage={pageSize}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                backIconButtonProps={{
                  'aria-label': 'Previous',
                  'disabled': page === 1,
                }}
                nextIconButtonProps={{
                  'aria-label': 'Next',
                }}
              />
            </TableContainer>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}

export default AccountTransactions