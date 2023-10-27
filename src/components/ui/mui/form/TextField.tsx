import {TextField as MuiTextField} from "@mui/material";
import type {TextFieldProps as MuiTextFieldProps } from "@mui/material/TextField/TextField";

export type TextFieldProps = MuiTextFieldProps;

const TextField = (props: TextFieldProps) => {
    return (
        <MuiTextField {...props}/>
    )
}

export default TextField;