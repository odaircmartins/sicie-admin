import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const ButtonStyled = styled(Button)({
    width: '100%',
    borderColor: 'var(--button-color)',
    color: 'var(--button-color)',
    '&:hover': {
        borderColor: 'var(--button-color)',
    },
});

function ButtonMuiStyled(props) {
    return (
        <ButtonStyled {...props}></ButtonStyled>
    );
}

export default ButtonMuiStyled;