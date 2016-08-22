
//
// Properties of an accepted file
//
export class AcceptedFile {

    // Return the file
    public get file(): File {
        return this.acceptedFile;
    }

    // Constructs the object
    constructor(private acceptedFile: File) {
    }
}
