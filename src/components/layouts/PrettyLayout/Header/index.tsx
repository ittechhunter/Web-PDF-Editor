import React from 'react'

import {Stack, Toolbar, Box} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';


import {useThemeContext} from "@/providers/theme/provider";
import Link from "@/components/features/Link"

import {StyledAppBar, StyledPaper, StyledTitle} from './styles'


export const Header = () => {
    const {mode, toggleTheme} = useThemeContext()
    return (
        <>
            <StyledAppBar position="fixed" elevation={0}>
                <StyledPaper>
                    <Toolbar>
                        <Link href="/" passHref>
                            <StyledTitle variant="h6">
                                Online PDF editor
                            </StyledTitle>
                        </Link>

                        <Box component="div" sx={{flexGrow: 1}}/>

                        <IconButton sx={{ml: 1}} onClick={toggleTheme} color="inherit">
                            {mode === 'dark' ? <Brightness7Icon/> : <Brightness4Icon/>}
                        </IconButton>
                    </Toolbar>
                </StyledPaper>
            </StyledAppBar>
        </>
    )
}
