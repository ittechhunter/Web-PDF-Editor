import React from 'react'

import {styled} from '@mui/material/styles'
import {
    Box,
    Drawer,
    FormControl,
    FormControlLabel,
    FormGroup,
    IconButton,
    Switch,
    Typography,
    Divider,
} from '@mui/material'
import {FaCog} from 'react-icons/fa'

import {useThemeContext} from '@/providers/theme/provider'


function AppSettings() {
    const [open, setOpen] = React.useState(false)
    const {mode, toggleTheme} = useThemeContext()
    return (
        <>
            <IconButton size="small" color="inherit" onClick={() => setOpen(prev => !prev)}>
                <FaCog size={20}/>
            </IconButton>
            <Drawer
                open={open}
                onClose={() => setOpen(false)}
                anchor="right"
                elevation={1}
                sx={{zIndex: theme => theme.zIndex.drawer + 2}}>
                <StyledDrawerBox>
                    <Divider sx={{margin: '20px 0 24px 0'}}/>
                    <Typography
                        variant="overline"
                        sx={{paddingBottom: '6px', display: 'block', opacity: 0.7}}>
                        Settings
                    </Typography>
                    <FormControl style={{width: '100%'}}>
                        <FormGroup >
                            <FormControlLabel
                                control={<Switch checked={mode === 'dark'} onChange={toggleTheme} name="theme"/>}
                                label={
                                    <Typography variant="body2">
                                        {mode === 'dark' ? 'Dark mode' : 'Light mode'}
                                    </Typography>
                                }
                            />
                        </FormGroup>
                    </FormControl>
                    <Divider sx={{margin: '20px 0 24px 0'}}/>

                </StyledDrawerBox>
            </Drawer>
        </>
    )
}

export default AppSettings

const StyledDrawerBox = styled(Box)`
  width: 240px;
  padding: 20px;
  min-height: 100vh;
  height: 100%;
  background: ${({theme}) =>
          theme.palette.mode === 'dark'
                  ? theme.palette.background.paper
                  : theme.palette.background.default};
`
