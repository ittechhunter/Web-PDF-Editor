import React from "react";
import {Backdrop, CardContent} from '@mui/material';
import CircularProgress from "@mui/material/CircularProgress";

import StyledCard from "@/components/ui/StyledCard";
import StyledWrapper from "@/components/ui/StyledWrapper";
import {StyledSubtitle, StyledTitle} from "@/components/ui/Typography";
import SimpleLayout from "@/components/layouts/SimpleLayout";


interface Props {
    title: string;
    description: string;
    footerText?: React.ReactNode | string;
    heading?: string;
    loading?: boolean;
}

export default function SimpleContainer(props: React.PropsWithChildren<Props>) {
    return (
        <SimpleLayout>
            <StyledWrapper>
                <Backdrop
                    sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                    open={!!props.loading}>
                    <CircularProgress color="inherit"/>
                </Backdrop>
                <StyledCard variant="outlined">
                    <CardContent>
                        <StyledTitle>
                            {props.title}
                        </StyledTitle>
                        <StyledSubtitle>
                            {props.description}
                        </StyledSubtitle>
                        {props.children}
                    </CardContent>
                </StyledCard>
            </StyledWrapper>
        </SimpleLayout>
    );
}
