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
    private maximumFileSizeInBytes: number = 2e+6;
    /* tslint:disable:no-unused-variable */

    private fileName: string = 'No file selected';
    private fileEvent: string = 'No events fired';

    //
    // File being dragged has moved into the drop region
    //
    /* tslint:disable:no-unused-variable */
    private dragFileOverStart() {
        /* tslint:enable:no-unused-variable */
        this.fileEvent = 'SizeValidationComponent.dragFileOverStart';
    }

    //
    // File being dragged has moved out of the drop region
    //
    /* tslint:disable:no-unused-variable */
    private dragFileOverEnd() {
        /* tslint:enable:no-unused-variable */
        this.fileEvent = 'SizeValidationComponent.dragFileOverEnd';
    }

    //
    // File being dragged has been dropped and is valid
    //
    /* tslint:disable:no-unused-variable */
    private dragFileAccepted(acceptedFile: Ng2FileDropAcceptedFile) {
        /* tslint:enable:no-unused-variable */
        this.fileEvent = 'SizeValidationComponent.dragFileAccepted';
        this.fileName = 'File selected: ' + acceptedFile.file.name;
    }

    //
    // File being dragged has been dropped and has been rejected
    //
    /* tslint:disable:no-unused-variable */
    private dragFileRejected(rejectedFile: Ng2FileDropRejectedFile) {
        /* tslint:enable:no-unused-variable */
        this.fileEvent = 'SizeValidationComponent.dragFileRejected';
    }
}
