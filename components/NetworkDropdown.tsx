import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      display: 'inline-block',
      //marginTop: theme.spacing(2),
      fontSize: 10,
    },
    formControl: {
      //margin: theme.spacing(1),
      minWidth: 140,
      justifyContent: 'flex-start',
      fontSize: 22,
      marginBottom: 20,
    },
  }),
);

export default function ControlledOpenSelect() {
  const classes = useStyles();
  const [age, setAge] = React.useState<string | number>('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as number);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Container style={{ marginTop: 10 }} >
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">
        Select the testnet
        </InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={age}
          onChange={handleChange}
        >
          <MenuItem >
              <img src="/images/celo_avatar.svg" className="img-responsive"/>
              Celo Alfajores
          </MenuItem>
          <MenuItem>
              <img src="/images/celo_avatar.svg" className="img-responsive"/>
              Celo Baklava
          </MenuItem>
          <MenuItem>
             <img src="/images/celo_avatar.svg" className="img-responsive"/>
              Celo Integration
          </MenuItem>
        </Select>
      </FormControl>
    </div>
</Container>

  );
}
