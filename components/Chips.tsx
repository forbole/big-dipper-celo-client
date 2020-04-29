import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0.5),
      },
    },
  }),
);

export default function Chips(props: String) {
  const classes = useStyles();

  switch(props.value){
    case 'Token Transfer':
      return <div className={classes.root}>
      <Chip size="small" label="Token Transfer" style={{backgroundColor: 'rgba(217, 131, 28, 1)',}}/>
    </div>
    case 'Contract Call':
      return <div className={classes.root} >
      <Chip size="small" label="Contract Call" style={{backgroundColor: 'rgba(31, 217, 110, 1)'}}/>
    </div>
    default:
      return  <div className={classes.root}>
      <Chip size="small" label=" " />
    </div>
      
  }
}
