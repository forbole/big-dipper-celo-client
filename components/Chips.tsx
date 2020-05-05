import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      justifyContent: 'center',
      flexWrap: 'wrap',
      },
    
  }),
);

export default function Chips(props: any) {
  const classes = useStyles();

  switch(props.value){
    case 'Token Transfer':
      return <div className={classes.root}>
      <Chip size="small" label="Token Transfer" style={{backgroundColor: 'rgba(217, 131, 28, 1)',}}/>
    </div>
    case 'Contract Call':
      return <div className={classes.root}>
      <Chip size="small" label="Contract Call" style={{backgroundColor: 'rgba(31, 217, 110, 1)'}}/>
    </div>
    case 'Success':
      return <div className={classes.root}>
      <Chip size="small" icon={<CheckCircleIcon />} label="Success" style={{backgroundColor: 'rgba(31, 217, 110, 1)'}}/>
    </div>
    case 'Delegate All':
      return <div className={classes.root}>
      <Chip size="small"  label="Delegate All" style={{backgroundColor: 'rgba(182, 83, 244, 1)'}}/>
    </div>
    case 'Static Call':
      return <div className={classes.root}>
      <Chip size="small"  label="Static Call" style={{backgroundColor: 'rgba(31, 196, 217, 1)'}}/>
    </div>
    case 'Create':
      return <div className={classes.root}>
      <Chip size="small"  label="Create" style={{backgroundColor: 'rgba(34, 217, 110, 1)'}}/>
    </div>
    
    default:
      return  <div className={classes.root}>
      <Chip size="small" label={props.value} />
    </div>
      
  }
}
