import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Link from '../Link';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingBottom: '0.5rem',
    },

    alignLeft: {
      display: 'flex',
      overflow: 'auto',
      padding: '0 0 0 1rem',
    },

    alignRight: {
      display: 'inline-block',
      float: 'right',
      paddingRight: '1rem',
    },

    box: {
      letterSpacing: '1px',
      padding: '1rem',
      display: 'block',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },

    contract: {
      overflowWrap: 'break-word',
      flexWrap: "wrap",
      display: 'block',
      width: '15rem',
      textAlign: "right",

    },

    contractAddress: {
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      flexWrap: 'wrap',

    },
    divider: {
      backgroundColor: "rgba(232, 232, 232, 1)",
    }

  }),
);



const ProfileSummary = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Grid container spacing={1} >
        <Grid item xs={12} >
          <Typography variant="body1" className={classes.box} >
            Profile Summary
        </Typography>
          <Divider variant='middle' className={classes.divider} />
        </Grid>

        <Grid item xs={4}>

          <Typography variant="body2" gutterBottom className={classes.alignLeft}>
            Contract
                  </Typography>
        </Grid>

        <Grid item xs={8} >
          <Typography variant="body2" gutterBottom className={classes.alignRight} noWrap={false}>
            <Link href="/" color="secondary" className={classes.contract} >
              0xa561131a1c8ac25925fb848bca45a74af61e5a38 </Link>
          </Typography>

        </Grid>


        <Grid item xs={12}>
          <Divider variant='middle' />
        </Grid>

        <Grid item xs={7}  >
          <Typography variant="body2" gutterBottom className={classes.alignLeft}>
            Decimals
                   </Typography>
        </Grid>

        <Grid item xs={5} >
          <Typography variant="body2" gutterBottom className={classes.alignRight}>
            {"16"}
          </Typography>
        </Grid>



      </Grid>


    </Card>
  );
}


export default ProfileSummary