import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    formRoot: {
        width: '100%',
        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--select-color)"
        },
        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {            
            borderColor: "var(--select-color)"
        },
        "& .Mui-disabled .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--select-color)"
        },
        "& .Mui-focused": {
            color: "var(--select-color)"
        }
    }
}));

function SelectMuiStyled(props) {
    const classes = useStyles();
    const categories = props.data;

    return (
        <FormControl  classes={{root: classes.formRoot}}>                            
            <InputLabel id="select-category-label">Categoria</InputLabel>
            <Select labelId="select-category-label" id="select-category" label="Categoria" {...props}>
                {categories.map(category => (
                    <MenuItem  key={category} value={category}>
                        {category}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default SelectMuiStyled;