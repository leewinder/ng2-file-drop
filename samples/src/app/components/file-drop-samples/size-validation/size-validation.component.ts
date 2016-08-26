import { Component } from '@angular/core';

import { Ng2FileDropAcceptedFile, Ng2FileDropRejectedFile }  from 'ng2-file-drop';

@Component({

    moduleId: module.id,
    selector: 'size-validation',

    templateUrl: 'size-validation.component.html',
    styleUrls: ['size-validation.component.css'],
})
export class SizeValidationComponent {

    /* tslint:disable:no-unused-variable */
    // Maximum file size in bytes
    private maximumFileSizeInBytes: number = 1e+6;
    /* tslint:disable:no-unused-variable */

    //
    // File being dragged has moved into the drop region
    //
    /* tslint:disable:no-unused-variable */
    private dragFileOverStart() {
        /* tslint:enable:no-unused-variable */
        console.log('SizeValidationComponent - dragFileOverStart');
    }

    //
    // File being dragged has moved out of the drop region
    //
    /* tslint:disable:no-unused-variable */
    private dragFileOverEnd() {
        /* tslint:enable:no-unused-variable */
        console.log('SizeValidationComponent - dragFileOverEnd');
    }

    //
    // File being dragged has been dropped and is valid
    //
    /* tslint:disable:no-unused-variable */
    private dragFileAccepted(acceptedFile: Ng2FileDropAcceptedFile) {
        /* tslint:enable:no-unused-variable */
        console.log('SizeValidationComponent - dragFileAccepted');
        console.log(acceptedFile.file);
    }

    //
    // File being dragged has been dropped and has been rejected
    //
    /* tslint:disable:no-unused-variable */
    private dragFileRejected(rejectedFile: Ng2FileDropRejectedFile) {
        /* tslint:enable:no-unused-variable */
        console.log('SizeValidationComponent - dragFileRejected');
        console.log(rejectedFile.file);
    }
}
