import { useQuery } from '@apollo/client';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Alert from '@material-ui/lab/Alert';
import BigNumber from 'bignumber.js';
import numbro from 'numbro';
import React from 'react';

import ComponentLoader from '../misc/ComponentLoader';
import ErrorMessage from '../misc/ErrorMessage';
import MiddleEllipsis from '../misc/MiddleEllipsis';
import NotAvailable from '../misc/NotAvailable';
import NavLink from '../NavLink';
import { GET_VALIDATOR_GROUPS } from '../query/ValidatorGroup';

interface Column {
    id:
        | 'dropdown'
        | 'groupName'
        | 'votesAvailable'
        | 'electedTotal'
        | 'lockedCELO'
        | 'groupShare'
        | 'voterRewards'
        | 'groupScore'
        | 'attestation';
    label: string;
    align: 'left' | 'right';
}

const columns: Column[] = [
    { id: 'dropdown', label: ' ', align: 'left' },
    { id: 'groupName', label: 'Group Name', align: 'left' },
    { id: 'votesAvailable', label: 'Votes Available', align: 'left' },
    { id: 'electedTotal', label: 'Elected/Total', align: 'left' },
    { id: 'lockedCELO', label: 'Locked CELO', align: 'right' },
    { id: 'groupShare', label: 'Group Share', align: 'right' },
    { id: 'voterRewards', label: 'Voter Rewards', align: 'right' },
    { id: 'groupScore', label: 'Group Score', align: 'right' },
    { id: 'attestation', label: 'Attestation', align: 'right' }
];

const useStyles = makeStyles(() => {
    return {
        root: {
            width: '100%',
            padding: '0.5rem',
            borderRadius: 5,
            overflowY: 'auto'
        },
        container: {
            borderRadius: 5,
            width: '100%'
        },
        box: {
            letterSpacing: '1px',
            padding: '1rem',
            display: 'inline-flex',
            overflow: 'hidden',
            whiteSpace: 'nowrap'
        },
        time: {
            padding: '0.01em',
            margin: '0.5em'
        },
        tableCell: {
            overflow: 'auto',
            padding: '0.5rem'
            // border: 'rgba(246, 247, 249, 1)'
        },
        table: {
            background: 'rgba(246, 247, 249, 1)',
            padding: '0',
            border: 'red'
        },
        paper: {
            padding: '1rem',
            width: '100%'
        },
        headerLabel: {
            padding: '0 0 1rem 0.5rem'
        },

        arrowIcon: {
            fontWeight: 200,
            color: 'rgba(144, 144, 144, 1)'
        },

        groupInfo: {
            display: 'inline-block',
            padding: '0.7rem 0 0 1.5rem'
        },

        groupInfoNum: {
            paddingRight: '0.5rem'
        },

        groupInfoAddress: {
            paddingLeft: '2.9rem'
        },

        progress: {
            backgroundColor: 'rgba(242,242,242,1)'
        },

        progressBar: {
            backgroundColor: 'rgba(251, 204, 92, 1)',
            height: '3px'
        },
        dotIcon: {
            height: '0.5rem',
            width: '0.5rem',
            verticalAlign: 'middle',
            color: 'rgba(251, 204, 92, 1)',
            marginLeft: '0.25rem'
        },
        link: {
            float: 'right',
            textAlign: 'right'
        },

        alertMessage: {
            background: '#3AD39E',
            color: 'rgba(61, 66, 71, 1)'
        },

        validatorGroupAddress: {
            wordWrap: 'break-word',
            overflowWrap: 'anywhere',
            textAlign: 'left'
        }
    };
});

