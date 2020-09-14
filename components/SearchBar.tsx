import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      borderRadius: 5,
      [theme.breakpoints.down('sm')]: {
        marginTop: "0.5rem"
      },
    },

    inputLabel: {
      height: "2rem",
      verticalAlign: "middle",
      padding: "0px 1rem 1rem",
      fontSize: "14px",
      background: "rgba(255, 255, 255, 1)",
      width: "100%",
      display: "flex",
    },
    container: {
      padding: "0rem",
    },
  })
);

interface State {
  txSearch: string;
}

const SearchBar = () => {
  const classes = useStyles();
  const [values, setValues] = React.useState<State>({
    txSearch: "",
  });

  const handleChange = (prop: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1} >
        <Grid item xs={12}>
          <FormControl fullWidth variant="filled" margin="dense">
            <InputLabel htmlFor="search-bar"></InputLabel>

            <FilledInput
              className={classes.inputLabel}
              id="search-bar"
              value={values.txSearch}
              fullWidth
              disableUnderline={true}
              onChange={handleChange("txSearch")}
              placeholder="Search by address / token symbol name / tx"
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
}

export default SearchBar