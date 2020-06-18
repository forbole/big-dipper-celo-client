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

import Hidden from "@material-ui/core/Hidden";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormHelperText from "@material-ui/core/FormHelperText";
import LedgerButtons from "./LedgerButtons";

function Dialog_1() {
  return console.log("DIALOG");
}

const useStyles = makeStyles({
  root: {
    justifyContent: "center",
  },
  title: {
    // padding: "1rem",
    display: "block",
    textAlign: "center",
    paddingTop: "0.3rem",
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
    //align: "center",
    justifyContent: "center",
    //fontSize: "15px",
    border: "solid rgba(255, 255, 255, 0.6) ",
    borderWidth: "0.09rem",
    borderRadius: 4,
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
    //paddingRight: "1rem",
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

  rightPadding: {
    paddingLeft: "1rem",
  },

  controlButton: {
    justifyContent: "center",
    flexWrap: "wrap",
    padding: "0.1rem",
    textTransform: "none",
    borderRadius: 4,
  },

  controlButtonLabel: {
    textTransform: "none",
    borderRadius: 4,
  },

  item: {
    justifyContent: "center",
  },

  iconButtonRight: {
    padding: "0",
    marginLeft: "0.5rem",
  },
  iconButtonLeft: {
    padding: "0",
    marginRight: "0.5rem",
  },

  lockGoldMessage: {
    marginTop: "1rem",
    marginBottom: "-0.8rem",
  },

  dialogRoot: {
    marginBottom: "-1rem",
  },

  alignCenter: {
    justifyContent: "center",
    marginBottom: "1rem",
  },

  bottomMargin: {
    marginBottom: "1rem",
    textAlign: "center",
  },

  signInText:{
    margin: '0.5rem',
  }
});

interface State {
  tokenSearch: string;
}

function LockGoldDialog() {
  const classes = useStyles();

  return (
    <FormControl variant="outlined" fullWidth size="small">
      <InputLabel htmlFor="lock-gold-dialog" type="number">
        <Typography
          variant="caption"
          color="textSecondary"
          className={classes.rightPadding}
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
    <FormControl fullWidth={true} size="medium">
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
            variant="caption"
            color="textSecondary"
            className={classes.rightPadding}
          >
            {name}
          </Typography>
        </MenuItem>

        <Divider variant="middle" className={classes.divider} />

        <ListSubheader></ListSubheader>

        <MenuItem value={2}>
          <Typography
            variant="caption"
            color="textSecondary"
            className={classes.rightPadding}
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

  const renderControlButtons = () => {
    return (
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <div className={classes.controlButton}>
            <Button
              variant="outlined"
              color="secondary"
              className={classes.controlButtonLabel}
              fullWidth={true}
              onClick={handleClose}
            >
              <Typography variant="caption" noWrap>
                Cancel
              </Typography>
            </Button>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className={classes.controlButton}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.controlButtonLabel}
              fullWidth={true}
              onClick={handleClose}
            >
              <Typography variant="caption" noWrap>
                Confirm
              </Typography>
            </Button>
          </div>
        </Grid>
      </Grid>
    );
  };

  const getSignInMessage = () => {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="ledger-dialog"
        // fullWidth
        maxWidth="md"
      >
        <DialogTitle id="ledger-dialog-title" className={classes.dialogRoot}>
          <Grid container className={classes.item}>
            <Grid item xs={12}>
              <Typography
                variant="body1"
                noWrap
                className={classes.title}
                gutterBottom
              >
                Sign in with Ledger
              </Typography>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={1} className={classes.item}>
            <DialogContentText id="signin-ledger">
              <Grid container className={classes.item}>
                <Grid
                  item
                  xs={12}
                  className={classes.signInText}
                >
                  <Typography variant="body2">
                    Please make sure your Ledger device is connected and Celo
                    App 1.5.0 or above is opened.
                  </Typography>
                </Grid>
              </Grid>
            </DialogContentText>
          </Grid>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
        Ledger Dialog
      </Button>{" "}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="ledger-dialog"
        // fullWidth
        maxWidth="md"
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
          <Grid container spacing={1} className={classes.item}>
            {/* <DialogContentText id="1">
              <Grid item xs={12}>
                <Typography
                  variant="caption"
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
                  variant="caption"
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
                  variant="caption"
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
                <Typography variant="caption" noWrap={false}>
                  You are going to lock {"2"} cGLD, it that's correct, please
                  sign in your ledger device.
                </Typography>
              </Grid>
              <Divider className={classes.divider} />
              <Grid container spacing={1} className={classes.item}>
                <Grid item xs={6}>
                  <Typography
                    variant="caption"
                    noWrap
                    className={classes.alignLeft}
                    align="left"
                  >
                    Account
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="caption"
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
                    variant="caption"
                    noWrap
                    className={classes.alignLeft}
                    align="left"
                  >
                    Lock Amount
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="caption"
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
                    variant="caption"
                    noWrap
                    className={classes.alignLeft}
                    align="left"
                  >
                    Tx Fee
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="caption"
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
                    variant="caption"
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
                        <Typography variant="caption" noWrap>
                          View Transactions
                        </Typography>
                      </Button>
                    </div>
                  </Link>
                </Grid>
              </Grid>
            </DialogContentText> */}
            {getSignInMessage()}
          </Grid>
        </DialogContent>
        <DialogActions className={classes.root}></DialogActions>
      </Dialog>
    </div>
  );
}
