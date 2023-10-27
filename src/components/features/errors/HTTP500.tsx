import React from "react";

import {CardContent} from "@mui/material";


import {StyledSubtitle, StyledTitle} from "@/components/ui/Typography";
import StyledWrapper from "@/components/ui/StyledWrapper";
import StyledCard from "@/components/ui/StyledCard";

const HTTP500 = ({message}: { message?: string | null }) => {
    return (
        <StyledWrapper>
            <StyledCard variant="outlined">
                <CardContent>
                    <StyledTitle>
                        500 - Something went wrong!
                    </StyledTitle>
                    {message && <StyledSubtitle>{message}</StyledSubtitle>}
                    <StyledSubtitle>Try to refresh your page!</StyledSubtitle>
                </CardContent>
            </StyledCard>
        </StyledWrapper>
    )
}

export default HTTP500;