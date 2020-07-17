import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import { Select, InputLabel } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import Container from "@material-ui/core/Container";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";
import ListSubheader from "@material-ui/core/ListSubheader";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";
import Link from "../Link";
import Card from "@material-ui/core/Card";
import Paper from '@material-ui/core/Paper';
import ProposalVote from './proposal/ProposalVote'
import ValidatorGroupVote from './validatorGroup/ValidatorGroupVote'
import ConfirmVote from './validatorGroup/ConfirmVote'
import ConfirmVoteProposal from './proposal/ConfirmVote'
import RevokeVote from './validatorGroup/RevokeVote'
import RevokeSuccess from './validatorGroup/RevokeSuccess'
import ConfirmRevoke from './validatorGroup/ConfirmRevoke'
import SignInMessage from './SignInMessage'
import ProposalSuccess from './proposal/ProposalSuccess'
import ProposalDeposit from './proposal/ProposalDeposit'


import Hidden from "@material-ui/core/Hidden";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormHelperText from "@material-ui/core/FormHelperText";
import LedgerButtons from "./LedgerButtons";

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ControlButtons from './ControlButtons'


const useStyles = makeStyles({
  root: {
    justifyContent: "center",
  },
  title: {
    display: "block",
    textAlign: "center",
    paddingTop: "0.5rem",
  },
  leftInline: {
    display: "flex",
    overflow: "auto",
    padding: "0 0 0 1rem",
  },

  bottomPadding: {
    overflow: "auto",
    padding: "1%",
  },

  select: {
    justifyContent: "center",
    border: "solid rgba(255, 255, 255, 0.6) ",
    borderWidth: "0.09rem",
    borderRadius: 4,
  },

  depositSelect: {
    justifyContent: "center",
    border: "solid rgba(255, 255, 255, 0.6) ",
    borderWidth: "0.09rem",
    borderRadius: 4,
    paddingLeft: "0.5rem",
    //minWidth: "18.4375rem",
  },

  formControl: {
    paddingBottom: "1rem",
    //width: "18.4375rem" || "24rem",
    overflow: "hidden",
    textOverflow: "clip",
    display: "flex",
  },

  centerContent: {
    display: "flex",
    //margin: "1rem 0 -0.5rem 0",
    justifyContent: "center",
  },

  dialogRoot: {
    padding: "1rem",
  },

  dialogPadding: {
    padding: "1rem",
  },

  dialogTitle: {
    padding: "1rem 1rem 0rem 1rem",
  },


  inputLabel: {
    fontSize: "15px",
    paddingLeft: "1rem",
  },

  alignLeft: {
    display: "flex",
    overflow: "auto",
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
  },

  alignRight: {
    display: "block",
    float: "right",
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
  },

  alignRightPrice: {
    display: "block",
    float: "right",
    paddingRight: "1rem",
    marginTop: "-0.5rem",
  },

  button: {
    justifyContent: "center",
    minWidth: "8rem",
    marginBottom: "1rem",
  },

  box: {
    letterSpacing: "1px",
    padding: "1rem",
    display: "block",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  chip: {
    display: "block",
    marginLeft: "1rem",
  },

  divider: {
    margin: "0.15rem 0rem",
    backgroundColor: "rgba(62, 67, 71, 1)",
  },

  searchbar: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    verticalAlign: "middle",
  },

  label: {
    height: "2rem",
    verticalAlign: "middle",
    padding: "0 1rem 1rem 0",
    fontSize: "12px",
  },
  container: {
    justifyContent: "center",
    padding: "0rem",
  },

  leftPadding: {
    paddingLeft: "1rem",
  },

  dialog: {
    paddingBottom: '1rem'
  },

  controlButtonLabel: {
    display: "flex",
    textTransform: "none",
    borderRadius: 4,
    justifyContent: "center",
    minHeight: "2.5rem",
    maxWidth: "8.4375rem",
    textAlign: "center",
  },

  proposalButtonLabel: {
    display: "flex",
    textTransform: "none",
    borderRadius: 4,
    justifyContent: "center",
    minHeight: "2.5rem",
    width: "18.44rem",
    textAlign: "center",
  },

  controlButton: {
    justifyContent: "center",
    flexWrap: "wrap",
    paddingTop: "2rem",
    textTransform: "none",
    borderRadius: 4,
    //minHeight: "2.5rem",
    width: "100%",
  },

  item: {
    justifyContent: "center",
    // check thiss textAlign: "-webkit-center",
  },

  icon: {
    fill: "rgba(255, 255, 255, 0.8)",
    paddingRight: "0.5rem",
    fontWeight: 400,
  },

  menu: {
    display: "block",
    width: "100%",
    overflow: "hidden",
  },

  iconButtonRight: {
    padding: "0",
    marginLeft: "0.5rem",
  },
  iconButtonLeft: {
    //padding: "0",
    marginRight: "0.5rem",
  },

  lockGoldMessage: {
    marginTop: "1rem",
    marginBottom: "-0.8rem",
  },

  alignCenter: {
    justifyContent: "center",
    paddingBottom: "2.5rem",
  },

  imgSuccess: {
    justifyContent: "center",
    paddingBottom: "1.25rem",
  },

  message: {
    margin: "0.5rem 0.5rem 0 0.5rem",
  },

  txHash: {
    overflowWrap: "anywhere",
    textAlign: "left",
  },

  hideOverflow: {
    paddingBottom: "1rem"
  },

  voteNoButton: {
    backgroundColor: "rgba(240, 65, 85, 1)",
    textTransform: "none",
    width: '100%',
    color: '#fff',
    fontWeight: 400,
  },
  voteYesButton: {
    backgroundColor: "rgba(58, 211, 158, 1)",
    textTransform: "none",
    width: '100%',
    color: '#fff',
    fontWeight: 400,
  },

  voteNoWithVetoButton: {
    backgroundColor: "rgba(250, 149, 30, 1)",
    textTransform: "none",
    width: '100%',
    color: '#fff',
    fontWeight: 400,

  },
  voteAbstainButton: {
    backgroundColor: "rgba(55, 148, 240, 1)",
    textTransform: "none",
    width: '100%',
    color: '#fff',
    fontWeight: 400,
  },

  paddingBottom: {
    paddingBottom: '1rem'
  },

  address: {
    overflow: 'hidden',

  },


  wrapText: {
    wordWrap: 'break-word',

  }


});

