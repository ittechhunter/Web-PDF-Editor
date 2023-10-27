import {default as MuiCheckbox} from '@mui/material/Checkbox';
import type {  CheckboxProps as MuiCheckboxProps} from '@mui/material/Checkbox';

export type CheckboxProps = MuiCheckboxProps;

const Checkbox = (props: CheckboxProps)=>{
    return (
        <MuiCheckbox {...props}/>
    )
}

export default Checkbox;
