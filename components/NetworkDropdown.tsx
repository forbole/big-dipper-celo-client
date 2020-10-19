import React from "react";
import { makeStyles, Theme, createStyles, withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { Divider } from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import Grid from "@material-ui/core/Grid";
import Link from "./Link";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "inline-block",
      justifyContent: "center",
    },

    formControl: {
      minWidth: "9.75rem",
      background: "rgba(255, 255, 255, 1)",
      padding: "0rem",
      borderRadius: 5,
      position: 'relative',
      marginLeft: "1rem"
    },
    celoIcon: {
      width: "1.25rem",
      height: "1.25rem",
      marginRight: "0.5rem",
    },

    dotIcon: {
      height: "0.8rem",
      width: "0.8rem",
      marginLeft: "0.5rem",
      marginRight: "0.3rem",
      marginTop: "0.25rem",
      verticalAlign: "middle",
    },
    MuiSelectIcon: {
      padding: "none",
      height: "1rem"
    },
    icon: {
      fill: "rgba(0, 0, 0, 1)",
      fontWeight: 200,
      marginRight: "0.5rem",
      marginTop: "-0.4rem",
    },
    divider: {
      backgroundColor: "rgba(0, 0, 0, 0.16)",
      margin: "0 1rem",
    },
    menuItem: {
      verticalAlign: "middle",
    },

    inputLabel: {
      padding: "0rem",
      display: "inline-flex",
      marginTop: "-0.9rem",
    }
  })
);



const NetworkDropdown = () => {
  const classes = useStyles();
  const [show, setShow] = React.useState<string | number>("");
  const [open, setOpen] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setShow(event.target.value as number);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Grid container >
      <Grid item xs={12}>
        <FormControl className={classes.formControl} margin="dense" size="small" >
          <InputLabel id="network-selection-label" className={classes.inputLabel}>
            <FiberManualRecordIcon color="action" className={classes.dotIcon} />
            <Typography align="center" variant="body2" color="textPrimary">
              Alfajores
            </Typography>
          </InputLabel>
          <Select
            labelId="network-selection-label"
            id="network-selection-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={show}
            onChange={handleChange}
            disableUnderline={true}
            IconComponent={KeyboardArrowDownIcon}
            className={classes.MuiSelectIcon}
            classes={{
              icon: classes.icon,
            }}
          >
            <Link href="#" color="textPrimary">
              <MenuItem className={classes.menuItem}>
                <Avatar
                  alt="Celo Alfajores"
                  src="/images/celo-icon.svg"
                  className={classes.celoIcon}
                />
                <Typography variant="body2">Celo Alfajores</Typography>
              </MenuItem>
            </Link>
            <Divider className={classes.divider} />

            <Link
              href="www.baklava-blockscout.celo-testnet.org/"
              color="textPrimary"
            >
              <MenuItem className={classes.menuItem}>
                <Avatar
                  alt="Celo Baklava"
                  src="/images/celo-icon.svg"
                  className={classes.celoIcon}
                />
                <Typography variant="body2">Celo Baklava</Typography>
              </MenuItem>
            </Link>
            <Divider className={classes.divider} />
            <Link
              href="www.integration-blockscout.celo-testnet.org/"
              color="textPrimary"
            >
              <MenuItem className={classes.menuItem}>
                <Avatar
                  alt="Celo Integration"
                  src="/images/celo-icon.svg"
                  className={classes.celoIcon}
                />
                <Typography variant="body2">Celo Integration</Typography>
              </MenuItem>
            </Link>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default NetworkDropdown