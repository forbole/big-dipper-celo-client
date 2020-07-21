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

interface Column {
  id: "dropdown" | "groupName" | "votesAvailable" | "electedTotal" | "lockedcGLD" | "groupShare" | "voterRewards" | "uptime" | "attestation";
  label: string;
  align: any;
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


function createData(dropdown: string, groupName: string, votesAvailable: string, electedTotal: string, lockedcGLD: string, groupShare: string, voterRewards: string, uptime: string, attestation: string) {
  return { dropdown, groupName, votesAvailable, electedTotal, lockedcGLD, groupShare, voterRewards, uptime, attestation };
}

const rows = [
  createData("", "Michelle Clark", "0.9% 38.8% of 2.4%", " 1 | 2", "2000", "10%", "999.89CGLD", "99.9%", "10.9%"),
  createData("", "Rachel Hugh", "0.9% 38.8% of 2.4%", "2 | 3", "31232", "12%", "999.89CGLD", "99.9%", "10.9%"),
  createData("", "Natasha", "0.9% 38.8% of 2.4%", "1 | 2", "243244", "12%", "999.89CGLD", "99.9%", "10.9%"),
  createData("", "Rith Jackson", "0.9% 38.8% of 2.4%", "0 | 2", "234217", "21%", "999.89CGLD", "99.9%", "10.9%"),
  createData("", "Kelly Mendex", "65894856 cGLD", "0 | 2", "12378421", "23%", "999.89CGLD", "99.9%", "10.9%"),
  createData("", "Marilym Ford", "2478 cGLD", "0 | 2", "237243", "22%", "999.89CGLD", "99.9%", "10.9%"),
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

  };
});

const ValidatorVotesList = () => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [open, setOpen] = React.useState(false);

  // const handleClick = () => {
  //   return navigator.clipboard
  //     .writeText(document.getElementById("group-info-address").innerText)
  //     .then(() => setOpen(true))
  //     .catch((err) => {
  //       console.log("Something went wrong", err);
  //     });
  // };

  return (
    <Grid container spacing={1} justify="center" className={classes.container}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Typography
            color="textSecondary"
            variant="subtitle1"
            className={classes.headerLabel}
          >
            Validator Votes

             <Link href="/blocks" className={classes.link} color="textPrimary">
              {"view more"}
            </Link>
          </Typography>
          <Table size="medium">
            <TableHead>
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
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (<>
                    <TableRow key={row.groupName}>
                      <TableCell component="th"
                        scope="row"
                        padding="none">
                        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                          {open ? <KeyboardArrowDownIcon fontSize="small" className={classes.arrowIcon} /> : <KeyboardArrowRightIcon fontSize="small" className={classes.arrowIcon} />}
                        </IconButton>
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        padding="checkbox"
                        align="left"
                        className={classes.tableCell}
                      >
                        <Link
                          href="/validatorGroup/[validatorGroupDetails]/"
                          as={`/validatorGroup/${'NanValdezG'}`}
                          color="secondary">
                          <Typography variant="body2" noWrap>

                            {row.groupName}
                          </Typography>
                        </Link>
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
                        <Collapse in={open} timeout="auto" unmountOnExit>
                          <Grid container >
                            <Grid item xs={8} className={classes.groupInfo}>
                              <Typography variant="caption" className={classes.groupInfoNum}> #1</Typography>
                              <Link
                                href="/account/[account]/"
                                as={`/account/${10}`}
                                color="secondary">
                                <Typography variant="caption" >
                                  Vincent Lynch
                              </Typography>
                              </Link>
                              <FiberManualRecordIcon className={classes.dotIcon} />
                            </Grid>
                            <Grid item xs={8} className={classes.groupInfoAddress}>
                              <Typography variant="caption" color="textSecondary" > <span id="group-info-address"  >{'0x0f66….1571'}</span></Typography>
                              <IconButton
                                aria-label="copy"
                                size="small"
                              //onClick={handleClick}
                              >
                                <img src="/images/copy.svg" />
                              </IconButton>
                            </Grid>

                            <Grid item xs={8} className={classes.groupInfo}>
                              <Typography variant="caption" className={classes.groupInfoNum}> #2</Typography>
                              <Link
                                href="/account/[account]/"
                                as={`/account/${10}`}
                                color="secondary">
                                <Typography variant="caption" >
                                  Michelle Clark
                              </Typography>
                              </Link>
                            </Grid>
                            <Grid item xs={8} className={classes.groupInfoAddress}>
                              <Typography variant="caption" color="textSecondary"  > <span id="group-info-address"  >{'0x0f66….1571'}</span></Typography>
                              <IconButton
                                aria-label="copy"
                                size="small"
                              //onClick={handleClick}
                              >
                                <img src="/images/copy.svg" />
                              </IconButton>
                            </Grid>

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
    </Grid>
  );
}

export default ValidatorVotesList