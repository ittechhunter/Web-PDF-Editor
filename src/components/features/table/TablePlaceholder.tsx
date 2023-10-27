import React from 'react'
import {styled} from '@mui/material/styles'

import {
    LinearProgress, TableCell, TableRow
} from '@mui/material'

import ErrorPlaceholder from "@/components/ui/ErrorPlaceholder";

const StyledTableCell = styled(TableCell)`
  position: absolute;
  width: 100%;
  border-bottom: none;
`

const StyledLinearProgress = styled(LinearProgress)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`



interface Props {
    noDataText?: string
    errorText?: string
    loading?: boolean
    hasData?: boolean
    handleRefresh?: ()=>void
    isError?: boolean
}

const TablePlaceholder = ({loading, errorText, noDataText, hasData, handleRefresh, isError}: Props) => {
    const loadingState = (loading) && (
        <TableRow sx={{position: 'relative', height: 'auto'}}>
            <StyledTableCell colSpan={2}>
                <StyledLinearProgress/>
            </StyledTableCell>
        </TableRow>
    )

    const errorState =  isError && !loading && (
      <TableRow sx={{ position: 'relative', height: 60 }}>
        <StyledTableCell>
            <ErrorPlaceholder handleRefresh={handleRefresh} message={errorText}/>
        </StyledTableCell>
      </TableRow>
    )

    const emptyState = !loading && !hasData && (
        <TableRow sx={{position: 'relative', height: 100,}}>
            <StyledTableCell>
                <ErrorPlaceholder handleRefresh={handleRefresh} message={noDataText??'No more rows'}/>

            </StyledTableCell>
        </TableRow>
    )

    return (
        <>
            {loadingState}
            {errorState}
            {emptyState}
        </>
    )
}

export default TablePlaceholder;