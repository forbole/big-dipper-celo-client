import React from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CssBaseline from '@material-ui/core/CssBaseline';
import SearchBar from '../components/SearchBar';
import NetworkDropdown from '../components/NetworkDropdown';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Link from '../components/Link';
import PriceCard from '../components/PriceCard';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';




const drawerWidth = 390;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
     // margin: '0.5rem'
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: drawerWidth,
    },
    title: {
      flexGrow: 1,
      margin: '1rem 0 0 1rem',
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-start',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(1),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginRight: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    },
  }),
);

const Layout = (props: { children: React.ReactNode; }) => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

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
            <Typography  noWrap className={classes.title}>
            <Link href="/" >
            <img src="/images/celo_logo.svg" />
            </Link>
            </Typography>
            
            <div><NetworkDropdown /></div>
            
            <IconButton
              color="inherit"
              aria-label="Open Menu"
              edge="end"
              onClick={handleDrawerOpen}
              className={clsx(open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
          <SearchBar />
          <Hidden smDown>
          <div style={{display:'flex', margin: '-3rem 0rem 1rem 2.5rem'}}>
              <PriceCard />
            </div>
            </Hidden>
        </AppBar>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })} style={{marginTop: '0.5rem', overflow: 'auto'}} /*style={{ padding: 0, overflowY: 'auto' }}*/
        >
          <div className={classes.drawerHeader} />
          {props.children}
        </main>

        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="right"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
          
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {[<Link href="/" color="inherit" > {'Dashboard'} </Link>,
            <Link href="/blocks" color="inherit" > {'Blocks'} </Link>,
            <Link href="/transactions" color="inherit" > {'Transactions'} </Link>,
            <Link href="/accounts" color="inherit" > {'Accounts'} </Link>,
            <Link href="/proposals" color="inherit" > {'Proposals'} </Link>, 
            <Link href="/votingPower" color="inherit" > {'Voting Power'} </Link>].map((text, index) => (
              <ListItem button key={text}>
                <ListItemText primary={text} onClick={handleDrawerClose} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
          <ListItem button >
              <ListItemIcon >
                <VpnKeyIcon color="secondary" />
                </ListItemIcon>
              <ListItemText primary={' Sign In With Ledger'} onClick={handleDrawerClose}/>
            </ListItem>
          </List>
        </Drawer>

      </div>
    );
  }

export default Layout