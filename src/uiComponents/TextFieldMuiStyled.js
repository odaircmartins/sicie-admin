import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

const TextFieldStyled = styled(TextField)({
    width: '100%',
    '& label.Mui-focused': {
        color: 'var(--textfield-color)',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'var(--textfield-color)',
    },
    '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
            borderColor: 'var(--textfield-color)',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'var(--textfield-color)',
        }
    }
});

function TextFieldMuiStyled(props) {
    return (
        <TextFieldStyled {...props}/>
    );
}

export default TextFieldMuiStyled;