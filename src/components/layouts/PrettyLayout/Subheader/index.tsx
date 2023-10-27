import Breadcrumbs from "@mui/material/Breadcrumbs";
import React from "react";
import {Divider, Typography} from '@mui/material'

import {getResolution} from "@/lib/helper";
import Link from "@/components/features/Link";

import {StyledContainer, StyledDate} from './styles'

interface TreeType {
    url: string,
    title: string
}

export const Subheader = ({title, subtitle, tree}: { title: string, subtitle?: string, tree?: TreeType[] }) => {
    const isMobile = getResolution() === 'MOBILE'
    return (
        <>
            <StyledContainer>
                <Typography sx={{fontWeight: 'bold'}} variant={isMobile ? 'h6' : 'h5'} color="primary">
                    {title}
                </Typography>
                <Breadcrumbs maxItems={2} aria-label="breadcrumb" color='default'>
                    <Link underline="none" color="inherit" href={'/dashboard'}>Home</Link>
                    {tree && tree.map((item, i) =>
                        <Link key={i} href={item.url} underline={'none'} color={'inherit'}>
                            {item.title}
                        </Link>)}
                    {/*<Link underline="hover" color="inherit" href="#">*/}
                    {/*    Accessories*/}
                    {/*</Link>*/}
                    {/*<Link underline="hover" color="inherit" href="#">*/}
                    {/*    New Collection*/}
                    {/*</Link>*/}
                    {subtitle && <Typography color="default">{subtitle}</Typography>}
                </Breadcrumbs>

            </StyledContainer>
            <Divider sx={{mb: '14px !important'}}/>
        </>

    )
}