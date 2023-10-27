import React from "react";
import Box from "@mui/material/Box";
import {styled} from "@mui/material/styles";
import RefreshIcon from '@mui/icons-material/Refresh';
import Button from '@mui/material/Button';



const StyledGridOverlay = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    '& .ant-empty-img-1': {
        fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626',
    },
    '& .ant-empty-img-2': {
        fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959',
    },
    '& .ant-empty-img-3': {
        fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343',
    },
    '& .ant-empty-img-4': {
        fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c',
    },
    '& .ant-empty-img-5': {
        fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
        fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff',
    },
}));

const ErrorPlaceholder = ({handleRefresh, message}: {handleRefresh?: ()=>void, message?: string|null})=> {

    return (
        <StyledGridOverlay>
            <Button variant="text" sx={{zIndex: 999}} onClick={handleRefresh}>
                <RefreshIcon sx={{fontSize: 64}}/>
            </Button>
            <Box component={'div'} sx={{ mt: 1 }}>{message??'Something went wrong'}</Box>
        </StyledGridOverlay>
    );
}

export default ErrorPlaceholder