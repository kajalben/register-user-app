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

const Signup = ({ values, onChange, onClick, isEdit, error }) => {
  const classes = useStyles();

  return (
      <form className={classes.root}>
        <Grid container>
          <Grid item xs={12}>
            <Controls.Input
              label="First Name"
              value={values.first_name}
              name="first_name"
              onChange={onChange}
              error={error && error.first_name}
            />
          </Grid>
          <Grid item xs={12}>
            <Controls.Input
              label="Last Name"
              value={values.last_name}
              name="last_name"
              onChange={onChange}
              error={error && error.last_name}
            />
            
          </Grid>
          {!isEdit && (
            <Grid item xs={12}>
              <Controls.Input
                label="Password"
                value={values.password}
                name="password"
                onChange={onChange}
                error={error && error.password}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <Controls.Input
              label="Email"
              value={values.email}
              name="email"
              onChange={onChange}
              error={error && error.email}
            />
            
          </Grid>
          <Grid item xs={12} className="btn-center">
            <Controls.Button
              text={isEdit ? "Save User" : "Sign up"}
              type="submit"
              onClick={(e) =>onClick(e)}
            />
          </Grid>
        </Grid>
      </form>
  );
};

export default Signup;
