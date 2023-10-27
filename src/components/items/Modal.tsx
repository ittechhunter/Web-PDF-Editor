import {Card, CardContent, CardHeader, Divider, IconButton, Modal as MuiModal} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

interface Props {
    cargoId?: number | null
    isOpen: boolean
    handleClose: any
    title?: string
    children?: any
    width?: number
}

export const Modal = ({isOpen, handleClose, title, children, width}: Props) => {

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: width ?? '50%',
        bgcolor: 'background.paper',
        // border: '2px solid #000',
        borderRadius: '5px',
        boxShadow: 24,
        // p: 4,
    };
    return (
        <MuiModal

            sx={{padding: 0}}
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Card sx={style}>
                <CardHeader id='modal-modal-title' action={
                    <IconButton aria-label="settings" onClick={handleClose}>
                        <CloseIcon/>
                    </IconButton>} component={'h2'} variant={'h6'} title={title}/>
                <Divider/>
                <CardContent id="modal-modal-description" component={'div'}>
                    {children}
                </CardContent>
            </Card>
        </MuiModal>
    )
}