interface State {
  tokenSearch: string;
}

function LockGoldDialog() {
  const classes = useStyles();

  return (
    <FormControl variant="outlined" fullWidth size="small">
      <InputLabel htmlFor="lock-gold-dialog" > {/*type="number" */}
        <Typography
          variant="body2"
          color="textSecondary"
          className={classes.leftPadding}
        >
          Insert Amount
        </Typography>
      </InputLabel>
      <OutlinedInput
        id="id-lock-gold-dialog"
        endAdornment={<InputAdornment position="end">cGLD</InputAdornment>}
        labelWidth={295}
      />
    </FormControl>
  );
}

function TokenDropdown() {
  const classes = useStyles();
  let name = "Michelle Clark";
  let name_2 = "Ada Adams";
  return (
    <FormControl fullWidth size="medium">
      <Select
        defaultValue=""
        id="grouped-select"
        color="primary"
        className={classes.select}
        disableUnderline={true}
        fullWidth={true}
      >
        <ListSubheader>Accounts:</ListSubheader>
        <Divider className={classes.divider} />

        <ListSubheader></ListSubheader>
        <MenuItem value={1}>
          <Typography
            variant="body2"
            color="textSecondary"
            className={classes.leftPadding}
          >
            {name}
          </Typography>
        </MenuItem>

        <Divider variant="middle" className={classes.divider} />

        <ListSubheader></ListSubheader>

        <MenuItem value={2}>
          <Typography
            variant="body2"
            color="textSecondary"
            className={classes.leftPadding}
          >
            {name_2}
          </Typography>
        </MenuItem>
      </Select>
    </FormControl>
  );
}


