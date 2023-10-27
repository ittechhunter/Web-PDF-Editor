import React, {ReactNode, useEffect} from 'react';

import {
    Card, CardContent, Box, Paper,
    Table, TableHead, TableBody, TableCell, TablePagination, TableRow,
    CardHeader, Typography, Stack
} from "@mui/material";
import {useRouter} from "next/router";

import {useAppDispatch} from "@/store/hooks";
import TablePlaceholder from "@/components/features/table/TablePlaceholder";
import RefreshButton from "@/components/features/buttons/RefreshButton";
import ReUsableButton from "@/components/features/buttons/ReUsableButton";
import ActionsMenu from "@/components/features/menu/ActionsMenu";
import Checkbox from "@/components/ui/mui/form/Checkbox";


export interface ColumnCell {
    headerName: string
    field: string
    renderCell?: (props: any) => string | JSX.Element
    sx?: object
}

interface EnhancedTableHeadProps {
    columns: ColumnCell[];
    withCheckbox?: boolean;
    onClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    numSelected: number
    rowCount: number
}


function EnhancedTableHead(
    {
        columns,
        withCheckbox = false,
        onClick,
        numSelected,
        rowCount
    }: EnhancedTableHeadProps
) {
    return (
        <TableHead>
            <TableRow>
                {withCheckbox && (
                    <TableCell padding="checkbox">
                        <Checkbox
                            color="primary"
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onClick}
                            inputProps={{
                                'aria-label': 'select all visible',
                            }}
                        />
                    </TableCell>
                )}
                {columns.map((column) => (
                    <TableCell
                        key={column.field}
                    >
                        {column.headerName}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}


interface EnhancedTableProps {
    rows: any[]
    columns: ColumnCell[]
    title: string
    currentPage: number
    rowsPerPage: number
    count: number
    action?: ReactNode;
    loading: boolean;
    actionType: string;
    extraActions?: ReactNode;

    withRefreshButton?: boolean,
    extraParams?: { [key: string | number]: string }
    withCheckbox?: boolean
    mainField?: string
    selectAction?: {
        icon?: ReactNode
        title: string
        onClick: (props: {
            values: number[];
            callback: (props: { isError: boolean, message?: string | null }) => Promise<void>
        }) => Promise<void>
        onCancel?: () => Promise<void>
        reFetchData?: boolean
    }[]
}


function EnhancedTable(
    {
        loading,
        rows,
        columns,
        title,
        currentPage,
        rowsPerPage,
        count,
        action,
        actionType,
        extraParams,
        selectAction,
        withRefreshButton = true,
        withCheckbox = false,
        mainField = "id"
    }: EnhancedTableProps) {
    const router = useRouter()
    const [selected, setSelected] = React.useState<number[]>([]);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        currentPage > 0 ? Math.max(0, (1 + currentPage) * rowsPerPage - count) : 0;
    const dispatch = useAppDispatch()

    const reFetch = (params?: { page?: number, pageSize?: number }) => {
        dispatch({type: actionType, payload: {...router.query, ...params, ...extraParams}})
        setSelected([])
    }

    useEffect(() => {
        const {page, limit} = router.query
        let params = {
            page: currentPage,
            pageSize: rowsPerPage,
            ...extraParams,
        }
        if (page && typeof page === 'string') {
            params.page = parseInt(page)
        }
        if (limit && typeof limit === 'string') {
            params.pageSize = parseInt(limit)
        }
        reFetch(params)
    }, [router.query])

    const getPerPageOptions = () => {
        const options = [5, 10, 25, 100];
        if (!options.includes(rowsPerPage)) options.push(rowsPerPage)
        return options;
    }

    const handleChangePage = async (event: unknown, newPage: number) => {
        await router.push({query: {...router.query, page: newPage + 1}}, undefined, {shallow: true})
    };

    const handleChangePageSize = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const pageSize = parseInt(event.target.value, 10)
        await router.push({query: {...router.query, page: 1, limit: pageSize}}, undefined, {shallow: true})
    };
    const getAction = () => {
        let extraActions: ReactNode = <div/>
        if (withCheckbox && selectAction && selectAction.length > 0) {
            if (selectAction.length == 1) {
                extraActions = <ReUsableButton
                    type="iconButton"
                    onCancel={selectAction[0].onCancel}
                    title={selectAction[0].title}
                    onClick={async (callback: (props: {
                        isError: boolean,
                        message?: string | null
                    }) => Promise<void>) => {
                        await selectAction[0].onClick({values: selected, callback})

                        if (selectAction[0].reFetchData) {
                            setTimeout(() => {
                                reFetch()
                            }, 1000)
                        }
                    }}
                    icon={selectAction[0].icon}
                />
            } else {
                extraActions = (
                    <ActionsMenu isMiniButton={false}>
                        {
                            selectAction.map((item, i) => {
                                return (
                                    <ReUsableButton
                                        key={i}
                                        type="menuItem"
                                        icon={item.icon}
                                        onClick={async (callback: (props: {
                                            isError: boolean,
                                            message?: string | null
                                        }) => Promise<void>) => {
                                            await item.onClick({values: selected, callback})
                                            if (item.reFetchData) {
                                                setTimeout(() => {
                                                    reFetch()
                                                }, 1000)
                                            }
                                        }}
                                        title={item.title}
                                        onCancel={item.onCancel}
                                    />
                                )
                            })
                        }
                    </ActionsMenu>
                )
            }
        }
        return (
            <Stack direction={"row"} spacing={0.1}>
                {selected.length > 0 && extraActions}
                {withRefreshButton && <RefreshButton onClick={() => reFetch()}/>}
                {action}
            </Stack>
        )
    }

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n[mainField]);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };
    const isSelected = (name: number) => selected.indexOf(name) !== -1;


    const handleClick = (event: React.MouseEvent<unknown>, value: number) => {
        const selectedIndex = selected.indexOf(value);
        let newSelected: number[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, value);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };
    return (
        <Box sx={{width: '100%'}}>
            <Paper component={'div'} sx={{width: '100%', mb: 2}}>
                <Card sx={{width: '100%'}} variant={'outlined'}>
                    <CardHeader
                        title={selected.length > 0 ? (
                            <Typography
                                sx={{flex: '1 1 100%'}}
                                color="inherit"
                                variant="subtitle1"
                                component="div"
                            >
                                {selected.length} selected
                            </Typography>
                        ) : (
                            <Typography
                                sx={{flex: '1 1 100%'}}
                                variant="h6"
                                id="tableTitle"
                                component="div"
                            >
                                {title}
                            </Typography>
                        )} action={getAction()}
                    />
                    <CardContent component={'div'} sx={{overflow: 'scroll'}}>
                        <Table
                            stickyHeader
                            sx={{minWidth: 750}}
                            aria-labelledby="tableTitle"
                            size={'medium'}
                        >
                            <EnhancedTableHead
                                columns={columns}
                                withCheckbox={withCheckbox}
                                numSelected={selected.length}
                                rowCount={rows.length}
                                onClick={handleSelectAllClick}
                            />
                            <TableBody>
                                <TablePlaceholder
                                    handleRefresh={() => reFetch()}
                                    loading={loading} noDataText="No more rows"
                                    hasData={rows.length > 0}
                                />

                                {rows?.map((row, i) => {
                                    const isItemSelected = isSelected(row[mainField]);
                                    const labelId = `enhanced-table-checkbox-${i}`;

                                    return (
                                        <TableRow
                                            key={i}
                                            onClick={(event) => {
                                                if (withCheckbox) handleClick(event, row[mainField])
                                            }}
                                            role={withCheckbox ? "checkbox" : "default"}
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            selected={isItemSelected}
                                            sx={
                                                {
                                                    '&:last-child td, &:last-child th': {border: 0},
                                                    "cursor": withCheckbox ? "pointer" : "default"
                                                }
                                            }

                                        >

                                            {withCheckbox &&
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        color="primary"
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            'aria-labelledby': labelId,
                                                        }}
                                                    />
                                                </TableCell>
                                            }
                                            {columns.map((column: ColumnCell) => {
                                                if (column.renderCell) return (<TableCell key={column.field}
                                                                                          sx={{...column.sx}}>{column.renderCell(row)}</TableCell>)
                                                return (<TableCell key={column.field}
                                                                   sx={{...column.sx,}}>{row[column.field]}</TableCell>)
                                            })}
                                        </TableRow>
                                    )
                                })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            minHeight: 250,
                                        }}
                                    >
                                        <TableCell colSpan={6}/>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>

                        <TablePagination
                            rowsPerPageOptions={getPerPageOptions()}
                            component="div"
                            count={count}
                            rowsPerPage={rowsPerPage}
                            page={currentPage}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangePageSize}
                        />
                    </CardContent>
                </Card>
            </Paper>
        </Box>
    );
}

export default EnhancedTable;
