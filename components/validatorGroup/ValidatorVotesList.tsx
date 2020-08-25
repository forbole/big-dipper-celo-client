import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "../Link";
import {
  makeStyles,
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import LinearProgress from '@material-ui/core/LinearProgress';
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Box from '@material-ui/core/Box';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { GET_VALIDATOR_GROUPS } from '../query/ValidatorGroup'
import { useQuery } from "@apollo/client";
import ComponentLoader from '../misc/ComponentLoader';
import NotAvailable from '../misc/NotAvailable'
import ErrorMessage from '../misc/ErrorMessage';
import getConfig from 'next/config'
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import Alert from "@material-ui/lab/Alert";

interface Column {
  id: "dropdown" | "groupName" | "votesAvailable" | "electedTotal" | "lockedcGLD" | "groupShare" | "voterRewards" | "uptime" | "attestation";
  label: string;
  align: 'left' | 'right';
}

const columns: Column[] = [
  { id: "dropdown", label: " ", align: "left" },
  { id: "groupName", label: "Group Name", align: "left" },
  { id: "votesAvailable", label: "Votes Available", align: "left" },
  { id: "electedTotal", label: "Elected/Total", align: "left" },
  { id: "lockedcGLD", label: "Locked cGLD", align: "right" },
  { id: "groupShare", label: "Group Share", align: "right" },
  { id: "voterRewards", label: "Voter Rewards", align: "right" },
  { id: "uptime", label: "Uptime", align: "right" },
  { id: "attestation", label: "Attestation", align: "right" },
];


const useStyles = makeStyles(() => {
  return {
    root: {
      width: "100%",
      padding: "0.5rem",
      borderRadius: 5,
      overflowY: "auto",
    },
    container: {
      borderRadius: 5,
      width: "100%",
      overflow: "auto",

    },
    box: {
      letterSpacing: "1px",
      padding: "1rem",
      display: "inline-flex",
      overflow: "hidden",
      whiteSpace: "nowrap",
    },
    time: {
      padding: "0.01em",
      margin: "0.5em",
    },
    tableCell: {
      overflow: "auto",
      padding: "0.5rem",
    },
    table: {
      background: "#4D5155",
      padding: "0",
    },
    paper: {
      padding: "1rem",
      width: "100%",
    },
    headerLabel: {
      padding: "0 0 1rem 0.5rem"
    },

    arrowIcon: {
      fontWeight: 200,
      color: "rgba(255, 255, 255, 0.8)"

    },

    groupInfo: {
      display: 'inline-block',
      padding: "0.7rem 0 0 1.5rem"
    },

    groupInfoNum: {
      paddingRight: '0.5rem',

    },

    groupInfoAddress: {
      paddingLeft: "2.9rem",
    },

    progress: {
      backgroundColor: "rgba(67, 72, 76, 1)"
    },

    progressBar: {
      backgroundColor: "rgba(251, 204, 92, 1)",
      height: "3px"
    },
    dotIcon: {
      height: "0.5rem",
      width: "0.5rem",
      verticalAlign: "middle",
      color: "rgba(251, 204, 92, 1)",
      marginLeft: "0.25rem",
    },
    link: {
      float: "right",
      textAlign: "right",
    },

    alertMessage: {
      background: "#3AD39E",
      color: "rgba(61, 66, 71, 1)",
    },

  };
});

const ValidatorVotesList = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState("");
  const [copy, setCopy] = React.useState(false);
  const { publicRuntimeConfig } = getConfig()

  const [page, setPage] = React.useState(publicRuntimeConfig.setPage);
  const [pageSize, setPageSize] = React.useState(publicRuntimeConfig.rowMedium)

  const { loading, error, data } = useQuery(GET_VALIDATOR_GROUPS, {
    variables: { pageSize, page },
  });

  const copyText = (id: number) => {
    console.log(id)
    let rawInputForm = document.getElementById(`groupInfoAddress${id}`) as HTMLInputElement
    return navigator.clipboard
      .writeText(rawInputForm.innerHTML)
      .then(() => setCopy(true))
      .catch((err) => {
        console.log("Something went wrong", err);
      })
  };

  const closeAlert = (event?: React.SyntheticEvent, reason?: string) => {
    setCopy(false);
  };


  if (loading) return <ComponentLoader />
  if (error) return <ErrorMessage message={error.message} />

  return (<>
    <Grid container justify="center" className={classes.container}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Typography
            color="textSecondary"
            variant="subtitle1"
            className={classes.headerLabel}
          >
            Validator Votes
          </Typography>
          <Table size="medium">
            <TableHead>
              <TableRow>
                {columns.map((column: any, index: number) => (
                  <TableCell
                    key={index}
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
            </TableHead>
            <TableBody>
              {data.validatorGroups.validatorGroups.map((row: any, index: number) => {
                return (<>
                  <TableRow key={index}>
                    <TableCell component="th"
                      scope="row"
                      padding="none">
                      <IconButton aria-label="expand row" size="small" id={`panel${index}`} onClick={() => !(open === `panel${index}`) ? setOpen(`panel${index}`) : setOpen("")}>
                        {(open === `panel${index}`) ? <KeyboardArrowDownIcon fontSize="small" className={classes.arrowIcon} /> : <KeyboardArrowRightIcon fontSize="small" className={classes.arrowIcon} />}
                      </IconButton>
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      padding="checkbox"
                      align="left"
                      className={classes.tableCell}
                    > {row.name || row.address ?
                      <Link
                        href="/validatorGroup/[validatorGroupDetails]/"
                        as={`/validatorGroup/${'NanValdezG'}`}
                        color="secondary">
                        <Typography variant="body2" noWrap>

                          {row.name || row.address}
                        </Typography>
                      </Link> : <NotAvailable variant="body2" />}
                    </TableCell>
                    <TableCell
                      align="left"
                      padding="checkbox"
                      className={classes.tableCell}
                    >
                      <Typography variant="caption" noWrap>
                        {row.votesAvailable}
                        <LinearProgress variant="determinate" value={81}
                          classes={{
                            colorPrimary: classes.progress,
                            barColorPrimary: classes.progressBar,
                          }}
                        />
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="left"
                      padding="checkbox"
                      className={classes.tableCell}
                    >
                      <Typography variant="body2" noWrap>
                        {row.electedTotal}
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="right"
                      padding="checkbox"
                      className={classes.tableCell}
                    >
                      <Typography variant="body2" noWrap>
                        {row.lockedcGLD}
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="right"
                      padding="checkbox"
                      className={classes.tableCell}
                    >
                      <Typography variant="body2" noWrap>
                        {row.groupShare}
                      </Typography>
                    </TableCell>

                    <TableCell
                      align="right"
                      padding="checkbox"
                      className={classes.tableCell}
                    >
                      <Typography variant="body2" noWrap>
                        {row.voterRewards}
                      </Typography>
                    </TableCell>

                    <TableCell
                      align="right"
                      padding="checkbox"
                      className={classes.tableCell}
                    >
                      <Typography variant="body2" noWrap>
                        {row.uptime}
                      </Typography>
                    </TableCell>

                    <TableCell
                      align="right"
                      padding="checkbox"
                      className={classes.tableCell}
                    >
                      <Typography variant="body2" noWrap>
                        {row.attestation}
                      </Typography>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                      <Collapse in={open === `panel${index}`} timeout="auto" unmountOnExit key={`panel${index}`}>
                        <Grid container >
                          {row.members.map((memberRow: any, index: number) => {
                            return (<>
                              <Grid item xs={8} className={classes.groupInfo} key={index}>
                                {memberRow.name || memberRow.address ?
                                  <> < Typography variant="caption" className={classes.groupInfoNum}> #{index + 1}</Typography>
                                    <Link
                                      href="/account/[account]/"
                                      as={`/account/${10}`}
                                      color="secondary">
                                      <Typography variant="caption" >
                                        {memberRow.name || memberRow.address}
                                      </Typography>
                                    </Link>
                                    <FiberManualRecordIcon className={classes.dotIcon} />
                                  </> :
                                  <NotAvailable variant="caption" />}
                              </Grid>
                              <Grid item xs={8} className={classes.groupInfoAddress}>
                                {memberRow.address ?
                                  <>
                                    <Typography variant="caption" color="textSecondary" id={`groupInfoAddress${index}`}>{memberRow.address}</Typography>
                                    <IconButton
                                      aria-label="copy"
                                      size="small"
                                      onClick={() => copyText(index)}
                                    >
                                      <img src="/images/copy.svg" />
                                    </IconButton>
                                  </> : null}
                              </Grid>
                            </>)
                          })}
                        </Grid>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Grid >
    <Snackbar open={copy} autoHideDuration={6000} onClose={closeAlert}>
      <Alert
        onClose={closeAlert}
        severity="success"
        className={classes.alertMessage}
      >
        <Typography variant="body1">Copied!</Typography>
      </Alert>
    </Snackbar>
  </>
  );
}

export default ValidatorVotesList
