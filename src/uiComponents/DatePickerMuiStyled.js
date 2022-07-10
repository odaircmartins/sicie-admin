import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import ptbrLocale from 'date-fns/locale/pt-BR';

import TextFieldMuiStyled from "../uiComponents/TextFieldMuiStyled";

function DatePickerMuiStyled(props) {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptbrLocale}>
            <DateTimePicker
                {...props}
                size="small"
                renderInput={(params) => (
                    <TextFieldMuiStyled
                        {...params}
                        inputProps={{ ...params.inputProps, placeholder: "dd/mm/aaaa" }}
                    />
                )}
            />
        </LocalizationProvider>
    );
}

export default DatePickerMuiStyled;