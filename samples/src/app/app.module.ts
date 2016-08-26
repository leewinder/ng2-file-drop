import { NgModule }      from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './components/app/app.component';
import { MainPageComponent }  from './components/main-page/main-page.component';

import { ImageValidationComponent }  from './components/file-drop-samples/image-validation/image-validation.component';
import { SizeValidationComponent }  from './components/file-drop-samples/size-validation/size-validation.component';

import { Ng2FileDropModule }  from 'ng2-file-drop';

@NgModule({
    imports: [
        BrowserModule,
        Ng2FileDropModule,
    ],

    declarations: [
        AppComponent,
        MainPageComponent,

        ImageValidationComponent,
        SizeValidationComponent,
    ],

    bootstrap: [
        AppComponent,
    ],

    providers: [
    ],

    entryComponents: [
    ],
})
export class AppModule { }
