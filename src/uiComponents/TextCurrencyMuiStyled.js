import TextFieldMuiStyled from './TextFieldMuiStyled';
import NumberFormat from 'react-number-format';

function TextCurrencydMuiStyled(props) {
    return (
        <NumberFormat
            {...props}
            customInput={TextFieldMuiStyled}
            prefix={'R$ '}
            type="text"
            decimalSeparator=","  
            decimalScale={2} 
            thousandSeparator="."
            fixedDecimalScale={true} 
            allowNegative={false}
        />
    );
}

export default TextCurrencydMuiStyled;