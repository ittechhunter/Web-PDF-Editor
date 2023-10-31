import React, {ReactNode, useEffect, useState} from "react";
import {Paper} from "@mui/material";
import {styled} from "@mui/material/styles";

import {getResolution} from "@/lib/helpers";
import {Header} from "@/components/layouts/PrettyLayout/Header";

import {ErrorBoundary} from "@/components/ui/errorBoundary";


const StyledPaper = styled(Paper)`
  display: flex;
  flex-direction: row;
  max-width: 100vw;

  width: 100%;
  height: 100%;
  background-color: ${({theme}) => theme.palette.background.default};

  & > #styled-content {
    flex: 1;
  }
`


const StyledBox = styled("div")`
  height: 100%;
  min-height: 100vh;
  background-color: ${({theme}) => theme.palette.background.default};

  ${({theme}) => theme.breakpoints.up("xs")} {
    padding: 74px 8px 8px 8px;
  }

  ${({theme}) => theme.breakpoints.up("md")} {
    padding: 90px 20px 20px 20px;
  }
`


const PrettyLayout = ({children}: {children: ReactNode}) => {
    const isMobile = getResolution() === "MOBILE"
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setLoaded(true);
        }, 0);

        return () => {
            clearTimeout(timeoutId);
        };
    }, []);


    if (!loaded) {
        return null; // Render a loader or placeholder while the theme is loading
    }


    return (
        <>

            <StyledPaper>
                <Header/>
                <StyledBox id="styled-content">
                    <ErrorBoundary>{children}</ErrorBoundary>
                </StyledBox>
            </StyledPaper>
        </>
    );
}

export const getLayout = (page: React.ReactElement) => <PrettyLayout>{page}</PrettyLayout>;

export default PrettyLayout;
