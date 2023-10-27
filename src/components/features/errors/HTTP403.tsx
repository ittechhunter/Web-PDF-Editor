import React from "react";

import {CardContent} from "@mui/material";

import {StyledSubtitle, StyledTitle} from "@/components/ui/Typography";
import StyledWrapper from "@/components/ui/StyledWrapper";
import StyledCard from "@/components/ui/StyledCard";

const HTTP403 = ({message}: {message?: string|null}) => {

    return (
        <StyledWrapper>
            <StyledCard variant="outlined">
                <CardContent>
                    <StyledTitle>
                        403 - Sorry, you do not have access to resource
                    </StyledTitle>
                    {message && <StyledSubtitle>{message}</StyledSubtitle>}

                </CardContent>
            </StyledCard>
        </StyledWrapper>
    )
}

export default HTTP403;