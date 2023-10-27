import React, {ReactNode, useEffect} from "react";
import CircularProgress from '@mui/material/CircularProgress';
import {
    Backdrop, TextField, FormGroup,
    Card, CardContent, CardHeader, FormHelperText,
} from "@mui/material";
import {FormikProps, useFormik} from "formik";
import {ZodType} from "zod";
import {toFormikValidationSchema} from "zod-formik-adapter";
import {useConfirm} from "material-ui-confirm";

import {TextFieldProps} from "@mui/material/TextField/TextField";
import MuiPhoneNumber, {MuiPhoneNumberProps} from 'material-ui-phone-number-2';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';

import {FormActions} from "@/components/ui/forms/FormActions";
import {canSubmit, checkError, getError, toastLoading, toastUpdate} from "@/lib/helper";
import {type ValidationError as ValidationErrorType} from "@/openapi/client-node";
import Link from "@/components/features/Link";
import LabelCheckbox, {CheckboxProps} from "@/components/ui/forms/fields/LabelCheckbox";
import Select, {SelectProps as BaseSelectProps} from "@/components/ui/mui/form/Select";
import DatePicker, {DatePickerProps} from "@/components/ui/forms/fields/DatePicker";
import DateTimePicker, {DateTimePickerProps} from "@/components/ui/forms/fields/DateTimePicker";

interface LocalSelectProps extends BaseSelectProps {
    items: { value: string | number, label: ReactNode }[];
}

type InputType =
    "textField"
    | "datePicker"
    | "dateTimePicker"
    | "phoneField"
    | "selectField"
    | "checkboxField"
    | "componentField"

export interface BaseFormInputProps {
    id: string
    name: string
    inputType: InputType
    textFieldProps?: TextFieldProps
    phoneFieldProps?: MuiPhoneNumberProps
    selectFieldProps?: LocalSelectProps
    checkboxFieldProps?: CheckboxProps;
    datePickerProps?: DatePickerProps;
    dateTimePickerProps?: DateTimePickerProps;
    label: string;
    render?: (props: {
        formik: FormikProps<any>;
        error: boolean;
        helperText?: string | null;
        input: {
            id: string
            name: string
            label: string
        }
    }) => ReactNode

}

interface Props {
    children?: ReactNode
    onSubmit: (values: any, callback: (props: {
        isError: boolean,
        message?: string | null
    }) => Promise<void>) => Promise<void>
    title?: string
    cancelUrl?: string
    initialValues: { [key: string]: any };
    schema: ZodType;
    errors: ValidationErrorType[] | null;
    inputs: BaseFormInputProps[]
    action?: ReactNode
    redirect?: string
    isError: boolean
    statusCode: number | null
    message?: string | null
    extraValues?: Record<string, string | number | null> | null
    onReset?: () => void;
    withConfirm?: boolean;

}

