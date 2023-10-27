import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";

const Container = (
    {
        loading,
        children
    }:
    { loading: boolean, message?: string | null, isError?: boolean, children: any }
) => {
    return (
        <div>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={loading}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            {children}
        </div>
    )
}

export default Container;