const ValidatorVotesList = (): JSX.Element => {
    const SETPAGE = process.env.SETPAGE ? parseInt(process.env.SETPAGE) : 0;
    const ROWMEDIUM = process.env.ROWMEDIUM ? parseInt(process.env.ROWMEDIUM) : 30;
    const CELO_FRACTION = process.env.CELO_FRACTION ? parseInt(process.env.CELO_FRACTION) : 1e18;

    const classes = useStyles();

    const [open, setOpen] = React.useState('');
    const [copy, setCopy] = React.useState(false);
    const [pageNumber, setPageNumber] = React.useState(SETPAGE);
    const [pageSize, setPageSize] = React.useState(ROWMEDIUM);
    const page = pageNumber + 1;

    const { loading, error, data } = useQuery(GET_VALIDATOR_GROUPS, {
        variables: { pageSize, page }
    });

    const copyText = (id: number) => {
        const rawInputForm = document.getElementById(`groupInfoAddress${id}`) as HTMLInputElement;
        return navigator.clipboard
            .writeText(rawInputForm.innerHTML)
            .then(() => setCopy(true))
            .catch((err) => {
                console.log('Something went wrong', err);
            });
    };

    const closeAlert = () => {
        setCopy(false);
    };

    const findElectedValidators = (membersAddress: any, electedValidators: any) => {
        for (const d in Object.keys(electedValidators)) {
            if (electedValidators[d] === membersAddress) {
                return <FiberManualRecordIcon className={classes.dotIcon} />;
            }
        }
    };

    const calculateGroupUptime = (groupAddress: string) => {
        let addScore = 0;
        let totalMembers = 0;

        for (const index in data.validatorGroups.validatorGroups) {
            if (groupAddress === data.validatorGroups.validatorGroups[index].address) {
                for (const o in data.validatorGroups.validatorGroups[index].members) {
                    totalMembers = data.validatorGroups.validatorGroups[index].members.length;
                    addScore += data.validatorGroups.validatorGroups[index].members[o].score;
                }
            }
        }
        const totalScore = (addScore / totalMembers) * 100;
        return totalScore ? numbro(totalScore).format('0.00') : 0;
    };

    if (loading) return <ComponentLoader />;
    if (error) return <ErrorMessage message={error.message} />;

    return (
        <>
            <Grid container justify="center" className={classes.container}>
                <Paper className={classes.paper}>
                    <TableContainer>
                        <Typography
                            color="textPrimary"
                            variant="subtitle1"
                            className={classes.headerLabel}>
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
                                            padding="checkbox">
                                            <Typography
                                                variant="body2"
                                                noWrap
                                                className={classes.tableCell}>
                                                {column.label}
                                            </Typography>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.validatorGroups && data.validatorGroups.validatorGroups
                                    ? data.validatorGroups.validatorGroups.map(
                                          (row: any, index: number) => {
                                              return (
                                                  <>
                                                      <TableRow key={index}>
                                                          <TableCell
                                                              component="th"
                                                              scope="row"
                                                              padding="none">
                                                              <IconButton
                                                                  aria-label="expand row"
                                                                  size="small"
                                                                  id={`panel${index}`}
                                                                  onClick={() =>
                                                                      !(open === `panel${index}`)
                                                                          ? setOpen(`panel${index}`)
                                                                          : setOpen('')
                                                                  }>
                                                                  {open === `panel${index}` ? (
                                                                      <KeyboardArrowDownIcon
                                                                          fontSize="small"
                                                                          className={
                                                                              classes.arrowIcon
                                                                          }
                                                                      />
                                                                  ) : (
                                                                      <KeyboardArrowRightIcon
                                                                          fontSize="small"
                                                                          className={
                                                                              classes.arrowIcon
                                                                          }
                                                                      />
                                                                  )}
                                                              </IconButton>
                                                          </TableCell>
                                                          <TableCell
                                                              component="th"
                                                              scope="row"
                                                              padding="checkbox"
                                                              align="left"
                                                              className={classes.tableCell}>
                                                              {' '}
                                                              {row.name || row.address ? (
                                                                  <NavLink
                                                                      href={`/validatorGroup/${row.address}`}
                                                                      name={
                                                                          <Typography
                                                                              variant="body2"
                                                                              noWrap>
                                                                              <MiddleEllipsis
                                                                                  text={
                                                                                      row.name ||
                                                                                      row.address
                                                                                  }
                                                                              />
                                                                          </Typography>
                                                                      }
                                                                      className={
                                                                          classes.validatorGroupAddress
                                                                      }
                                                                  />
                                                              ) : (
                                                                  <NotAvailable variant="body2" />
                                                              )}
                                                          </TableCell>
                                                          <TableCell
                                                              align="left"
                                                              padding="checkbox"
                                                              className={classes.tableCell}>
                                                              {row.votes && row.votesAvailable ? (
                                                                  <Typography
                                                                      variant="caption"
                                                                      noWrap>
                                                                      {new BigNumber(
                                                                          (row.votes /
                                                                              CELO_FRACTION /
                                                                              (row.votesAvailable /
                                                                                  CELO_FRACTION)) *
                                                                              100
                                                                      ).toFormat(2)}
                                                                      %
                                                                      <LinearProgress
                                                                          variant="determinate"
                                                                          value={parseFloat(
                                                                              new BigNumber(
                                                                                  (row.votes /
                                                                                      CELO_FRACTION /
                                                                                      (row.votesAvailable /
                                                                                          CELO_FRACTION)) *
                                                                                      100
                                                                              ).toFormat(2)
                                                                          )}
                                                                          classes={{
                                                                              colorPrimary:
                                                                                  classes.progress,
                                                                              barColorPrimary:
                                                                                  classes.progressBar
                                                                          }}
                                                                      />
                                                                  </Typography>
                                                              ) : (
                                                                  <NotAvailable variant="body2" />
                                                              )}
                                                          </TableCell>
                                                          <TableCell
                                                              align="left"
                                                              padding="checkbox"
                                                              className={classes.tableCell}>
                                                              {row.members &&
                                                              row.electedValidators ? (
                                                                  <Typography
                                                                      variant="body2"
                                                                      noWrap>
                                                                      {
                                                                          Object.keys(
                                                                              row.electedValidators
                                                                          ).length
                                                                      }
                                                                      / {row.members.length}
                                                                  </Typography>
                                                              ) : (
                                                                  <NotAvailable variant="body2" />
                                                              )}
                                                          </TableCell>
                                                          <TableCell
                                                              align="right"
                                                              padding="checkbox"
                                                              className={classes.tableCell}>
                                                              <Typography variant="body2" noWrap>
                                                                  {new BigNumber(
                                                                      row.lockedGoldAmount /
                                                                          CELO_FRACTION
                                                                  ).toFormat(2)}{' '}
                                                                  CELO
                                                              </Typography>
                                                          </TableCell>
                                                          <TableCell
                                                              align="right"
                                                              padding="checkbox"
                                                              className={classes.tableCell}>
                                                              {
                                                                  <Typography
                                                                      variant="body2"
                                                                      noWrap>
                                                                      {row.commission * 100} %
                                                                  </Typography>
                                                              }
                                                          </TableCell>

                                                          <TableCell
                                                              align="right"
                                                              padding="checkbox"
                                                              className={classes.tableCell}>
                                                              <Typography variant="body2" noWrap>
                                                                  {row.voterRewards}
                                                              </Typography>
                                                          </TableCell>

                                                          <TableCell
                                                              align="right"
                                                              padding="checkbox"
                                                              className={classes.tableCell}>
                                                              <Typography variant="body2" noWrap>
                                                                  {calculateGroupUptime(
                                                                      row.address
                                                                  )}{' '}
                                                                  %
                                                              </Typography>
                                                          </TableCell>

                                                          <TableCell
                                                              align="right"
                                                              padding="checkbox"
                                                              className={classes.tableCell}>
                                                              <Typography variant="body2" noWrap>
                                                                  {row.attestation}
                                                              </Typography>
                                                          </TableCell>
                                                      </TableRow>

                                                      <TableRow>
                                                          <TableCell
                                                              style={{
                                                                  paddingBottom: 0,
                                                                  paddingTop: 0
                                                              }}
                                                              colSpan={6}>
                                                              <Collapse
                                                                  in={open === `panel${index}`}
                                                                  timeout="auto"
                                                                  unmountOnExit
                                                                  key={`panel${index}`}>
                                                                  <Grid container>
                                                                      {row.members.map(
                                                                          (
                                                                              memberRow: any,
                                                                              index: number
                                                                          ) => {
                                                                              return (
                                                                                  <>
                                                                                      <Grid
                                                                                          item
                                                                                          xs={8}
                                                                                          className={
                                                                                              classes.groupInfo
                                                                                          }
                                                                                          key={
                                                                                              index
                                                                                          }>
                                                                                          {memberRow.name ||
                                                                                          memberRow.address ? (
                                                                                              <>
                                                                                                  {' '}
                                                                                                  <Typography
                                                                                                      variant="caption"
                                                                                                      className={
                                                                                                          classes.groupInfoNum
                                                                                                      }>
                                                                                                      {' '}
                                                                                                      #
                                                                                                      {index +
                                                                                                          1}
                                                                                                  </Typography>
                                                                                                  <NavLink
                                                                                                      href={`/account/${memberRow.address}`}
                                                                                                      name={
                                                                                                          <Typography variant="caption">
                                                                                                              {memberRow.name ||
                                                                                                                  memberRow.address}
                                                                                                          </Typography>
                                                                                                      }
                                                                                                  />
                                                                                                  {findElectedValidators(
                                                                                                      memberRow.address,
                                                                                                      row.electedValidators
                                                                                                  )}
                                                                                              </>
                                                                                          ) : (
                                                                                              <NotAvailable variant="caption" />
                                                                                          )}
                                                                                      </Grid>
                                                                                      <Grid
                                                                                          item
                                                                                          xs={8}
                                                                                          className={
                                                                                              classes.groupInfoAddress
                                                                                          }>
                                                                                          {memberRow.address ? (
                                                                                              <>
                                                                                                  <Typography
                                                                                                      variant="caption"
                                                                                                      color="textSecondary"
                                                                                                      id={`groupInfoAddress${index}`}>
                                                                                                      {
                                                                                                          memberRow.address
                                                                                                      }
                                                                                                  </Typography>
                                                                                                  <IconButton
                                                                                                      aria-label="copy"
                                                                                                      size="small"
                                                                                                      onClick={() =>
                                                                                                          copyText(
                                                                                                              index
                                                                                                          )
                                                                                                      }>
                                                                                                      <img
                                                                                                          src="/images/copy.svg"
                                                                                                          alt="Copy"
                                                                                                      />
                                                                                                  </IconButton>
                                                                                              </>
                                                                                          ) : null}
                                                                                      </Grid>
                                                                                  </>
                                                                              );
                                                                          }
                                                                      )}
                                                                  </Grid>
                                                              </Collapse>
                                                          </TableCell>
                                                      </TableRow>
                                                  </>
                                              );
                                          }
                                      )
                                    : (null as any)}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Grid>
            <Snackbar open={copy} autoHideDuration={6000} onClose={closeAlert}>
                <Alert onClose={closeAlert} severity="success" className={classes.alertMessage}>
                    <Typography variant="body1">Copied!</Typography>
                </Alert>
            </Snackbar>
        </>
    );
};

export default ValidatorVotesList;