const BaseForm = (
    {
        children,
        onSubmit,
        title,
        cancelUrl,
        initialValues,
        schema,
        errors,
        inputs,
        action,
        redirect = '#',
        isError,
        statusCode,
        message,
        extraValues,
        onReset,
    }: Props) => {
    const confirm = useConfirm();

    useEffect(() => {
        const prev = formik.values
        if (!extraValues) formik.setValues({...prev})
        formik.setValues({...prev, ...extraValues,})
    }, [extraValues])


    const handleSubmit = async (values: typeof initialValues) => {
        confirm().then(async () => {
            const toastId = toastLoading("Please wait!")

            const callback = async (props: { isError: boolean, message?: string | null }) => {
                if (props.isError) {
                    toastUpdate(toastId, props.message ?? "Fail", 'warning');
                } else {
                    toastUpdate(toastId, props.message ?? "Success", 'success');
                }
            }
            await onSubmit(values, callback)
        })
    }
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: toFormikValidationSchema(schema),
        onSubmit: handleSubmit
    })
    const renderInputs = () => {
        return (
            inputs.map((input, i) => {
                    if (input.inputType === 'textField') {
                        return (
                            <TextField key={i}
                                       margin="normal"
                                       fullWidth
                                       {...input.textFieldProps}
                                       label={input.label}
                                       id={input.id}
                                       name={input.name}
                                       value={formik.values[input.name]}
                                       onChange={formik.handleChange}
                                       error={checkError(formik, errors, input.name)}
                                       helperText={getError(formik, errors, input.name)}
                            />
                        );
                    } else if (input.inputType === 'phoneField') {
                        return (
                            <MuiPhoneNumber key={i}
                                            margin={'normal'}
                                            fullWidth
                                            defaultCountry={'tr'}
                                            enableLongNumbers
                                            variant={'outlined'}
                                            disableAreaCodes={true}
                                            autoFormat={false}
                                            countryCodeEditable={false}
                                            {...input.phoneFieldProps}
                                            id={input.id}
                                            name={input.name}
                                            label={input.label}
                                            value={formik.values[input.name]}
                                            onChange={value => formik.setFieldValue(input.name, value)}
                                            error={checkError(formik, errors, input.name)}
                                            helperText={getError(formik, errors, input.name)}
                            />
                        )
                    } else if (input.inputType === 'selectField') {
                        if (!input.selectFieldProps?.items) return <div/>
                        const {items, ...props} = input.selectFieldProps
                        return (
                            <FormControl fullWidth key={i} margin={'normal'}
                                         error={checkError(formik, errors, input.name)}>
                                <InputLabel id={input.id} required={props?.required ?? false}>{input.label}</InputLabel>
                                <Select
                                    {...props}

                                    labelId={input.id}
                                    id={input.id}
                                    name={input.name}
                                    label={input.label}
                                    value={formik.values[input.name]}

                                    onChange={(e) => formik.setFieldValue(input.name, e.target.value)}
                                >
                                    <MenuItem>
                                        --- Select one of the below ---
                                    </MenuItem>
                                    {items.map((item, i) => {
                                        return (
                                            <MenuItem key={i} value={item.value}>
                                                {item.label}
                                            </MenuItem>
                                        )
                                    })}

                                </Select>
                                {checkError(formik, errors, input.name) && (
                                    <FormHelperText>{getError(formik, errors, input.name)}</FormHelperText>
                                )}
                            </FormControl>

                        )
                    } else if (input.inputType === 'checkboxField') {
                        return (
                            <FormGroup key={i}>
                                <LabelCheckbox
                                    fullWidth={true} {...input.checkboxFieldProps}
                                    onChange={formik.handleChange}
                                    id={input.id}
                                    label={input.label}
                                    name={input.name}
                                    checked={formik.values[input.name]}
                                />
                                {checkError(formik, errors, input.name) && (
                                    <FormHelperText>{getError(formik, errors, input.name)}</FormHelperText>
                                )}

                            </FormGroup>
                        )
                    } else if (input.inputType === 'datePicker') {
                        return (
                            <FormGroup key={i}>
                                <DatePicker
                                    {...input.datePickerProps}
                                    onChange={(value: any) => formik.setFieldValue(input.name, value, true)}
                                    id={input.id}
                                    label={input.label}
                                    name={input.name}
                                    value={formik.values[input.name]}
                                    error={checkError(formik, errors, input.name)}
                                    helperText={getError(formik, errors, input.name)}
                                />
                                {checkError(formik, errors, input.name) && (
                                    <FormHelperText>{getError(formik, errors, input.name)}</FormHelperText>
                                )}

                            </FormGroup>
                        )
                    } else if (input.inputType === 'dateTimePicker') {
                        return (
                            <FormGroup key={i}>
                                <DateTimePicker
                                    {...input.datePickerProps}
                                    onChange={(value: any) => formik.setFieldValue(input.name, value, true)}
                                    id={input.id}
                                    label={input.label}
                                    name={input.name}
                                    value={formik.values[input.name]}
                                    error={checkError(formik, errors, input.name)}
                                    helperText={getError(formik, errors, input.name)}
                                />
                                {checkError(formik, errors, input.name) && (
                                    <FormHelperText>{getError(formik, errors, input.name)}</FormHelperText>
                                )}

                            </FormGroup>
                        )
                    } else if (input.inputType === "componentField") {
                        return (
                            <div key={i}>
                                {input.render !== undefined && input.render({
                                        formik,
                                        error: checkError(formik, errors, input.name),
                                        helperText: getError(formik, errors, input.name),
                                        input: {
                                            id: input.id,
                                            name: input.name,
                                            label: input.label
                                        }
                                    }
                                )}
                            </div>
                        )
                    }
                    return <div key={i}/>;
                }
            )
        )
    }


    // if (isError && statusCode != 422) {
    //     let errorComponent = <HTTP500 message={message}/>
    //     if (statusCode === 404) errorComponent = <HTTP404 message={message}/>
    //     else if (statusCode === 403) {
    //         errorComponent = <HTTP403 message={message}/>
    //     }
    //     return errorComponent
    // }
    const handleReset = () => {
        formik.resetForm()
        if (onReset) onReset()
    }

    return (
        <div>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={formik.isSubmitting}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            <form onSubmit={formik.handleSubmit} noValidate>
                <Card sx={{minWidth: 275}}>
                    {title && <CardHeader title={<Link href={redirect}>{title}</Link>} action={action}/>}
                    <CardContent sx={{overflow: 'visible'}} component={'div'} style={{width: '100%'}}>
                        {renderInputs()}
                        {children}
                    </CardContent>
                    <FormActions cancelUrl={cancelUrl} disabled={canSubmit(formik)} onReset={handleReset}/>
                </Card>
            </form>
            <pre><code>{JSON.stringify(formik.values, null, 2)}</code></pre>
            <pre><code>{JSON.stringify(formik.errors, null, 2)}</code></pre>
            {/*<pre><code>{JSON.stringify(extraValues, null, 2)}</code></pre>*/}
        </div>
    )
}

export default BaseForm;