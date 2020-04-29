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
      backgroundColor: '#131619',
      opacity: 1,
      padding: '1.5rem 1rem'
    },
    text:{
        letterSpacing: '1px',
        padding: '1rem 0',
        display: 'block',
        overflow: 'hidden',
      },
      socialMedia:{
        marginRight: '0.8em',
        display: 'inline-block',
        height: '2rem',
        width: '2rem',
        
      }
  }),
);




export default function Footer() {
    const classes = useStyles();
    return (
      <footer>
        <Grid container  className={classes.root}>
          <Container maxWidth="lg">
        <Grid item  >
        <img src="/images/celo_logo.svg" />
          <Typography variant="caption" className={classes.text} align='left'>
          Blockscout is a tool for inspecting and analyzing EVM based blockchains. Blockchain explorer for Ethereum Networks.
          </Typography>
          <Link href="https://discordapp.com/invite/6yWMkgM" className={classes.socialMedia}><img src="/images/discord_icon.svg" /></Link>
          <Link href="https://github.com/celo-org" className={classes.socialMedia}><img src="/images/github_icon.svg" /></Link>
          <Link href="https://medium.com/celoorg" className={classes.socialMedia}><img src="/images/medium_icon.svg" /></Link>
          <Link href="https://twitter.com/CeloOrg" className={classes.socialMedia}><img src="/images/twitter_icon.svg" /></Link>
        </Grid>
        </Container>
     </Grid>
    </footer>
    );
  }