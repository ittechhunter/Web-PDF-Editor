import React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import DropzoneAreaBase, {DropzoneAreaBaseProps} from './DropzoneAreaBase';

interface DropzoneDialogBaseProps {
    open: boolean;
    dialogTitle: string | React.ReactElement;
    dialogProps: Record<string, any>;
    fullWidth: boolean;
    maxWidth: string | false;
    cancelButtonText: string;
    submitButtonText: string;
    onClose: (event: React.SyntheticEvent) => void;
    onSave: (event: React.SyntheticEvent) => void;
}

export interface SplitDropzoneDialogProps extends DropzoneDialogBaseProps, DropzoneAreaBaseProps {}


// Split props related to DropzoneDialog from DropzoneArea ones
function splitDropzoneDialogProps(allProps: any) {
    const {
        cancelButtonText,
        dialogProps,
        dialogTitle,
        fullWidth,
        maxWidth,
        onClose,
        onSave,
        open,
        submitButtonText,
        ...dropzoneAreaProps
    } = allProps;

    return [
        {
            cancelButtonText,
            dialogProps,
            dialogTitle,
            fullWidth,
            maxWidth,
            onClose,
            onSave,
            open,
            submitButtonText,
        } ,
        dropzoneAreaProps,
    ];
}

/**
 * This component provides the DropzoneArea inside of a Material-UI Dialog.
 *
 * It supports all the Props and Methods from `DropzoneAreaBase`.
 */
class DropzoneDialogBase extends React.PureComponent<SplitDropzoneDialogProps> {
    static defaultProps: Partial<SplitDropzoneDialogProps> = {
        open: false,
        dialogTitle: 'Upload file',
        dialogProps: {},
        fullWidth: true,
        maxWidth: 'sm',
        cancelButtonText: 'Cancel',
        submitButtonText: 'Submit',
        showPreviews: true,
        showPreviewsInDropzone: false,
        showFileNamesInPreview: true,
    }

    render() {
        const [dropzoneDialogProps, dropzoneAreaProps] = splitDropzoneDialogProps(this.props);
        const {
            cancelButtonText,
            dialogProps,
            dialogTitle,
            fullWidth,
            maxWidth,
            onClose,
            onSave,
            open,
            submitButtonText,
        } = dropzoneDialogProps;

        // Submit button state
        const submitDisabled = dropzoneAreaProps.fileObjects.length === 0;

        return (
            <Dialog
                {...dialogProps}
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                onClose={onClose}
                open={open}
            >
                <DialogTitle>{dialogTitle}</DialogTitle>

                <DialogContent>
                    <DropzoneAreaBase
                        {...dropzoneAreaProps}
                    />
                </DialogContent>

                <DialogActions>
                    <Button
                        color="primary"
                        onClick={onClose}
                    >
                        {cancelButtonText}
                    </Button>

                    <Button
                        color="primary"
                        disabled={submitDisabled}
                        onClick={onSave}
                    >
                        {submitButtonText}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}


export default DropzoneDialogBase;
