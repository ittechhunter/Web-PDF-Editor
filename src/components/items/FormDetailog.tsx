import React from 'react';


import {
    Button,
    Dialog,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Slide
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export function FormDialog({isOpen, handleClose, children}: {isOpen: boolean, handleClose: ()=>void, children: any}) {
    return (
        <div>
            <Dialog
                fullScreen
                open={isOpen}
                onClose={handleClose}
                TransitionComponent={Transition}>
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Sound
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
                {children}
                {/*<List>*/}
                {/*    <ListItem button>*/}
                {/*        <ListItemText primary="Phone ringtone" secondary="Titania" />*/}
                {/*    </ListItem>*/}
                {/*    <Divider />*/}
                {/*    <ListItem button>*/}
                {/*        <ListItemText*/}
                {/*            primary="Default notification ringtone"*/}
                {/*            secondary="Tethys"*/}
                {/*        />*/}
                {/*    </ListItem>*/}
                {/*</List>*/}
            </Dialog>
        </div>
    );
}
