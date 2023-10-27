import React, {ReactNode} from "react";
import {Box, Paper, Card, CardContent, CardHeader, Stack, Button, CardActions} from "@mui/material";



const FilterToolbar = (
    {
        children,
        handleClick,
        handleClear
    }: { children: ReactNode, handleClick: () => void, handleClear: () => void }) => {

    return (
        <Box sx={{width: '100%'}}>
            <Paper component={'div'} sx={{width: '100%', mb: 2}}>
                <Card sx={{minWidth: 275}}>
                    <CardHeader title="Filter"/>
                    <CardContent>
                        {children}
                    </CardContent>
                    <CardActions>

                        <Box sx={{width: '100%'}}>
                            <Stack spacing={2} direction="row"
                                   justifyContent="flex-end"
                                   alignItems="center">
                                <Button onClick={handleClear} variant="outlined">Clear</Button>

                                <Button
                                    onClick={handleClick}
                                    type="submit"
                                    variant="contained">
                                    Filter
                                </Button>
                            </Stack>
                        </Box>
                    </CardActions>
                </Card>
            </Paper>
        </Box>
    )
}

export default FilterToolbar;
