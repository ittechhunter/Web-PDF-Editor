import  React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {OverridableStringUnion} from "@mui/types";
import {CircularProgressPropsColorOverrides} from "@mui/material/CircularProgress/CircularProgress";

interface Props {
    /**
     * The color of the component.
     * It supports both default and custom theme colors, which can be added as shown in the
     * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
     * @default 'primary'
     */

    color?: OverridableStringUnion<
        'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit',
        CircularProgressPropsColorOverrides
    >

    /**
     * The size of the component.
     * If using a number, the pixel unit is assumed.
     * If using a string, you need to provide the CSS unit, e.g '3rem'.
     * @default 40
     */
    size?: number | string;
}

export default function Loader(
    {color, size}: Props
) {
    return (

        <Box sx={{display: 'flex'}}>
            <CircularProgress color={color} size={size}/>
        </Box>
    );
}
