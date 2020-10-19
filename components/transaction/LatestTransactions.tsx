import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Link from "../Link";
// import Link from 'next/link'
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import Chips from "../Chips";
import Divider from "@material-ui/core/Divider";
import { useQuery } from "@apollo/client";
import moment from "moment";
import Router from "next/router";
import MiddleEllipsis from '../misc/MiddleEllipsis'
import ComponentLoader from '../misc/ComponentLoader';
import NotAvailable from '../misc/NotAvailable'
import ErrorMessage from '../misc/ErrorMessage';
import { GET_TX } from '../query/Transaction'
import getConfig from 'next/config'
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    padding: "1.5%",
    borderRadius: 5,
    wordWrap: "break-word",
    margin: "none",
  },
  container: {
    borderRadius: 5,
    width: "100%",
    height: "100%",
  },

  leftInline: {
    display: "flex",
    overflow: "hidden",
    padding: "0 0 0 1rem",
  },
  rightInline: {
    display: "flex",
    overflow: "auto",
    padding: "0 1rem 0 0",
    align: "right",
  },

  box: {
    letterSpacing: "1px",
    padding: "0.6rem 0.6rem 1rem 0.6rem",
    display: "block",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },

  alignRight: {
    paddingRight: "1rem",
    float: "right",
  },

  txPadding: {
    display: "flex",
    padding: "0 0 0 0.5rem",
  },

  link: {
    float: "right",
  },

  truncateText: {
    overflow: "hidden",
    textOverflow: "clip ellipsis clip 0 3ch",
    minWidth: "1rem",
    maxWidth: "40rem",
  },

  chip: {
    marginBottom: "0.5rem",
  },

  divider: {
    backgroundColor: "rgba(232, 232, 232, 1)",
    margin: "0 1rem",
    display: "flex",
  },
});

moment.relativeTimeThreshold("s", 59);
moment.relativeTimeThreshold("ss", 3);

type LatestTxsProps = { pagination: boolean };



const LatestTransactions = ({ pagination }: LatestTxsProps) => {
  const classes = useStyles();
  const { publicRuntimeConfig } = getConfig()

  const [page, setPage] = React.useState(publicRuntimeConfig.setPage);
  const [pageSize, setPageSize] = React.useState(publicRuntimeConfig.rowSmall)

  useEffect(() => {
    if (pagination === false) {
      setPageSize(publicRuntimeConfig.rowXxsmall)
    }

  });


  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPageSize(+event.target.value);
    setPage(publicRuntimeConfig.setPage);
  };

  const { loading, error, data } = useQuery(GET_TX, {
    variables: { pageSize, page },
    pollInterval: 5000,
  });

  if (loading) return <ComponentLoader />
  if (error) return <ErrorMessage message={error.message} />

  return (<>
    <Grid container className={classes.container}>
      <Grid item xs={12}>
        <Paper className={classes.root}>
          <Typography variant="body1" className={classes.box}>
            Latest Transactions{" "}
            {pagination === false ? (
              <Link
                href="/transactions"
                className={classes.link}
                color="textPrimary"
              >
                {"view more"}
              </Link>
            ) : null}
          </Typography>
          {data.transactions ?
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead></TableHead>
                <TableBody>
                  {data.transactions.transactions.map((row: any, index: number) => {
                    return (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row" padding="checkbox">
                          <Grid
                            container
                            spacing={1}
                            style={{
                              padding: "0.2rem 0", background: "rgba(255, 255, 255, 1)"
                            }}
                          >
                            <Grid item xs={8}>
                              <Typography
                                variant="body2"
                                className={classes.leftInline}
                                noWrap
                              >
                                Tx#
                            <Link
                                  href="transaction/[transaction]/"
                                  as={`transaction/${row.hash}`}
                                  color="secondary"
                                  className={classes.leftInline}
                                >
                                  {row.hash
                                    ? <MiddleEllipsis text={row.hash} />
                                    : null}
                                </Link>
                              </Typography>
                            </Grid>
                            <Grid item xs={4}>
                              <Typography
                                variant="body2"
                                className={classes.alignRight}
                                noWrap
                              >
                                {row.timestamp
                                  ? moment.unix(row.timestamp).fromNow()
                                  : <NotAvailable variant="body2" />}
                              </Typography>
                            </Grid>

                            <Grid item xs={5} md={4}>
                              <Typography
                                variant="body2"
                                className={classes.leftInline}
                                noWrap
                              >
                                From
                            {row.from && row.from.address ? (
                                  <Link
                                    href="account/[account]/"
                                    as={`account/${row.from.address}`}
                                    color="secondary"
                                    className={classes.txPadding}
                                  >

                                    {row.from && row.from.address
                                      ? <MiddleEllipsis text={row.from.address} />
                                      : null}

                                  </Link>
                                ) : null}
                              </Typography>
                            </Grid>

                            <Grid item xs={7} md={8}>
                              <Typography
                                variant="body2"
                                align="left"
                                className={classes.rightInline}
                                noWrap
                              >
                                To
                            {row.to && row.to.address ? (
                                  <Link
                                    href="account/[account]/"
                                    as={`account/${row.to.address}`}
                                    color="secondary"
                                    className={classes.txPadding}
                                  >
                                    <MiddleEllipsis text={row.to.address} />
                                  </Link>
                                ) : ""}
                              </Typography>
                            </Grid>

                            <Grid item xs={12} lg={9} className={classes.chip}>
                              {row.type && row.to && row.to.contract && row.to.contract.name ?
                                <Chips type={row.type} contractName={row.to.contract.name} />
                                :
                                (row.type ?
                                  <Chips type={row.type} />
                                  : null)}
                            </Grid>
                            <Grid item xs={12} lg={3}>
                              <Typography
                                variant="body2"
                                className={classes.alignRight}
                              >
                                {row.value
                                  ? row.value + " CELO"
                                  : <NotAvailable variant="body2" />}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Divider className={classes.divider} />
                            </Grid>
                          </Grid>

                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>

              {pagination === true ? (
                <TablePagination
                  className="pagination"
                  rowsPerPageOptions={[publicRuntimeConfig.rowXxsmall, publicRuntimeConfig.rowXsmall, publicRuntimeConfig.rowSmall, publicRuntimeConfig.rowMedium, publicRuntimeConfig.rowLarge, publicRuntimeConfig.rowXlarge,]}
                  component="div"
                  count={data.transactions.totalCounts}
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
              ) : null}
            </TableContainer> : ""}
        </Paper>
      </Grid></Grid>
  </>
  )
}

export default LatestTransactions;
