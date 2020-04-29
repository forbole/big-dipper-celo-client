import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Divider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { createStyles, useTheme, Theme } from '@material-ui/core/styles';
import GitHubIcon from '@material-ui/icons/GitHub';
import TelegramIcon from '@material-ui/icons/Telegram';
import TwitterIcon from '@material-ui/icons/Twitter';
import Avatar from '@material-ui/core/Avatar';




const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      backgroundColor: '#131619',
      opacity: 1,
      overflow: 'hidden',
      maxWidth: 'inherit',
    },
    text:{
        letterSpacing: '1px',
        padding: '1rem',
        display: 'block',
        overflow: 'hidden',
      },
      socialMedia:{
        margin: '1rem',
        display: 'inline-block',
        overflow: 'hidden',

      }
  }),
);




export default function Footer() {
    const classes = useStyles();
    return (
        <Grid container className={classes.root}>
        <Grid item  >
        <img src="/images/celo_logo.svg" style={{ marginTop: '25px', marginLeft: '25px'}}/>
          <Typography variant="body2" className={classes.text} align='center'>
          Blockscout is a tool for inspecting and analyzing EVM based blockchains. Blockchain explorer for Ethereum Networks.
          </Typography>
          <Link href="https://discordapp.com/invite/6yWMkgM" className={classes.socialMedia}><img src="/images/discord_icon.svg" /></Link>
          <Link href="https://github.com/celo-org" className={classes.socialMedia}><GitHubIcon fontSize="small"/></Link>
          <Link href="https://medium.com/celoorg" className={classes.socialMedia}><img src="/images/medium_icon.svg" /></Link>
          <Link href="https://twitter.com/CeloOrg" className={classes.socialMedia}><TwitterIcon  fontSize="small"/></Link>
        </Grid>
     </Grid>
    );
  }