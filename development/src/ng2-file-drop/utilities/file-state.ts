import { RejectionReasons } from '../properties/rejection-reasons';

//
// Tracks and manages a dragged file
//
export class FileState {

    // Private properties
    private currentObject: DataTransfer = null;

    private supportedFileTypes: string[] = null;
    private maximumFileSizeInBytes: number = 0;

    //
    // Provides access to the current file object
    //
    public get currentFile(): DataTransfer {
        return this.currentObject;
    }
    public set currentFile(thisFile: DataTransfer) {
        this.currentObject = thisFile;
        if (this.currentObject !== null) {
            this.currentObject.dropEffect = 'copy';
        }
    }

    //
    // Sets our expected properties for the file we're dragging
    //
    public setExpectedFileProperties(supportFileFormats: string[], maximumFileSize: number) {
        this.supportedFileTypes = supportFileFormats;
        this.maximumFileSizeInBytes = maximumFileSize;
    }

    //
    // Returns the actual file present in the transfer object
    //
    public getFileData(): File {

        // We need an object
        if (this.currentObject === null) {
            return null;
        }

        if (this.currentObject.files.length === 0) {
            return null;
        }

        // Return the first one
        return this.currentObject.files[0];
    }

    //
    // Verifies if the file we have is valid or needs to be rejected
    //
    public isFileValid(): RejectionReasons {

        // Get the file
        let currentFile: File = this.getFileData();
        if (currentFile === null) {
            return RejectionReasons.Unknown;
        }

        // Valid file types
        if (this.supportedFileTypes) {

            // See if this is a type we support
            let fileTypeIndex: number = this.supportedFileTypes.indexOf(currentFile.type);
            if (fileTypeIndex === -1) {
                return RejectionReasons.FileType;
            }
        }

        // File size
        if (this.maximumFileSizeInBytes) {
            if (this.maximumFileSizeInBytes < currentFile.size) {
                return RejectionReasons.FileSize;
            }
        }

        // No problem
        return RejectionReasons.None;
    }
}
