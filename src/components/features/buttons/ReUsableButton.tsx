import React, {ReactNode} from "react";

import {Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {useConfirm} from "material-ui-confirm";
import SmartButtonIcon from '@mui/icons-material/SmartButton';
import {toastLoading, toastUpdate} from "@/lib/helper";
import MenuItem from "@mui/material/MenuItem";

interface Props {
    onClick: (callback: (props: { isError: boolean, message?: string | null }) => Promise<void>) => Promise<void>
    title: string
    icon?: ReactNode
    onCancel?: () => Promise<void>
    confirmText?: string
    type?: "menuItem" | "iconButton"

}

const ReUsableButton = (
    {
        onClick,
        title,
        icon,
        onCancel,
        confirmText,
        type="iconButton",
    }: Props) => {
    const confirm = useConfirm()

    const handleClick = () => {
        confirm(
            {'title': confirmText ?? "Do you want to perform this action!?"}
        ).then(async () => {
            const toastId = toastLoading("Please wait!")
            const callback = async (props: { isError: boolean, message?: string | null }) => {
                if (props.isError) {
                    toastUpdate(toastId, props.message ?? "Fail", 'warning');
                } else {
                    toastUpdate(toastId, props.message ?? "Success", 'success');
                }
            }
            await onClick(callback)
        }).catch(async () => {
            if (onCancel) await onCancel()

        })
    }

    if (type === 'iconButton') {
        return (
            <Tooltip title={title}
                     placement="top">
                <IconButton
                    onClick={() => handleClick()} aria-label="button">
                    {icon ? icon : <SmartButtonIcon/>}
                </IconButton>
            </Tooltip>
        )
    }
    return (
        <MenuItem disableRipple onClick={handleClick}>
            {icon ? icon : <SmartButtonIcon/>}
            {title}
        </MenuItem>
    )

}

export default ReUsableButton;