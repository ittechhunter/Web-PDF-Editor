import React, {ReactNode} from "react";


import Typography from "@mui/material/Typography";
import {CardContent, Table as MuiTable, Card, CardHeader, Collapse} from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';

import TablePlaceholder from "./TablePlaceholder";


interface PropsState {
    message?: string | null
    title: string
    action?: ReactNode
    loading?: boolean
    isError?: boolean
    hasData: boolean
    children: ReactNode
    handleRefresh?: () => void
    expanded?: boolean
}

const DetailTable = (
    {
        title,
        action,
        loading,
        hasData,
        children,
        handleRefresh,
        expanded = true,
        message
    }: PropsState) => {

    return (
        <Card variant={'outlined'}>
            <CardHeader title={
                <Typography
                    sx={{flex: '1 1 100%'}}
                    variant="h6"
                    id="tableTitle"
                    component="div">
                    {title}
                </Typography>}
                        action={action}
            />
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent component={'div'}>
                    <TableContainer>
                        <MuiTable aria-label="simple table" sx={{minWidth: 650, width: '100%', mb: 2,}}>
                            <TableBody>
                                <TablePlaceholder handleRefresh={handleRefresh} loading={loading}
                                                  errorText={message ?? "Something went wrong"}
                                                  noDataText={"No more rows"} hasData={hasData}/>
                                {hasData && children}
                            </TableBody>
                        </MuiTable>
                    </TableContainer>
                </CardContent>
            </Collapse>
        </Card>
    )
}

export default DetailTable;
