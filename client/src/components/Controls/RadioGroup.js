import Radio from '@material-ui/core/Radio';
import {RadioGroup as MuiRadioGroup, FormControlLabel, FormControl, FormLabel, makeStyles} from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
    root:{
        flexDirection : 'row'
    },
}))



const RadioGroup = (props) =>{
    const {lable, name, value, onChange, items} = props;
    const classes = useStyles();

 return(
     <FormControl component="fieldset">
        <FormLabel component="legend">{lable}</FormLabel>
        <MuiRadioGroup name={name} value={value} onChange={onChange}classes={{root: classes.root}}>
        {
            items.map( item => <FormControlLabel value={item.id} control={<Radio />} label={item.label}/>)
        }
        </MuiRadioGroup>
    </FormControl>
 )
}

export default RadioGroup;