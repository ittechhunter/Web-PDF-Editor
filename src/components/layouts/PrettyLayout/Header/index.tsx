import React from 'react'

import {Stack, Toolbar, Box} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';


import AppSettings from '@/components/layouts/PrettyLayout/AppSettings'
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
                                Admin panel
                            </StyledTitle>
                        </Link>

                        <Box component="div" sx={{flexGrow: 1}}/>

                        <Stack>
                            <IconButton sx={{ml: 1}} onClick={toggleTheme} color="inherit">
                                {mode === 'dark' ? <Brightness7Icon/> : <Brightness4Icon/>}
                            </IconButton>
                        </Stack>
                        <Stack direction="row" alignItems="center" style={{marginLeft: 10}}>
                            <AppSettings/>
                        </Stack>
                    </Toolbar>
                </StyledPaper>
            </StyledAppBar>
        </>
    )
}
