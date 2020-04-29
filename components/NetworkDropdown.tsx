import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';




const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    formControl: {
      minWidth: theme.spacing(14),
      marginBottom: theme.spacing(2),
    },
    small: {
      width: theme.spacing(2),
      height: theme.spacing(2),
      marginRight: theme.spacing(1),
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
        <Typography align='center' variant="body2">Celo Alfajores</Typography>  
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
          <Avatar alt="Celo Alfajores" src="/images/celo_avatar.svg" className={classes.small} />
              <Typography  variant="body2">Celo Alfajores</Typography> 
          </MenuItem>
          <Divider variant='middle' />
          <MenuItem>
          <Avatar alt="Celo Baklava" src="/images/celo_avatar.svg" className={classes.small} />
          <Typography  variant="body2">Celo Baklava</Typography> 
          </MenuItem>
          <Divider variant='middle' />
          <MenuItem>
          <Avatar alt="Celo Integration" src="/images/celo_avatar.svg" className={classes.small} />
          <Typography  variant="body2">Celo Integration</Typography>  
          </MenuItem>
        </Select>
      </FormControl>
    </div>
</Container>

  );
}
