import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileDropDirective } from '../directives/file-drop.directive';

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
    ],

    exports: [
        FileDropDirective,
    ],
})
export class FileDropModule { }

