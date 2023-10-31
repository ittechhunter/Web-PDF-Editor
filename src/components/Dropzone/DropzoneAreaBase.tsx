import React, {Fragment} from 'react';

import clsx from 'clsx';
import Dropzone, {Accept, DropEvent, FileRejection} from 'react-dropzone';

import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {styled} from '@mui/system';


import {convertBytesToMbsOrKbs, isImage, readFile} from '@/lib/helpers';
import PreviewList, {PreviewGridClasses, PreviewGridProps} from './PreviewList';
import SnackbarContentWrapper from './SnackbarContentWrapper';
import {SnackbarOrigin} from "@mui/material/Snackbar/Snackbar";


export interface FileObject {
    file: File
    data: any
}

export interface DropzoneAreaBaseProps {
    acceptedFiles?: Accept;
    filesLimit?: number;
    Icon?: React.ElementType;
    fileObjects: FileObject[];
    maxFileSize?: number;
    dropzoneText?: string;
    dropzoneClass?: string;
    dropzoneParagraphClass?: string;
    disableRejectionFeedback?: boolean;
    showPreviews?: boolean;
    showPreviewsInDropzone?: boolean;
    showFileNames?: boolean;
    showFileNamesInPreview?: boolean;
    useChipsForPreview?: boolean;
    previewChipProps?: PreviewGridProps;
    previewGridClasses?: PreviewGridClasses;
    previewGridProps?: {
        container: Record<string, any>;
        item: Record<string, any>;
    };
    previewText?: string;
    reset?: { text: string; onClick: () => void };
    showAlerts?: boolean | ('error' | 'info' | 'success')[];
    alertSnackbarProps?: Record<string, any>;
    dropzoneProps?: Record<string, any>;
    inputProps?: Record<string, any>;
    getFileLimitExceedMessage?: (filesLimit: number) => string;
    getFileAddedMessage?: (fileName: string) => string;
    getFileRemovedMessage?: (fileName: string) => string;
    getDropRejectMessage?: (rejectedFile: FileRejection, acceptedFiles: Accept | undefined, maxFileSize: number | undefined) => string;
    getPreviewIcon?: (objectFile: FileObject) => React.ReactNode;
    onAdd?: (newFiles: FileObject[]) => void;
    onDelete?: (deletedFileObject: FileObject, index: number) => void;
    onDrop?: (droppedFiles: File[], event: DropEvent) => void;
    onDropRejected?: (rejectedFiles: FileRejection[], event: DropEvent) => void;
    onAlert?: (message: string, variant: 'error' | 'info' | 'success') => void;
}


const defaultSnackbarAnchorOrigin = {
    horizontal: 'left',
    vertical: 'bottom',
};


const defaultGetPreviewIcon = (fileObject: FileObject) => {
    if (isImage(fileObject.file)) {
        return (<img
            alt=""
            className={"image"}
            role="presentation"
            src={fileObject.data}
        />);
    }
    return <AttachFileIcon className={"image"}/>;
};

const defaultGetFileAddedMessage = (fileName: string) => (`File ${fileName} successfully added.`)


const defaultGetDropRejectMessage = (rejectedFile: FileRejection, acceptedFiles: Accept | undefined, maxFileSize: number | undefined) => {
    let message = `File ${rejectedFile.file.name} was rejected. `;
    if (acceptedFiles) {
        const fileExtension = rejectedFile.file.name.split('.').pop();
        const acceptedExtensions = Object.values(acceptedFiles).flat();
        if (!acceptedExtensions.includes(fileExtension || '')) {
            message += 'File type not supported. ';
        }
    }

    if (maxFileSize && rejectedFile.file.size > maxFileSize) {
        message += 'File is too big. Size limit is ' + convertBytesToMbsOrKbs(maxFileSize) + '. ';
    }
    return message;
}


const defaultGetFileLimitExceedMessage = (filesLimit: number) => {
    return `Maximum allowed number of files exceeded. Only ${filesLimit} allowed`
}

const defaultGetFileRemovedMessage = (fileName: string) => (`File ${fileName} removed.`)



const StyledDropzoneAreaBase = styled("div")(({theme}) => ({
    '@keyframes progress': {
        '0%': {
            backgroundPosition: '0 0',
        },
        '100%': {
            backgroundPosition: '-70px 0',
        },
    },
    position: 'relative',
    width: '100%',
    minHeight: '250px',
    // backgroundColor: theme.palette.background.paper,
    border: 'dashed',
    borderColor: theme.palette.divider,
    borderRadius: theme.shape.borderRadius,
    boxSizing: 'border-box',
    cursor: 'pointer',
    overflow: 'hidden',
    '&.active': {
        animation: '$progress 2s linear infinite !important',
        backgroundImage: `repeating-linear-gradient(-45deg, ${theme.palette.background.paper}, ${theme.palette.background.paper} 25px, ${theme.palette.divider} 25px, ${theme.palette.divider} 50px)`,
        backgroundSize: '150% 100%',
        border: 'solid',
        borderColor: theme.palette.primary.light,
    },
    '&.invalid': {
        backgroundImage: `repeating-linear-gradient(-45deg, ${theme.palette.error.light}, ${theme.palette.error.light} 25px, ${theme.palette.error.dark} 25px, ${theme.palette.error.dark} 50px)`,
        borderColor: theme.palette.error.main,
    },
    '.textContainer': {
        textAlign: 'center'
    },
    '.text': {
        marginBottom: theme.spacing(3),
        marginTop: theme.spacing(3),
    },
    '.icon': {
        width: 51,
        height: 51,
        color: theme.palette.text.primary,
    },
    '.resetButton': {
        display: 'block',
        margin: '10px 0',
    },
}));



