import React, {useEffect, useState} from "react";
import {Autocomplete} from "@mui/material";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import {useAppDispatch, useAppSelector} from "@/store/hooks";

interface Props {
    onChange: (value: any) => void
    inputChange: (value: string) => void
    actionState: string
    actionType: string
    // value: any
    id: string
    renderLabel: (value: any) => string
    name: string
    label: string
    isOptionEqualToValue: (option: any, value: any) => boolean
    queryProps: Record<string, string | number>
    value: any
}

const AutocompleteFilterFetched = (
    {
        id,
        onChange,
        inputChange,
        actionState,
        actionType,
        renderLabel,
        name,
        label,
        isOptionEqualToValue,
        queryProps,
        value,
    }: Props) => {
    const [open, setOpen] = useState<boolean>(false)
    const {
        data,
        loading,
        // isError,
        // statusCode,
        // message,
    } = useAppSelector((state) => {
            return actionState.split('/')
                .reduce((p, c) => p && p[c] || undefined, state)
        }
    )
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch({type: actionType, payload: queryProps})
    }, [queryProps])

    return (
        <div>
            <Autocomplete
                id={id}
                open={open}
                onOpen={() => {
                    setOpen(true);
                    dispatch({type: actionType, payload: queryProps})

                }}
                onClose={() => {
                    setOpen(false);
                }}
                isOptionEqualToValue={(option, value) => isOptionEqualToValue(option, value)}
                getOptionLabel={(option) => renderLabel(option)}
                options={data}
                loading={loading}
                onInputChange={(event, newInputValue) => {
                    inputChange(newInputValue);
                }}
                value={value ?? null}
                onChange={(event, value) => onChange(value)}
                noOptionsText="No options"
                loadingText="Loading..."
                clearText="Clear"
                closeText="Close"
                renderInput={(params) => (
                    <TextField
                        {...params}
                        fullWidth={true}
                        name={name}
                        label={label}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {loading ?
                                        <CircularProgress color="inherit" size={20}/> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                        }}
                    />
                )}
            />
        </div>
    )
}

export default AutocompleteFilterFetched;