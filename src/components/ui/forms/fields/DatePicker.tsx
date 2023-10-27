import React from "react";
import {Duration} from "date-fns"
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';

import {DatePicker as MuiDatePicker} from '@mui/x-date-pickers/DatePicker';

export interface DatePickerProps {
    id: string
    name: string
    value: Duration|null,
    onChange: (value: Duration | null) => void,
    minDate?: any,
    maxDate?: any,
    label: string,
    disableFuture?: boolean
    disableMaskedInput?: boolean
    error?: boolean
    helperText?: string
}


const DatePicker = (props: DatePickerProps) => {

    const [open, setOpen] = React.useState<boolean>(false)

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MuiDatePicker
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                label={props.label}
                value={props.value}
                minDate={props.minDate}
                maxDate={props.maxDate}
                onChange={(value) => props.onChange(value)}
                slotProps={{
                    textField: {
                        variant: "outlined",
                        error: props.error,
                        helperText: props.helperText
                    }
                }}
            />
        </LocalizationProvider>
    );
};

export default DatePicker;