class DropzoneAreaBase extends React.PureComponent<DropzoneAreaBaseProps> {
    static defaultProps: Partial<DropzoneAreaBaseProps> = {
        acceptedFiles: {},
        filesLimit: 3,
        fileObjects: [],
        maxFileSize: 3000000,
        dropzoneText: 'Drag and drop a file here or click',
        previewText: 'Preview:',
        disableRejectionFeedback: false,
        showPreviews: false, // By default, previews show up under in the dialog and inside in the standalone
        showPreviewsInDropzone: true,
        showFileNames: false,
        showFileNamesInPreview: false,
        useChipsForPreview: false,
        // previewChipProps: {},
        // previewGridClasses: {},
        // previewGridProps: {},
        reset: undefined,
        showAlerts: true,
        alertSnackbarProps: {
            anchorOrigin: {
                horizontal: 'left',
                vertical: 'bottom',
            },
            autoHideDuration: 6000,
        }
    }

    state: {
        openSnackBar: boolean;
        snackbarMessage: string;
        snackbarVariant: "error" | "info" | "success";
    } = {
        openSnackBar: false,
        snackbarMessage: '',
        snackbarVariant: 'success',
    };

    notifyAlert() {
        const {onAlert} = this.props;
        const {openSnackBar, snackbarMessage, snackbarVariant} = this.state;
        if (openSnackBar && onAlert) {
            onAlert(snackbarMessage, snackbarVariant);
        }
    }

    handleDropAccepted = async (acceptedFiles: File[], evt: DropEvent) => {
        const {fileObjects, filesLimit, getFileAddedMessage, getFileLimitExceedMessage, onAdd, onDrop} = this.props;

        if (filesLimit && filesLimit > 1 && fileObjects.length + acceptedFiles.length > filesLimit) {
            let message: string;
            if (getFileLimitExceedMessage) {
                message = getFileLimitExceedMessage(filesLimit)
            } else {
                message = defaultGetFileLimitExceedMessage(filesLimit)
            }
            this.setState({
                openSnackBar: true,
                snackbarMessage: message,
                snackbarVariant: 'error',
            }, this.notifyAlert);
            return;
        }

        // Notify Drop event
        if (onDrop) {
            onDrop(acceptedFiles, evt);
        }

        // Retrieve fileObjects data
        const fileObjs: FileObject[] = await Promise.all(
            acceptedFiles.map(async (file) => {
                const data = await readFile(file);
                return {
                    file,
                    data,
                };
            })
        );

        // Notify added files
        if (onAdd) {
            onAdd(fileObjs);
        }

        // Display message
        let message;
        if (getFileAddedMessage) {
            message = fileObjs.reduce((msg, fileObj) => msg + getFileAddedMessage(fileObj.file.name), '');
        } else {
            message = fileObjs.reduce((msg, fileObj) => msg + defaultGetFileAddedMessage(fileObj.file.name), '');
        }
        this.setState({
            openSnackBar: true,
            snackbarMessage: message,
            snackbarVariant: 'success',
        }, this.notifyAlert);
    }

    handleDropRejected = (rejectedFiles: FileRejection[], evt: DropEvent) => {
        const {
            acceptedFiles,
            filesLimit,
            fileObjects,
            getDropRejectMessage,
            getFileLimitExceedMessage,
            maxFileSize,
            onDropRejected,
        } = this.props;

        let message = '';
        if (filesLimit && fileObjects.length + rejectedFiles.length > filesLimit) {
            if (getFileLimitExceedMessage) {
                message = getFileLimitExceedMessage(filesLimit);
            } else {
                message = defaultGetFileLimitExceedMessage(filesLimit);
            }
        } else {
            rejectedFiles.forEach((rejectedFile) => {
                if (getDropRejectMessage) {
                    message = getDropRejectMessage(rejectedFile, acceptedFiles, maxFileSize);
                } else {
                    message = defaultGetDropRejectMessage(rejectedFile, acceptedFiles, maxFileSize)
                }
            });
        }

        if (onDropRejected) {
            onDropRejected(rejectedFiles, evt);
        }

        this.setState({
            openSnackBar: true,
            snackbarMessage: message,
            snackbarVariant: 'error',
        }, this.notifyAlert);
    }

