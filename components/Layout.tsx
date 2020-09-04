import React from "react";
import clsx from "clsx";
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import SearchBar from "../components/SearchBar";
import NetworkDropdown from "../components/NetworkDropdown";
import Link from "../components/Link";
import PriceCard from "../components/PriceCard";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Ledger from "./ledger/Ledger";
import Footer from "../components/Footer";
import Container from '@material-ui/core/Container';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      marginTop: "0.5rem"
    },
    icon: {
      paddingRight: "2rem",
      paddingLeft: "0.5rem",
      marginTop: "0.3rem"
    },
  }),
);



const Layout = (props: { children: React.ReactNode }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const theme = useTheme();
  const largeScreen = useMediaQuery(theme.breakpoints.up('lg'));



  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open Celo Drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {[
            <Link href="/" color="inherit">
              <Typography variant="body1" color="textPrimary">
                <ListItemIcon className={classes.icon}>
                  <img src="/images/img/home.svg" />
                </ListItemIcon>
                {"Dashboard"}</Typography>{" "}
            </Link>,
            <Link href="/blocks" color="inherit">
              <Typography variant="body1" color="textPrimary">
                <ListItemIcon className={classes.icon}>
                  <img src="/images/img/blocks.svg" />
                </ListItemIcon>
                {"Blocks"}</Typography>{" "}
            </Link>,
            <Link href="/transactions" color="inherit">
              <Typography variant="body1" color="textPrimary">
                <ListItemIcon className={classes.icon}>
                  <img src="/images/img/txs.svg" />
                </ListItemIcon>
                {"Transactions"}</Typography>{" "}
            </Link>,
            <Link href="/accounts" color="inherit">
              <Typography variant="body1" color="textPrimary">
                <ListItemIcon className={classes.icon}>
                  <img src="/images/img/validators.svg" />
                </ListItemIcon>
                {"Accounts"}</Typography>{" "}
            </Link>,
            <Link href="/proposals" color="inherit">
              <Typography variant="body1" color="textPrimary">
                <ListItemIcon className={classes.icon}>
                  <img src="/images/img/proposal.svg" />
                </ListItemIcon>
                {"Proposals"}</Typography>{" "}
            </Link>,
            <Link href="/validatorVotes" color="inherit">
              <Typography variant="body1" color="textPrimary">
                <ListItemIcon className={classes.icon}>
                  <img src="/images/img/proposal.svg" />
                </ListItemIcon>
                {"Validator Votes"}</Typography>{" "}
            </Link>,
          ].map((text, index) => (
            <ListItem button key={index}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
          {/* <Divider />
          {[
            <Link href="/account" color="inherit">
              <Typography variant="body1" color="textPrimary">
                <ListItemIcon className={classes.icon}>
                  <img src="/images/img/user-login.svg" />
                </ListItemIcon>
                {"Michelle Clark"}
              </Typography>
            </Link>,

            <Link href="/blocks" color="inherit">
              <Typography variant="body1" color="textPrimary">
                <ListItemIcon className={classes.icon}>
                  <img src="/images/img/logout.svg" />
                </ListItemIcon>
                {"Logout"}
              </Typography>
            </Link>,
            <Link href="/transactions" color="inherit">
              <Typography variant="body1" color="textPrimary" id="signin-ledger">
                <ListItemIcon className={classes.icon}>
                  <img src="/images/connect-ledger.svg" />
                </ListItemIcon>
                {"Sign In With Ledger"}
              </Typography>{" "}
            </Link>,
          ].map((text, index) => (
            <ListItem button key={index}>
              <ListItemText primary={text} />
            </ListItem>
          ))} */}
        </List>

      </Drawer>
      <Container maxWidth="xl" disableGutters={largeScreen ? false : true} >
        <main className={classes.content}>{props.children}</main>
      </Container>
    </div>
  );
}
export default Layout;
