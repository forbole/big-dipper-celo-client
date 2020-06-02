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
import Layout from "../components/Layout";
import CardContent from "@material-ui/core/CardContent";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import Container from "@material-ui/core/Container";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";
import ListSubheader from "@material-ui/core/ListSubheader";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";

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
  title: {
    // padding: "1rem",
    display: "block",
    textAlign: "center",
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

  formControl: {
    //minWidth: '20rem',
    //width: '100%',
    // padding: "1rem",
    //marginBottom: '1rem',
    //float: "right",
    //maxHeight: '12rem',
    //marginTop: '-1.5rem',
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
    //padding: "0 0 0 1rem",
  },

  alignRight: {
    display: "block",
    float: "right",
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
    margin: "0.5rem",
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
});

interface State {
  tokenSearch: string;
}

function LockGoldDialog() {
  const classes = useStyles();

  return (
    <FormControl
      className={clsx(classes.margin, classes.textField)}
      variant="outlined"
      fullWidth={true}
      size="small"
    >
      <InputLabel htmlFor="outlined-adornment">
        <Typography
          variant="caption"
          color="textSecondary"
          className={classes.rightPadding}
        >
          Insert Amount
        </Typography>
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment"
        endAdornment={<InputAdornment position="end">cGLD</InputAdornment>}
        labelWidth={100}
      />
    </FormControl>
  );
}

function TokenDropdown() {
  const classes = useStyles();
  let name = "Michelle Clark";
  let name_2 = "Ada Adams";
  return (
    <FormControl className={classes.formControl} fullWidth={true} size="medium">
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
            className={classes.rightPadding}
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

  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <Typography variant="body2" noWrap className={classes.title}>
            Lock Celo Gold
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={1} className={classes.item}>
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
            {/* <Grid item xs={10}>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          </Grid>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
  /> */}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid item xs={5}>
            <LedgerButtons variant="Cancel" onClick={handleClose} />
          </Grid>
          <Grid item xs={5}>
            <LedgerButtons variant="Confirm" onClick={handleClose} />
          </Grid>
          {/* <Button onClick={handleClose} color="primary">
            Cancel
          </Button> */}
          {/* <Button onClick={handleClose} color="primary">
            Confirm
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}