export default function Ledger() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
        Ledger Dialog
      </Button>{" "}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="ledger-dialog-vote"
        //fullWidth
        maxWidth="sm"
      >
        <ProposalDeposit />
      </Dialog>
      {/* <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="ledger-dialog"
      // fullWidth
      maxWidth="xs"
    >
      <DialogTitle id="ledger-dialog-title" className={classes.dialogRoot}>
        <Grid container className={classes.item}>
          <Grid item xs={1}>
            <IconButton
              aria-label="Return"
              className={classes.iconButtonLeft}
            >
              <img src="/images/last.svg" color="textPrimary" />
            </IconButton>
          </Grid>
          <Grid item xs={10}>
            <Typography variant="body1" noWrap className={classes.title}>
              Lock Celo Gold
              </Typography>
          </Grid>
          <Grid item xs={1}>
            <IconButton
              aria-label="Close"
              className={classes.iconButtonRight}
              onClick={handleClose}
            >
              <img src="/images/cross.svg" color="textPrimary" />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={1} className={classes.item}> */}
      {/* <DialogContentText id="1">
              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  noWrap
                  className={classes.alignLeft}
                  align="left"
                >
                  Account
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TokenDropdown />
              </Grid>

              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  noWrap
                  className={classes.alignLeft}
                  align="left"
                >
                  Lock amount
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <LockGoldDialog />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  noWrap
                  className={classes.alignRight}
                >
                  Max {"14.99217479 cGLD"}
                </Typography>
              </Grid>
              {renderControlButtons()}
            </DialogContentText> */}

      {/* <DialogContentText id="2">
              <Grid item xs={12}>
                <Typography variant="body2" noWrap={false}>
                  You are going to lock {"2"} cGLD, it that's correct, please
                  sign in your ledger device.
                </Typography>
              </Grid>
              <Divider className={classes.divider} />
              <Grid container spacing={1} className={classes.item}>
                <Grid item xs={6}>
                  <Typography
                    variant="body2"
                    noWrap
                    className={classes.alignLeft}
                    align="left"
                  >
                    Account
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body2"
                    noWrap
                    className={classes.alignRight}
                    align="right"
                  >
                    {"Michelle Clark"}
                  </Typography>
                </Grid>
              </Grid>
              <Divider className={classes.divider} />
              <Grid container spacing={1} className={classes.item}>
                <Grid item xs={6}>
                  <Typography
                    variant="body2"
                    noWrap
                    className={classes.alignLeft}
                    align="left"
                  >
                    Lock Amount
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body2"
                    noWrap
                    className={classes.alignRight}
                    align="right"
                  >
                    {"2"} cGLD
                  </Typography>
                </Grid>
              </Grid>
              <Divider className={classes.divider} />
              <Grid container spacing={1} className={classes.item}>
                <Grid item xs={6}>
                  <Typography
                    variant="body2"
                    noWrap
                    className={classes.alignLeft}
                    align="left"
                  >
                    Tx Fee
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body2"
                    noWrap
                    className={classes.alignRight}
                    align="right"
                  >
                    {"0.00001"} cGLD
                  </Typography>
                </Grid>
              </Grid>
              <Divider className={classes.divider} />
              <Grid item xs={12} className={classes.lockGoldMessage}>
                <Typography variant="body1" noWrap align="center">
                  Please sign in your ledger device...
                </Typography>
              </Grid>
            </DialogContentText> */}
      {/* <DialogContentText id="3">
              <Grid container className={classes.item}>
                <Grid
                  item
                  xs={12}
                  align="center"
                  className={classes.bottomMargin}
                >
                  <img src="/images/success_icon.svg" />
                </Grid>
                <Grid
                  item
                  xs={12}
                  align="center"
                  className={classes.bottomMargin}
                >
                  <Typography
                    variant="body2"
                    noWrap
                    //align="center"
                  >
                    The cGLD has been successfully locked.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Link href="/transactions">
                    <div className={classes.controlButton}>
                      <Button
                        variant="outlined"
                        color="secondary"
                        className={classes.controlButtonLabel}
                        fullWidth={true}
                        onClick={handleClose}
                      >
                        <Typography variant="body2" noWrap>
                          View Transactions
                        </Typography>
                      </Button>
                    </div>
                  </Link>
                </Grid>
              </Grid>
            </DialogContentText> */}

      {/* <DialogContentText id="4">
              <Grid container className={classes.item}>
                <Grid
                  item
                  xs={12}
                  // textAlign="center"
                  className={classes.imgSuccess}
                >
                  <img src="/images/success_icon.svg" />
                </Grid>
                <Grid
                  item
                  xs={12}
                  //textAlign="center"
                  className={classes.alignCenter}
                >
                  <Typography variant="body2" noWrap color="textPrimary">
                    You have successfully deposited to proposal 1
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography
                    variant="body2"
                    noWrap
                    align="left"
                    color="textPrimary"
                  >
                    TX Hash
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Link
                    href="transaction/[transaction]/"
                    //as={`transaction/${data.block.parentHash}`}
                    color="secondary"
                  >
                    <Typography variant="body2" className={classes.txHash}>
                      {
                        "0xfdef0a9988f84f8914ee000407393fccc1d039130260c7d501cc4b24e5bbe4f5"
                      }
                    </Typography>
                  </Link>
                </Grid>

                <Grid item xs={12} className={classes.controlButton}>
                  <Link href="/transactions">
                    <Button
                      variant="outlined"
                      color="secondary"
                      className={classes.proposalButtonLabel}
                      fullWidth={true}
                      onClick={handleClose}
                    >
                      <Typography variant="body2" noWrap>
                        View Proposal
                      </Typography>
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </DialogContentText> */}

      {/* <DialogContentText id="5">
              <Grid container className={classes.item}>
                <Grid
                  item
                  xs={12}
                  // textAlign="center"
                  className={classes.imgSuccess}
                >
                  <img src="/images/success_icon.svg" />
                </Grid>
                <Grid
                  item
                  xs={12}
                  //textAlign="center"
                  className={classes.alignCenter}
                >
                  <Typography variant="body2" noWrap color="textPrimary">
                    Voted Successfully
                  </Typography>
                </Grid>

                <Grid item xs={12} >
                  <Link href="/transactions">
                    <Button
                      variant="outlined"
                      color="secondary"
                      className={classes.proposalButtonLabel}
                      fullWidth={true}
                      onClick={handleClose}
                    >
                      <Typography variant="body2" noWrap>
                        View Transactions
                      </Typography>
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </DialogContentText> */}
      {/* 
          {ConfirmVote()}
        </Grid>
      </DialogContent>
      <DialogActions className={classes.root}></DialogActions>
    </Dialog> */}
    </div>
  );
}
