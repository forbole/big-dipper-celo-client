import React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      padding:'0 0 1rem 0',
      verticalAlign: 'middle',  
    },
    
    inputLabel:{
      height: '2rem',
      verticalAlign: 'middle', 
      padding: '0px 1rem 1rem',
      fontSize: '12px',
    },
    container:{
      justifyContent: 'center', 
      padding: '0rem'
    }
  }),
);

interface State {
  txSearch: string;

}

export default function SearchBar() {
  const classes = useStyles();
  const [values, setValues] = React.useState<State>({
    txSearch: '',
  });

  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };




  return (
    <div className={classes.root}>
      <Grid container spacing={1} className={classes.container}>
      <Grid item xs={10} md={7} >
        <FormControl fullWidth variant="filled">
        
          <InputLabel htmlFor="filled-adornment-amount" ></InputLabel>
         
          <FilledInput
          className={classes.inputLabel}
            id="filled-adornment-amount"
            value={values.txSearch}
            fullWidth
            disableUnderline={true}
            onChange={handleChange('txSearch')}
            placeholder="Search by address / token symbol name / tx"
            startAdornment={<InputAdornment position="start">
                <SearchIcon />
            </InputAdornment>}
          />
        </FormControl>
        </Grid>
        </Grid> 
      </div>
  );
}