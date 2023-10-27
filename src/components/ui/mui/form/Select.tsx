import {default as MuiSelect} from '@mui/material/Select';
import type {SelectProps as MuiSelectProps} from '@mui/material/Select';

export type SelectProps = MuiSelectProps;

const Select = (props: SelectProps) =>{
    return (
        <MuiSelect {...props}/>
    )
}

export default Select;