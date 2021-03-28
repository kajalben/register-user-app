import { Grid, makeStyles } from "@material-ui/core";
import Controls from "../Controls/Controls";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "100%",
      margin: theme.spacing(1),
    },
  },
}));

const LoginForm = ({ onAuth, onSetCredentials, error }) => {
  const classes = useStyles();
  return (
    <form className={classes.root} autoComplete="off">
      <Grid container>
        <Grid item xs={12}>
          <Controls.Input
            label="Email"
            name="email"
            onChange={onSetCredentials}
            error={error && error.email}
          />
        </Grid>
        <Grid item xs={12}>
          <Controls.Input
            label="Password"
            name="password"
            onChange={onSetCredentials}
            error={error && error.password}
          />
        </Grid>
        {error && <span style={{ color: "red" }}>{error.network}</span>}
        <Grid item xs={12} className="btn-center">
          <Controls.Button text="Sign In" type="submit" onClick={onAuth} />
        </Grid>
      </Grid>
    </form>
  );
};

export default LoginForm;
