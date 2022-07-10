import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';

const FormControlLabelStyled = styled(FormControlLabel)({
    width: '200px'
});

const SwitchStyled = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: "var(--switch-color)"
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: "var(--switch-color)"
    }
}));

function SwitchMuiStyled(props) {
    return (
        <FormControlLabelStyled control={<SwitchStyled {...props}/>} label="Ativo" />
    );
}

export default SwitchMuiStyled;