import { Component } from '@angular/core';

import { Ng2FileDropAcceptedFile }  from 'ng2-file-drop';

@Component({

    moduleId: __filename,
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
}
