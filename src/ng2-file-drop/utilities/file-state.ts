import { RejectionReasons } from '../properties/rejection-reasons';
import { AcceptedFile } from '../dropped-files/accepted-file';
import { RejectedFile } from '../dropped-files/rejected-file';
import { DroppedFiles } from '../dropped-files/dropped-files';

//
// Tracks and manages dragged files
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
    // Returns the actual files present in the transfer object
    //
    public getFiles(): FileList {

        // We need an object
        if (this.currentObject === null) {
            return null;
        }

        if (this.currentObject.files.length === 0) {
            return null;
        }

        // Return all files
        return this.currentObject.files;
    }

    //
    // Verifies if the file we have is valid or needs to be rejected
    //
    public isFileValid(): RejectionReasons {

        // Get the file
        let currentFiles: FileList = this.getFiles();
        if (currentFiles === null) {
            return RejectionReasons.Unknown;
        }

        // Valid file types
        if (this.supportedFileTypes) {

            // See if this is a type we support
            let fileTypeIndex: number = this.supportedFileTypes.indexOf(currentFiles[0].type);
            if (fileTypeIndex === -1) {
                return RejectionReasons.FileType;
            }
        }

        // File size
        if (this.maximumFileSizeInBytes) {
            if (this.maximumFileSizeInBytes < currentFiles[0].size) {
                return RejectionReasons.FileSize;
            }
        }

        // No problem
        return RejectionReasons.None;
    }

    //
    // Verifies if the files we have are valid or needs to be rejected
    //
    public verifyFiles(): DroppedFiles {

        // Get the files
        let currentFiles: FileList = this.getFiles();
        if (currentFiles === null) {
            return new DroppedFiles();
        }

        let acceptedFiles: AcceptedFile[] = [];
        let rejectedFiles: RejectedFile[] = [];

        for (let i: number = 0; i < currentFiles.length; ++i) {
            // Valid file types
            if (this.supportedFileTypes) {

                // See if this is a type we support
                let fileTypeIndex: number = this.supportedFileTypes.indexOf(currentFiles[i].type);
                if (fileTypeIndex === -1) {
                    rejectedFiles.push(new RejectedFile(currentFiles[i], RejectionReasons.FileType));
                    continue;
                }
            }

            // File size
            if (this.maximumFileSizeInBytes) {
                if (this.maximumFileSizeInBytes < currentFiles[i].size) {
                    rejectedFiles.push(new RejectedFile(currentFiles[i], RejectionReasons.FileSize));
                    continue;
                }
            }

            // No problem
            acceptedFiles.push(new AcceptedFile(currentFiles[i]));
        }

        return new DroppedFiles(acceptedFiles, rejectedFiles);
    }

}
