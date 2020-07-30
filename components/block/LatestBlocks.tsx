import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Link from "../Link";
import Grid from "@material-ui/core/Grid";
import { Divider } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import Hidden from "@material-ui/core/Hidden";
import PriceCard from "../PriceCard";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import TablePagination from "@material-ui/core/TablePagination";
import numbro from "numbro";
import { useRouter } from "next/router";

import MiddleEllipsis from '../misc/MiddleEllipsis'
import ComponentLoader from '../misc/ComponentLoader';
import ErrorMessage from '../misc/ErrorMessage';

const GET_BLOCK = gql`
  {
    blocks(pageSize: 500, page: 10) {
      blocks {
        number
        miner {
          name
          affiliation
        }
        transactions {
          transactionIndex
        }
        gasUsed
        gasLimit
        timestamp
      }
    }
  }
`;



interface Column {
  id: "height" | "validator" | "txs" | "gasUsed" | "gasLimit" | "time";
  label: string;
  align: any;
}

const columns: Column[] = [
  { id: "height", label: "Height", align: "left" },
  { id: "validator", label: "Validator", align: "left" },
  { id: "txs", label: "Txs", align: "left" },
  { id: "gasUsed", label: "Gas Used", align: "left" },
  { id: "gasLimit", label: "Gas Limit", align: "left" },
  { id: "time", label: "Time", align: "right" },
];

const columns_homepage: Column[] = [
  { id: "height", label: "Height", align: "left" },
  { id: "validator", label: "Validator", align: "left" },
  { id: "txs", label: "Txs", align: "left" },
  { id: "time", label: "Time", align: "right" },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
    padding: "1.5%",
    borderRadius: 4,
    wordWrap: "break-word",
    margin: "none",
  },
  box: {
    letterSpacing: "1px",
    padding: "0.6rem",
    display: "block",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  link: {
    float: "right",
    textAlign: "right",
  },
  divider: {
    padding: "0 1rem",
    backgroundColor: "rgba(62, 67, 71, 1)",
  },

  cell: {
    maxHeight: "1rem",
  },

  tableCell: {
    overflow: "auto",
    padding: "0.4rem",
  },
  table: {
    background: "#4D5155",
    padding: "0.2rem",
  },
  inline: {
    paddingLeft: "0rem",
  },
  card: {
    padding: "1rem",
    justifyContent: "center",
    marginBottom: "1rem",
    background: "#43484C",
    alignItems: "center",
    borderRadius: 4,
    boxShadow: "0 2px 4px 0 rgba(138, 148, 159, 0.2)",
    "& > *:nth-child(1)": {
      marginRight: "2rem",
    },
    "& > *:nth-child(2)": {
      flex: "auto",
    },
  },



  textContent: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    minWidth: 0,

  },
  truncareText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "6rem",
    minWidth: "2rem",
    maxWidth: "15rem",
  },
});

