import {Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import React from "react";

import Link from '@/components/features/Link'

const ViewButton = ({href}: { href: string | { pathname: string, query?: { [key: string]: string | number } } }) => {
    return (
        <Tooltip title='View' placement="top">
            <Link href={href}>
                <IconButton aria-label="view">
                    <VisibilityIcon/>
                </IconButton>
            </Link>
        </Tooltip>
    )
}

export default ViewButton;