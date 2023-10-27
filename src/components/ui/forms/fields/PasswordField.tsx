import React, {useState} from "react";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import TextField, {TextFieldProps} from "@/components/ui/mui/form/TextField";


const PasswordField = (props: TextFieldProps) => {
    const [showPass, setShowPass] = useState(false);
    return (
        <TextField
            fullWidth={true}
            {...props}
                   type={showPass ? "text" : "password"}
                   InputProps={{
                       endAdornment: (
                           <InputAdornment position="end">
                               <IconButton onClick={() => setShowPass(!showPass)}>
                                   {showPass ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                               </IconButton>
                           </InputAdornment>
                       )
                   }}
        />
    )
}

export default PasswordField;