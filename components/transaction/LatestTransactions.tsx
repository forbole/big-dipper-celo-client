import React from "react";
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
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import MiddleEllipsis from "react-middle-ellipsis";
import moment from "moment";
import Router from "next/router";

const GET_TX = gql`
  {
    transactions {
      transactions {
        from {
          _id

          address
          balance
        }
        to {
          _id
          address
          balance
        }
        value
        hash
        timestamp
      }
    }
  }
`;

const useStyles = makeStyles({
  root: {
    width: "100%",
    padding: "1.5%",
    borderRadius: 5,
    wordWrap: "break-word",
    margin: "none",
  },
  container: {
    borderRadius: 5,
    width: "100%",
    overflow: "hidden",
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
    padding: "0.6rem",
    display: "block",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },

  chip: {
    display: "block",
    marginLeft: "1rem",
  },

  alignRight: {
    paddingRight: "1rem",
    float: "right",
  },

  txPadding: {
    display: "flex",
    //overflow: 'auto',
    padding: "0 0 0 0.5rem",
  },
  divider: {
    margin: "0.5rem",
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
});

function LatestTransactions(props: any) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const paginate = props.pagination ? page * rowsPerPage : 0;
  const paginate_2 = props.pagination ? page * rowsPerPage + rowsPerPage : 5;

  const { loading, error, data } = useQuery(GET_TX, {
    pollInterval: 5000,
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  moment.relativeTimeThreshold("s", 59);
  moment.relativeTimeThreshold("ss", 3);

  if (loading) return null;
  if (error) return `Error! ${error}`;

  return (
    <Paper className={classes.root}>
      <Typography variant="body1" className={classes.box}>
        Latest Transactions{" "}
        {!props.pagination ? (
          <Link
            href="/transactions"
            className={classes.link}
            color="textPrimary"
          >
            {"view more"}
          </Link>
        ) : null}
      </Typography>
      <Divider variant="middle" className={classes.divider} />
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead></TableHead>
          <TableBody>
            {data.transactions.transactions
              .slice(paginate, paginate_2)
              .map((row: any) => {
                return (
                  <TableRow key={row.hash}>
                    <TableCell component="th" scope="row" padding="checkbox">
                      <Grid
                        container
                        spacing={1}
                        style={{ padding: "0.5rem 0" }}
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
                              <div
                                style={{
                                  width: "60%",
                                  minWidth: "40%",
                                  maxWidth: "100%",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                <MiddleEllipsis>
                                  <a>
                                    {row.hash
                                      ? row.hash
                                      : "Data currently not available"}
                                  </a>
                                </MiddleEllipsis>
                              </div>
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
                              : "Data currently not available"}
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
                                <div
                                  style={{
                                    width: "60%",
                                    minWidth: "20%",
                                    maxWidth: "100%",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  <MiddleEllipsis>
                                    <span>
                                      {row.from && row.from.address
                                        ? row.from.address
                                        : " "}
                                    </span>
                                  </MiddleEllipsis>
                                </div>
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
                                <div
                                  style={{
                                    width: "60%",
                                    minWidth: "20%",
                                    maxWidth: "100%",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  <MiddleEllipsis>
                                    <span>
                                      {row.to && row.to.address
                                        ? row.to.address
                                        : "Data currently not available"}
                                    </span>
                                  </MiddleEllipsis>
                                </div>
                              </Link>
                            ) : null}
                          </Typography>
                        </Grid>

                        <Grid item xs={6}>
                          <Typography variant="body2" className={classes.chip}>
                            {row.value === 0 ? (
                              <Chips value="Contract Call" />
                            ) : (
                              <Chips value="Token Transfer" />
                            )}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography
                            variant="body2"
                            className={classes.alignRight}
                          >
                            {row.value
                              ? row.value + " cGLD"
                              : "Data currently not available"}
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
      {props.pagination ? (
        <TablePagination
          className={"pagination"}
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data.transactions.transactions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      ) : null}
    </Paper>
  );
}

export default LatestTransactions;
