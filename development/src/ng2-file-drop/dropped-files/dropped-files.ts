import { AcceptedFile } from './accepted-file';
import { RejectedFile } from './rejected-file';

export class DroppedFiles {

    // Return the accepted files
    public get accepted(): AcceptedFile[] {
        return this.acceptedFiles;
    }

    // Return the rejected files
    public get rejected(): RejectedFile[] {
        return this.rejectedFiles;
    }

    public areAllAccepted(): boolean {
        return this.acceptedFiles.length > 0 && this.rejectedFiles.length === 0;
    }

    // Constructs the object
    constructor(private acceptedFiles: AcceptedFile[] = [], private rejectedFiles: RejectedFile[] = []) {
    }
}