import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
    //   width: '100%',
    //   maxWidth: '36ch',
    //   minWidth: 200,
    //   maxWidth: 500,
      backgroundColor: theme.palette.background.paper,
      opacity: 1,
    //   display: 'inline-block',
         overflow: 'hidden',
        whiteSpace: 'nowrap',
        fontSize: '10px'
    },
    box:{
        fontSize: 18,
        letterSpacing: '1px',
        padding: 10,
        display: 'block',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      },
    inline: {
      display: 'inline',
    },
    transactions:{
        fontSize: 5,
    },
    link:{
        float: 'right',
        textAlign: 'right',
    
      }
  }),
);

export default function AlignItemsList() {
  const classes = useStyles();
  const preventDefault = (event: React.SyntheticEvent) => event.preventDefault();

  return (
    <Grid container spacing={1} style={{ marginTop: 10, marginBottom: 10}} >
    <Grid item xs={12} md={12} lg={12} >
    <List className={classes.root}>
    <Box className={classes.box}>Latest Transactions <Link className={classes.link} href="#" onClick={preventDefault} color="secondary">
    {'view more'}
  </Link>
        </Box>
        <Divider variant='middle'/>
      <ListItem alignItems="flex-start" className={classes.transactions}>

        <ListItemText
          primary={
            <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            >
              Tx# 
            </Typography>
            <Link href="#" onClick={preventDefault} color="secondary"  align="right" >
    {" 0xd3b4592h56ddw01182734434341cdwq2q2"}
  </Link>
          </React.Fragment>
          }
          secondary={
            <React.Fragment >
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                From
              </Typography>
              <Link href="#" onClick={preventDefault} color="secondary"  align="right" >
              {" 0xAe1ec1d207hd3pwn82264bd554"}
            </Link>

            <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                To
              </Typography>
              <Link href="#" onClick={preventDefault} color="secondary"  align="right" >
              {" 0xAe1ec1d207hd3pwn82264bd554"}
            </Link>
              
            </React.Fragment>
            
          } 
        />

{/* 
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Summer BBQ"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                to Scott, Alex, Jennifer
              </Typography>
              {" — Wish I could come, but I'm out of town this…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Oui Oui"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Sandra Adams
              </Typography>
              {' — Do you have Paris recommendations? Have you ever…'}
            </React.Fragment>
          }
        /> */}
      </ListItem>
    </List>
    </Grid>
    </Grid>
  );
}