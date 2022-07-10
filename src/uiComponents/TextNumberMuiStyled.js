import TextFieldMuiStyled from './TextFieldMuiStyled';
import NumberFormat from 'react-number-format';

function TextNumberMuiStyled(props) {
    return (
        <NumberFormat
            {...props}
            customInput={TextFieldMuiStyled}
            type="text"
            decimalSeparator=","  
            decimalScale={0} 
            thousandSeparator="."   
            allowNegative={false}
            fixedDecimalScale={false}
            allowEmptyFormatting={false}
            defaultValue="1"
            isNumericString={true}
            allowLeadingZeros={false}
        />
    );
}

export default TextNumberMuiStyled;