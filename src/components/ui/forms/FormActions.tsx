import React from "react";
import {Stack, Button, Box, CardActions} from "@mui/material";
import {NextLinkComposed} from "@/components/features/Link";

interface Props {
    cancelUrl?: string
    disabled: boolean
    onReset: () => void
}

export const FormActions = (props: Props) => {
    return (
        <CardActions>
            {props.cancelUrl && <Stack spacing={2} direction="row">
                <Button component={NextLinkComposed} to={{pathname: props.cancelUrl}}
                        variant="outlined">Cancel</Button>

            </Stack>}
            <Box component="div" sx={{flexGrow: 1}}/>
            <Stack direction={'row'} spacing={2}>
                <Button
                    type="button"
                    variant="outlined"
                    color={'secondary'}
                    onClick={props.onReset}>
                    Reset
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    disabled={props.disabled}>
                    Submit
                </Button>
            </Stack>
        </CardActions>
    )
}