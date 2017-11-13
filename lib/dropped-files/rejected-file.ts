import { RejectionReasons } from '../properties/rejection-reasons';

//
// Properties of a rejected file
//
export class RejectedFile {

    // Return the file
    public get file(): File {
        return this.acceptedFile;
    }

    // Return the reason we rejected this file
    public get rejectionReason(): RejectionReasons {
        return this.reason;
    }

    // Constructs the object
    constructor(private acceptedFile: File, private reason: RejectionReasons) {
    }
}
