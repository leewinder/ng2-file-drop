import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileDropDirective } from '../directives/file-drop.directive';
import { FileStateService } from '../services/file-state.service';

//
// Main entry module for the application
//
@NgModule({
    imports: [
        CommonModule,
    ],

    declarations: [
        FileDropDirective,
    ],

    providers: [
        FileStateService,
    ],

    exports: [
        FileDropDirective,
    ],
})
export class FileDropModule { }

