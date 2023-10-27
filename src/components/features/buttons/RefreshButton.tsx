import React from "react";

import {Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import {useConfirm} from "material-ui-confirm";

const RefreshButton = ({onClick}: { onClick: () => void }) => {
    const confirm = useConfirm()
    const handleClick = () => {
        confirm({'title': "Do you want to refresh!?"}).then(async () => onClick())
    }

    return (
        <Tooltip title="Refresh" placement="top">
            <IconButton
                onClick={() => handleClick()} aria-label="refresh">
                <RefreshIcon/>
            </IconButton>
        </Tooltip>
    )
}

export default RefreshButton;