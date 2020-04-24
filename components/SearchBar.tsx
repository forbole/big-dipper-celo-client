// import React from 'react';
// import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
// import SearchIcon from '@material-ui/icons/Search';

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       display: 'flex',
//       flexWrap: 'wrap',
//     },
//     textField: {
//       marginLeft: theme.spacing(1),
//       marginRight: theme.spacing(1),
//       width: '100ch',
//     searchIcon: {
//         width: '50ch',
//         height: '100%',
//         position: 'absolute',
//         pointerEvents: 'none',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     },
//   }),
// );

// export default function LayoutTextFields() {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//        < SearchIcon />
//       <div>
//         <TextField
//           id="filled-full-width centre"
//           label="Label"
//           style={{ margin: 8, }}
//           placeholder="Placeholder"
//           helperText="Full width!"
//           fullWidth
//           margin="normal"
//           InputLabelProps={{
//             shrink: true,
//             // startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
//           }}
//           variant="filled"

//         />   
//       </div>
//     </div>
//   );
// }


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
      padding: 0,
      
    },
    margin: {
      margin: theme.spacing(1),
      marginTop: theme.spacing(6),
    },
    // withoutLabel: {
    //   marginTop: theme.spacing(3),
    // },

  }),
);

interface State {
  amount: string;

}

export default function InputAdornments() {
  const classes = useStyles();
  const [values, setValues] = React.useState<State>({
    amount: '',
  });

  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };




  return (
    <div className={classes.root}>
      {/* <div className="centre"> */}
      <Grid container spacing={1} style={{ justifyContent: 'center'}}>
      <Grid item xs={11} >
        <FormControl fullWidth className={classes.margin} variant="filled">
        
          <InputLabel htmlFor="filled-adornment-amount"></InputLabel>
         
          <FilledInput
            id="filled-adornment-amount"
            value={values.amount}
            margin="dense"
            fullWidth
            onChange={handleChange('amount')}
            placeholder="Search by address / token symbol name / tx"
            startAdornment={<InputAdornment position="start">
                <SearchIcon />
            </InputAdornment>}
          />
        
        </FormControl>
        </Grid>
        </Grid> 
      </div>

    //   </div>
  );
}