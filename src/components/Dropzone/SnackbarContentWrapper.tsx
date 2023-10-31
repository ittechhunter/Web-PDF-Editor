import IconButton from '@mui/material/IconButton';
import SnackbarContent from '@mui/material/SnackbarContent';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import clsx from 'clsx';
import React from 'react';
import {styled} from '@mui/system';

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

interface SnackbarContentWrapperProps {
    className?: string;
    message: React.ReactNode;
    onClose: ()=>void;
    variant: 'success' | 'warning' | 'error' | 'info';
}



const StyledDropzoneSnackbar = styled("div")(({theme}) => ({
    '.successAlert': {
        backgroundColor: theme.palette.success.main,
    },
    '.errorAlert': {
        backgroundColor: theme.palette.error.main,
    },
    '.infoAlert': {
        backgroundColor: theme.palette.info.main,
    },
    '.warningAlert': {
        backgroundColor: theme.palette.warning.main,
    },
    '.message': {
        display: 'flex',
        alignItems: 'center',
        '& > svg': {
            marginRight: theme.spacing(1),
        },
    },
    '.icon': {
        fontSize: 20,
        opacity: 0.9,
    },
    '.closeButton': {},
}));

function SnackbarContentWrapper(props: SnackbarContentWrapperProps) {
    const {className, message, onClose, variant, ...other} = props;
    const Icon = variantIcon[variant];

    return (
        <StyledDropzoneSnackbar>
            <SnackbarContent
                className={clsx(`${variant}Alert`, className)}
                aria-describedby="client-snackbar"
                message={
                    <span id="client-snackbar" className={"message"}>
                    <Icon className={"icon"}/>
                        {message}
                </span>
                }
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={"closeButton"}
                        onClick={onClose}
                    >
                        <CloseIcon className={"icon"}/>
                    </IconButton>,
                ]}
                {...other}
            />
        </StyledDropzoneSnackbar>
    );
}


export default SnackbarContentWrapper;