const LatestBlocks = (props: any) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);


  let mediumScreen: boolean = false;

  const getScreenSize = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth > 960 && window.innerWidth < 1280) return (mediumScreen = true);
      else return (mediumScreen = false);
    }
  };
  getScreenSize();

  const paginate: number =
    mediumScreen === false
      ? props.pagination === true
        ? page * rowsPerPage + rowsPerPage
        : 5
      : 14;
  const paginate_2: number =
    mediumScreen === false
      ? props.pagination === true
        ? page * rowsPerPage + rowsPerPage
        : 10
      : 28;

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

  const { loading, error, data } = useQuery(GET_BLOCK, {
    pollInterval: 5000,
  });

  if (loading) return <ComponentLoader />
  if (error) return <ErrorMessage message={error.message} />

  return (<>
    <Grid container>
      <Grid item xs={12}>
        {props.displayCard === true ? (
          <Hidden smUp>
            <PriceCard size="large" />
          </Hidden>
        ) : null}
        <Paper className={classes.root}>
          <Typography variant="body1" className={classes.box}>
            Latest Blocks{" "}
            {props.pagination === false ? (
              <Link href="/blocks" className={classes.link} color="textPrimary">
                {"view more"}
              </Link>
            ) : null}
          </Typography>
          <Divider variant="middle" className={classes.divider} />
          <TableContainer>
            <Paper className={classes.tableCell}>
              <Table>
                <TableHead>
                  {props.pagination === true ? (
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          className={classes.table}
                          padding="checkbox"
                        >
                          <Typography
                            variant="body2"
                            noWrap
                            className={classes.tableCell}
                          >
                            {column.label}
                          </Typography>
                        </TableCell>
                      ))}
                    </TableRow>
                  ) : (
                      <TableRow>
                        {columns_homepage.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            className={classes.table}
                            padding="checkbox"
                          >
                            <Typography
                              variant="body2"
                              noWrap
                              className={classes.tableCell}
                            >
                              {column.label}
                            </Typography>
                          </TableCell>
                        ))}
                      </TableRow>
                    )}
                </TableHead>
                <TableBody>
                  {data.blocks.blocks.slice(paginate, paginate_2).map((row: any) => {
                    return (
                      <TableRow key={row.number}>
                        <TableCell
                          component="th"
                          scope="row"
                          padding="checkbox"
                          align="left"
                          className={classes.tableCell}
                        >
                          <Typography variant="body2" color="secondary" noWrap>
                            {/* <a href="block/[...block]" as={`block/${row.number}`}  onClick={handleClick} >
      {row.number}
    </a> */}
                            {/* <a  onClick={() => Router.push(`/block/[block]`, `/block/${row.number}`)}> {row.number}</a> */}
                            {/* <span onClick={() => Router.push(`/block/[block]`, `/block/${row.number}`)}>{row.number}</span> */}
                            {/* <Link href="block/[...block]/" as={`block/${row.number}`} passHref>
      <MyButton />
    </Link> */}
                            {/* <Post number={row.number}></Post> */}
                            {/* <Link href={`block/?block=${row.number}`}><a>{row.number}</a></Link> */}

                            {/* <Link href="block/[block]/" as={`block/${row.number}`} onClick={handleClick} passHref color="secondary"><a  >{row.number}</a></Link> */}
                            <Link
                              href="/block/[block]/"
                              as={`/block/${row.number}`}
                              color="secondary"
                            >
                              <a>{row.number}</a>
                            </Link>
                          </Typography>
                        </TableCell>

                        <TableCell
                          align="left"
                          padding="checkbox"
                          className={classes.tableCell}
                        >
                          {row.miner && row.miner.affiliation ? (
                            <Link
                              href="/account/[account]/"
                              as={`/account/${row.miner.affiliation}`}
                              color="secondary"
                            >
                              <Typography
                                variant="body2"
                                display="inline"
                                className={classes.textContent}
                              >
                                <span>
                                  {
                                    ((row.miner && row.miner.name) ||
                                      (row.miner && row.miner.affiliation)
                                      ? <MiddleEllipsis text={(row.miner.name || row.miner.affiliation)} />
                                      : null)}
                                </span>
                              </Typography>
                            </Link>
                          ) : null}
                        </TableCell>

                        <TableCell
                          align="left"
                          padding="checkbox"
                          className={classes.tableCell}
                        >
                          <Typography variant="body2" noWrap>
                            <Link href="#" color="secondary">
                              {row.transactions &&
                                row.transactions.transactionIndex
                                ? row.transactions.transactionIndex.length()
                                : 0}
                            </Link>
                          </Typography>
                        </TableCell>
                        {props.pagination === true ? (
                          <TableCell
                            align="left"
                            padding="checkbox"
                            className={classes.tableCell}
                          >
                            <div className={classes.truncareText}>
                              <Typography variant="body2" noWrap>
                                {numbro(row.gasUsed / 1000000000).format(
                                  "0.0000"
                                )}{" "}
                                gwei
                              </Typography>
                            </div>
                          </TableCell>
                        ) : null}
                        {props.pagination === true ? (
                          <TableCell
                            align="left"
                            padding="checkbox"
                            className={classes.tableCell}
                          >
                            <div className={classes.truncareText}>
                              <Typography variant="body2" noWrap>
                                {row.gasLimit ? row.gasLimit : "Not available"}
                              </Typography>
                            </div>
                          </TableCell>
                        ) : null}
                        <TableCell align="right" padding="checkbox">
                          <Typography variant="body2" noWrap>
                            {moment.unix(row.timestamp).fromNow()}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
          </TableContainer>
          {props.pagination === true ? (
            <TablePagination
              className={"pagination"}
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={data.blocks.blocks.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          ) : null}
        </Paper>
      </Grid>
    </Grid>
  </>
  );
}

export default LatestBlocks;
