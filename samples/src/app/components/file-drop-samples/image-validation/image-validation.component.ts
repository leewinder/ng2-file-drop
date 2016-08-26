import { Component, ViewChild, ViewContainerRef } from '@angular/core';

import { Ng2FileDropAcceptedFile, Ng2FileDropRejectedFile }  from 'ng2-file-drop';

@Component({

    moduleId: module.id,
    selector: 'image-validation',

    templateUrl: 'image-validation.component.html',
    styleUrls: ['image-validation.component.css'],
})
export class ImageValidationComponent {

    /* tslint:disable:no-unused-variable */
    // Supported image types
    private supportedFileTypes: string[] = ['image/png', 'image/jpeg', 'image/gif'];
    /* tslint:enable:no-unused-variable */

    private imageShown: boolean = false;
    private currentProfileImage: string = 'assets/profile-placeholder.png';

    //
    // File being dragged has moved into the drop region
    //
    /* tslint:disable:no-unused-variable */
    private dragFileOverStart() {
        /* tslint:enable:no-unused-variable */
    }

    //
    // File being dragged has moved out of the drop region
    //
    /* tslint:disable:no-unused-variable */
    private dragFileOverEnd() {
        /* tslint:enable:no-unused-variable */
    }

    //
    // File being dragged has been dropped and is valid
    //
    /* tslint:disable:no-unused-variable */
    private dragFileAccepted(acceptedFile: Ng2FileDropAcceptedFile) {
        /* tslint:enable:no-unused-variable */

        // Load the image in
        let fileReader = new FileReader();
        fileReader.onload = () => {

            // Set and show the image
            this.currentProfileImage = fileReader.result;
            this.imageShown = true;
        };

        // Read in the file
        fileReader.readAsDataURL(acceptedFile.file);
    }

    //
    // File being dragged has been dropped and has been rejected
    //
    /* tslint:disable:no-unused-variable */
    private dragFileRejected(rejectedFile: Ng2FileDropRejectedFile) {
        /* tslint:enable:no-unused-variable */
    }
}
