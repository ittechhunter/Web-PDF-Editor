import React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import StyledMenu from "@/components/ui/StyledMenu";

const ActionsMenu = ({children, isMiniButton=false, buttonText}: { children: any, isMiniButton?:boolean, buttonText?: string }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const renderButton = () => {
        if (isMiniButton){
            return (
                <IconButton
                    onClick={handleClick} aria-label="settings">
                    <MoreVertIcon/>
                </IconButton>
            )
        }
        return (<Button
            size={'small'}
            id="demo-customized-button"
            aria-controls={open ? 'demo-customized-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            variant="contained"
            disableElevation
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon/>}
        >
            {buttonText?buttonText:"Options"}
        </Button>)
    }

    return (
            <div style={{zIndex: 999}}>
                {renderButton()}
                <StyledMenu
                    id="demo-customized-menu"
                    MenuListProps={{
                        'aria-labelledby': 'demo-customized-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    {children}
                </StyledMenu>
            </div>
    )
}

export default ActionsMenu;