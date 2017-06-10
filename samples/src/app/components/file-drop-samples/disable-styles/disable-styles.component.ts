import { Component } from '@angular/core';

import { Ng2FileDropAcceptedFile }  from 'ng2-file-drop';

@Component({

    moduleId: __filename,
    selector: 'disable-styles',

    templateUrl: 'disable-styles.component.html',
    styleUrls: ['disable-styles.component.css'],
})
export class DisableStylesComponent {

    //
    // File being dragged has been dropped and is valid
    //
    /* tslint:disable:no-unused-variable */
    private dragFileAccepted(acceptedFile: Ng2FileDropAcceptedFile) {
        /* tslint:enable:no-unused-variable */
        console.log('DisableStylesComponent - dragFileAccepted');
        console.log(acceptedFile.file);
    }
}
