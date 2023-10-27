import React from "react";
import TextField, {TextFieldProps} from "@/components/ui/mui/form/TextField";


const EmailField = (props: TextFieldProps) => {
    return (
        <TextField {...props} type="email"/>
    )
}

export default EmailField;