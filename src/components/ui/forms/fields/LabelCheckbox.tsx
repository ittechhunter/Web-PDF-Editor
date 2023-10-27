import React from 'react'
import { FormControl, FormControlLabel, Typography} from '@mui/material'
import Checkbox from "@/components/ui/mui/form/Checkbox";


export interface CheckboxProps {
    id: string
    name: string
    label: string
    checked: boolean
    onChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void,
    size?: 'small' | 'medium'
    color?: 'error' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'default' | undefined
    fullWidth?: boolean
    margin?: 'normal' | 'dense' | 'none'
}

const LabelCheckbox = (props: CheckboxProps) => {
    const {
        id,
        name,
        label,
        onChange,
        checked,
        size = 'medium',
        color = 'primary',
        fullWidth = false,
        margin = 'dense',
    } = props
    return (
        <FormControl margin={margin} fullWidth={fullWidth}>
            <FormControlLabel
                control={
                    <Checkbox
                        id={id}
                        name={name}
                        size={size}
                        color={color}
                        checked={checked}
                        onChange={(e, checked)=>onChange(e, checked)}
                    />
                }
                label={
                    <Typography variant="inherit" sx={{userSelect: 'none'}}>
                        {label}
                    </Typography>
                }
            />
        </FormControl>

    )
}

export default LabelCheckbox;

