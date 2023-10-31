import type {ToastOptions} from "react-toastify";
import {toast as baseToast} from "react-toastify";

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


type ResolutionType = "DESKTOP" | "MOBILE";

export function getResolution(): ResolutionType {
    if (process.browser) {
        return window.innerWidth <= 768 ? "MOBILE" : "DESKTOP";
    } else return "DESKTOP";
}

export function isImage(file: File) {
    if (file.type.split('/')[0] === 'image') {
        return true;
    }
}

export function convertBytesToMbsOrKbs(filesize: number) {
    let size = '';
    if (filesize >= 1048576) {
        size = (filesize / 1048576) + ' megabytes';
    } else if (filesize >= 1024) {
        size = (filesize / 1024) + ' kilobytes';
    } else {
        size = filesize + ' bytes';
    }
    return size;
}

export async function createFileFromUrl(url: string) {
    const response = await fetch(url);
    const data = await response.blob();
    const metadata = {type: data.type};
    const filename: string = (url.replace(/\?.+/, '') || '').split('/').pop() || '';
    return new File([data], filename, metadata);
}

export function readFile(file: File) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            resolve(event?.target?.result);
        };
        reader.onerror = (event) => {
            reader.abort();
            reject(event);
        };
        reader.readAsDataURL(file);
    });
}