    handleRemove = (fileIndex: number) => (event: React.UIEvent) => {
        event.stopPropagation();

        const {fileObjects, getFileRemovedMessage, onDelete} = this.props;

        // Find removed fileObject
        const removedFileObj = fileObjects[fileIndex];

        // Notify removed file
        if (onDelete) {
            onDelete(removedFileObj, fileIndex);
        }
        let message;
        if (getFileRemovedMessage) {
            message = getFileRemovedMessage(removedFileObj.file.name)
        } else {
            message = defaultGetFileRemovedMessage(removedFileObj.file.name)
        }

        this.setState({
            openSnackBar: true,
            snackbarMessage: message,
            snackbarVariant: 'info',
        }, this.notifyAlert);
    };

    handleCloseSnackbar = () => {
        this.setState({
            openSnackBar: false,
        });
    };

    render() {
        const {
            acceptedFiles,
            alertSnackbarProps,
            disableRejectionFeedback,
            dropzoneClass,
            dropzoneParagraphClass,
            dropzoneProps,
            dropzoneText,
            fileObjects,
            filesLimit,
            getPreviewIcon,
            Icon,
            inputProps,
            maxFileSize,
            previewChipProps,
            previewGridClasses,
            previewGridProps,
            previewText,
            showAlerts,
            showFileNames,
            showFileNamesInPreview,
            showPreviews,
            showPreviewsInDropzone,
            useChipsForPreview,
            reset,
        } = this.props;
        const {openSnackBar, snackbarMessage, snackbarVariant} = this.state;

        const isMultiple = filesLimit ? filesLimit > 1 : false;
        const previewsVisible = showPreviews && fileObjects.length > 0;
        const previewsInDropzoneVisible = showPreviewsInDropzone && fileObjects.length > 0;

        return (
            <StyledDropzoneAreaBase>
                <Dropzone
                    {...dropzoneProps}
                    accept={acceptedFiles}
                    onDropAccepted={this.handleDropAccepted}
                    onDropRejected={this.handleDropRejected}
                    maxSize={maxFileSize}
                    multiple={isMultiple}
                >
                    {({getRootProps, getInputProps, isDragActive, isDragReject}) => (
                        <div
                            {...getRootProps({
                                className: clsx(
                                    "root",
                                    dropzoneClass,
                                    isDragActive && "active",
                                    (!disableRejectionFeedback && isDragReject) && "invalid",
                                ),
                            })}
                        >
                            <input {...getInputProps(inputProps)} />

                            <div className={"textContainer"}>
                                <Typography
                                    variant="h5"
                                    component="p"
                                    className={clsx("text", dropzoneParagraphClass)}
                                >
                                    {dropzoneText}
                                </Typography>
                                {Icon ? (
                                    <Icon className={"icon"}/>
                                ) : (
                                    <CloudUploadIcon className={"icon"}/>
                                )}
                            </div>

                            {previewsInDropzoneVisible &&
                                <PreviewList
                                    fileObjects={fileObjects}
                                    handleRemove={this.handleRemove}
                                    getPreviewIcon={getPreviewIcon ?? defaultGetPreviewIcon}
                                    showFileNames={showFileNames}
                                    useChipsForPreview={useChipsForPreview}
                                    previewChipProps={previewChipProps}
                                    previewGridClasses={previewGridClasses}
                                    previewGridProps={previewGridProps}
                                />
                            }
                        </div>
                    )}
                </Dropzone>

                {
                    reset && (
                        React.isValidElement(reset) ?
                            reset :
                            <Button
                                onClick={reset.onClick}
                                variant="outlined"
                                className={"resetButton"}
                            >
                                {reset.text || 'reset'}
                            </Button>
                    )
                }

                {previewsVisible &&
                    <Fragment>
                        <Typography variant="subtitle1" component="span">
                            {previewText}
                        </Typography>
                        <PreviewList
                            fileObjects={fileObjects}
                            handleRemove={this.handleRemove}
                            getPreviewIcon={getPreviewIcon ?? defaultGetPreviewIcon}
                            showFileNames={showFileNamesInPreview}
                            useChipsForPreview={useChipsForPreview}
                            previewChipProps={previewChipProps}
                            previewGridClasses={previewGridClasses}
                            previewGridProps={previewGridProps}
                        />
                    </Fragment>
                }

                {/*{((typeof showAlerts === 'boolean' && showAlerts) ||*/}
                {/*        (Array.isArray(showAlerts) && showAlerts.includes(snackbarVariant))) &&*/}
                {/*    <Snackbar*/}
                {/*        anchorOrigin={defaultSnackbarAnchorOrigin as SnackbarOrigin}*/}
                {/*        autoHideDuration={6000}*/}
                {/*        {...alertSnackbarProps}*/}
                {/*        open={openSnackBar}*/}
                {/*        onClose={this.handleCloseSnackbar}*/}
                {/*    >*/}
                {/*        <div>div</div>*/}
                {/*        <SnackbarContentWrapper*/}
                {/*            onClose={this.handleCloseSnackbar}*/}
                {/*            variant={snackbarVariant}*/}
                {/*            message={snackbarMessage}*/}
                {/*        />*/}
                {/*     </Snackbar>*/}
                {/*}*/}
            </StyledDropzoneAreaBase>
        );
    }
}


export default DropzoneAreaBase;