import { Button as MuiButton,makeStyles } from "@material-ui/core";

const useStyles = makeStyles( theme =>({
  root: {
    margin : theme.spacing(0.5)
  },
  label: {
    textTransform : "none"
  },
}))

const Button = (props) => {
  const classes = useStyles();
  const { text, size, color, variant, onClick, ...other } = props;
  return (
    <>
      <MuiButton classes={{root : classes.root, label: classes.label }}
        size={size || 'large'}
        color={color || "primary"}
        variant={variant || "contained"}
        onClick={onClick}
        {...other}
      >
        {text}
      </MuiButton>
    </>
  );
};

export default Button;
