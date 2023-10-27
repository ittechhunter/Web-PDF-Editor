import type {ToastOptions} from "react-toastify";
import {toast as baseToast} from "react-toastify";
import {format, parseISO} from "date-fns";

import type {FormikProps} from "formik";

import type {ValidationError} from "@/openapi/client-node";

const toastOptions: ToastOptions = {
    // autoClose: 5000,
    position: "top-center",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    closeButton: true,
    pauseOnFocusLoss: false,
};
export const toastLoading = (message: string) => {
    return baseToast.loading(message, toastOptions);
};

export const toastUpdate = (
    toastId: any,
    message: string,
    toastType: any = "success"
) => {
    baseToast.update(toastId, {
        render: message,
        type: toastType,
        isLoading: false,
        autoClose: 5000,
    });
};

export const toast = (
    message: string,
    toastType: any = "success",
    options?: ToastOptions
) =>
    baseToast(message, {
        type: toastType,
        autoClose: 5000,

        ...toastOptions,
        ...options,
    });

export function filterOutFalsyItems(obj: any): any {
    const resObj: any = {};
    for (const i in obj) {
        if (obj[i]) {
            resObj[i] = obj[i];
        }
    }
    return resObj;
}

export const isObjectEmpty = (obj: any) => {
    try {
        if (!obj) throw new Error(`argument type is not object or in null value`);
        return Object.keys(obj).length === 0 && obj.constructor === Object;
    } catch (error) {
        console.log(error);
    }
};

export const formatDate = ({
                               date,
                               formatStr = "PP",
                           }: {
    date?: string;
    formatStr?: string;
}) => {
    if (!date) return "";
    return format(parseISO(date), formatStr);
};

export const formatDatetime = ({
                                   date,
                                   formatStr = "dd.MM.yyyy HH:mm",
                               }: {
    date: string;
    formatStr?: string;
}) => {
    if (!date) return "";
    return format(parseISO(date), formatStr);
};

export function getItem(object: any, key: string, default_value = "") {
    const result = object[key];
    return typeof result !== "undefined" ? result : default_value;
}

type ResolutionType = "DESKTOP" | "MOBILE";

export function getResolution(): ResolutionType {
    if (process.browser) {
        return window.innerWidth <= 768 ? "MOBILE" : "DESKTOP";
    } else return "DESKTOP";
}

export function displayCurrency(
    props?: { amount: number; currency?: string } | null
): string {
    if (!props) return "";
    try {
        return new Intl.NumberFormat("ru-RU", {
            style: "currency",
            currency: props.currency,
        }).format(props.amount);
    } catch (e) {
        return `${props?.amount} ${props?.currency ?? ""}`;
    }
}

export function getValueFromEnum<T extends string>(
    enumObj: Record<string, T>,
    value: string | number | undefined
): T | undefined {
    if (value === undefined) {
        return undefined;
    }
    const keys = Object.keys(enumObj) as Array<keyof typeof enumObj>;
    const key = keys.find((k) => enumObj[k] === value);
    return key ? enumObj[key] : undefined;
}

export const checkError = (
    formik: FormikProps<any>,
    errors: ValidationError[] | Record<string, string> | null,
    field: any
) => {
    if (formik.touched[field]) return true;
    else if (errors && Array.isArray(errors)) {
        return !!errors?.find(e => e.loc[0] === field);
    } else if (errors && errors[field]) return true;
    return false;
};

export const getError = (
    formik: FormikProps<any>,
    errors: ValidationError[] | Record<string, string> | null,
    field: any
): string | undefined => {
    if (formik.errors[field]) {
        return formik.errors[field]?.toString();
    } else if (errors && Array.isArray(errors)) {
        if (errors?.find(e => e.loc[0] === field)) {
            return errors?.find(e => e.loc[0] === field)?.msg || ''
        }
    } else if (errors && errors[field]) {
        return errors[field];
    }
    return undefined;
};

export const canSubmit = (formik: FormikProps<any>) => {
    if (!(formik.isValid && formik.dirty)) return true;
    return formik.isSubmitting;
};

export const convertValidationErrorToDict = (
    errors: ValidationError[]
): Record<string, string> => {
    if (!errors || errors.length === 0) return {};
    return errors.reduce((acc, e) => {
        acc[e.loc[1]] = e.msg;
        return acc;
    }, {} as Record<string, string>);
};
