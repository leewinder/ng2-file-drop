## Build Status

[![npm version](https://badge.fury.io/js/ng2-file-drop.svg)](https://badge.fury.io/js/ng2-file-drop)

**Master Branch**

[![Build Status](https://travis-ci.org/leewinder/ng2-file-drop.svg?branch=master)](https://travis-ci.org/leewinder/ng2-file-drop) 
[![Dependency Status](https://dependencyci.com/github/leewinder/ng2-file-drop/badge)](https://dependencyci.com/github/leewinder/ng2-file-drop)

**Develop Branch**

[![Build Status](https://travis-ci.org/leewinder/ng2-file-drop.svg?branch=develop)](https://travis-ci.org/leewinder/ng2-file-drop) 

<br>

## Overview

An Angular 2 module for simple desktop file drag and drop with automatic file validation and dynamic style adjustment.

<br>

![](https://cloud.githubusercontent.com/assets/1649415/18009234/3c180d48-6ba3-11e6-9f21-c71d3b1f7bd8.gif)

## Dependancies
Currently built against Angular ^4.1.3 and Typescript ^2.3.2

ng2-file-drop has the following additional dependancies
- [TsLerp](https://www.npmjs.com/package/tslerp): Typescript library for lerping single and multi-sample data sets over time
- [Typings](https://www.npmjs.com/package/typings): `npm install typings --global`

<br>

## Installation
1. Add the package to your 'dependencies' list in `package.json` and run `npm install`

  `"ng2-file-drop": "^1.1.0"`
  
  Optionally, you can manually install the package using the npm command line

  `npm install ng2-file-drop --save`
  
2. Add ng2-file-drop to both your `map` and `packages` structures in `systemjs.config.js`

  ```javascript
  var map = {
    ...
    'tslerp': 'node_modules/tslerp',
    'ng2-file-drop': 'node_modules/ng2-file-drop'
  };
  ```
  
  ```javascript
  var packages = {
    ...
    'tslerp': { main: 'index.js', defaultExtension: 'js' },
    'ng2-file-drop': { main: 'index.js', defaultExtension: 'js' },
  };
  ```
  
3. Optionally, add the `rootDir` option to `tsconfig.json` to make sure TypeScript's default root path algorithm doesn't pull in the `node_modules` folder

<br>

## Usage

All the examples shown below are taken from the [samples application](https://github.com/leewinder/ng2-file-drop/tree/master/samples).

### Building and Running the Sample Application
Check out the repository, browse to the './samples' folder and run `npm install` to install all the required dependancies.

**Note**: Running `npm install` on the sample project requires that Python 2.7.x is available on the command line as it runs a couple of Python scripts to correctly set up the npm_modules folder.

ng2-file-drop is developed in [Visual Studio Code](https://code.visualstudio.com/) so once `npm install` has finished you should be able to open the './samples' folder in VS Code and it will run out of the box (by default it uses lite-server which is installed as part of `npm install`).

If you are not using Visual Studio Code, browse to the './samples' folder and run `tsc` to build the application.  Then open your local server of choice pointing to ./samples as the root directory.

### Importing The 'ng2-file-drop' Module
To use ng2-file-drop, you need to import the Ng2FileDropModule into the relevent module in your application.  In the sample application this is done in the entry module - [app.module.ts](https://github.com/leewinder/ng2-file-drop/blob/master/samples/src/app/app.module.ts)

```TypeScript
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Ng2FileDropModule }  from 'ng2-file-drop';

@NgModule({
    imports: [
        BrowserModule,
        Ng2FileDropModule,
    ],

    bootstrap: [
        AppComponent,
    ],
})
export class AppModule { }
```

### Enabling File Drag
![](https://cloud.githubusercontent.com/assets/1649415/18009351/bcc6209c-6ba3-11e6-8c50-190372fe6633.gif)

Enabling File Drag on an element is remarkably simple and can see seen in  [image-validation](https://github.com/leewinder/ng2-file-drop/tree/master/samples/src/app/components/file-drop-samples/image-validation).

```TypeScript
import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-custom-component',
    
  // Simply add the 'ng2FileDrop' selector to the target div
  template: `<div ng2FileDrop class="custom-component-drop-zone"></div>`
  
  // Define the size of the file drop zone
  styles: [`
    .custom-component-drop-zone {
      width: 300px;
      height: 300px;
    }
  `]
})
export class MyCustomComponent {
}
```

If you want to enable dropping multiple files are once, when defining ng2FileDrop, define ng2FileDropAcceptMultiple as an input parameter

```TypeScript
<div ng2FileDrop ... [ng2FileDropAcceptMultiple]="true"></div>
```

### Responding To Events
![](https://cloud.githubusercontent.com/assets/1649415/18009474/55532602-6ba4-11e6-9e53-1a9c42f981d9.gif)

You can specify a set of callbacks that will trigger when a drag event happens, which can be seen in [size-validation](https://github.com/leewinder/ng2-file-drop/tree/master/samples/src/app/components/file-drop-samples/size-validation).

The available callbacks are
- When one or more files are initially dragged into the target space
- When one or more files are dragged out of the target space
- When a file is dropped and it is _accepted_ by 'ng2-file-drop' (when ng2FileDropAcceptMultiple = false)
- When a file is dropped and it is _rejected_ by 'ng2-file-drop' (when ng2FileDropAcceptMultiple = false)
- When one or more files are dropped (when ng2FileDropAcceptMultiple = true)

```TypeScript
import { Component } from '@angular/core';
import { Ng2FileDropAcceptedFile, Ng2FileDropRejectedFile }  from 'ng2-file-drop';

@Component({
  moduleId: module.id,
  selector: 'my-custom-component',
  
  template: `<!-- my_custom.component.html -->
             <!-- Specify the callbacks in 'MyCustomComponent' for each event -->
             <div ng2FileDrop class="custom-component-drop-zone"
             
                (ng2FileDropHoverStart)="dragFileOverStart()" (ng2FileDropHoverEnd)="dragFileOverEnd()"
                (ng2FileDropFileAccepted)="dragFileAccepted($event)" (ng2FileDropFileRejected)="dragFileRejected($event)"
                
             </div>
             
             <div ng2FileDrop class="custom-component-drop-zone"

                [ng2FileDropAcceptMultiple]="true" 

                (ng2FileDropHoverStart)="dragFileOverStart()" (ng2FileDropHoverEnd)="dragFileOverEnd()"
                (ng2FileDropFilesDropped)="dragFilesDropped($event)"
                
             </div>`,
  
  styles: [`
    .custom-component-drop-zone {
      width: 300px;
      height: 300px;
    }
  `]
})
export class MyCustomComponent {

  // File being dragged has moved into the drop region
  private dragFileOverStart() {
  }

  // File being dragged has moved out of the drop region
  private dragFileOverEnd() {
  }

  // File being dragged has been dropped and is valid
  private dragFileAccepted(acceptedFile: Ng2FileDropAcceptedFile) {
  }

  // File being dragged has been dropped and has been rejected
  private dragFileRejected(rejectedFile: Ng2FileDropRejectedFile) {
  }

  // Files being dragged have been dropped.
  private dragFilesDropped(droppedFile: Ng2FileDropFilesDropped) {
  }
}
```

### Responding to a Dropped File
![](https://cloud.githubusercontent.com/assets/1649415/18009599/e242c702-6ba4-11e6-82de-1712595983eb.gif)

Regardless of whether a file is accepted or rejected, you will be provided with a File object via either Ng2FileDropRejectedFile.file or Ng2FileDropAcceptedFile.file, which can be used to load, display, upload or otherwise interact with.

This can be seen in [image-validation.component.ts](https://github.com/leewinder/ng2-file-drop/blob/master/samples/src/app/components/file-drop-samples/image-validation/image-validation.component.ts#L27) which takes the dropped files and displays it in the browser.

```TypeScript
import { Component } from '@angular/core';
import { Ng2FileDropAcceptedFile }  from 'ng2-file-drop';

@Component({
  ...
})
export class ImageValidationComponent {

  ...

  // Takes the dropped image and displays it in the image tag
  private dragFileAccepted(acceptedFile: Ng2FileDropAcceptedFile) {

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
```

### Responding to Rejected Files
![](https://cloud.githubusercontent.com/assets/1649415/18009700/52a50c94-6ba5-11e6-9090-5701c470a908.gif)

When a file is rejected you can identify the reason for it being rejected in Ng2FileDropRejectedFile.rejectionReason which can take one of the following values
- Ng2FileDropRejections.None
- Ng2FileDropRejections.FileType
- Ng2FileDropRejections.FileSize
- Ng2FileDropRejections.Unknown

```TypeScript
import { Component } from '@angular/core';
import { Ng2FileDropRejectedFile, Ng2FileDropRejections }  from 'ng2-file-drop';

@Component({
  ...
})
export class ImageValidationComponent {

  ...

  // Takes the dropped image and displays it in the image tag
  private dragFileRejected(rejectedFile: Ng2FileDropRejectedFile) {

    // Respond to the reason for rejection
    if (rejectedFilerejectionReason === Ng2FileDropRejections.FileType) {
    } else if (rejectedFilerejectionReason === Ng2FileDropRejections.FileSize) {
    } else {
    }
  }
}
```

### Responding to multiple Dropped Files
When ng2FileDropAcceptMultiple is set to true the callbacks ng2FileDropFileAccepted and ng2FileDropFileRejected will not be emitted. Instead
ng2FileDropFilesDropped will be emitted when one or many files are dropped.

```TypeScript
import { Component } from '@angular/core';
import { Ng2FileDropFilesDropped }  from 'ng2-file-drop';

@Component({
  ...
})
export class ImageValidationComponent {

  ...

  // Takes the dropped image and displays it in the image tag
  private dragFilesDropped(droppedFiles: Ng2FileDropFilesDropped) {

    if (droppedFiles.accepted.length > 0) {
      ...
    }

    if (droppedFiles.rejected.length > 0) {
      ...
    }
  }
}
```

### Defining Acceptance Criteria
![](https://cloud.githubusercontent.com/assets/1649415/18009522/8b2aacaa-6ba4-11e6-9664-959df4dc4770.gif)

It is possible to define a set of criteria for the file to meet before it can be accepted, and if the file doesn't match those criteria it will be returned to the client as a 'Ng2FileDropRejectedFile'.

It is possible to define the following requirements
- File type (as seen in [image-validation.component.ts](https://github.com/leewinder/ng2-file-drop/blob/master/samples/src/app/components/file-drop-samples/image-validation/image-validation.component.ts#L17))
- File size (as seen in [size-validation.component.ts](https://github.com/leewinder/ng2-file-drop/blob/master/samples/src/app/components/file-drop-samples/size-validation/size-validation.component.ts#L17))

```TypeScript
import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-custom-component',
  
  template: `<!-- my_custom.component.html -->
             <!-- Set criteria for only image types under 1MB in size-->
             <div ng2FileDrop class="custom-component-drop-zone"
             
                [ng2FileDropSupportedFileTypes]="supportedFileTypes"
                [ng2FileDropMaximumSizeBytes]="maximumFileSizeInBytes"
                
                (ng2FileDropFileAccepted)="dragFileAccepted($event)"
             </div>`
  
  styles: [`
    .custom-component-drop-zone {
      width: 300px;
      height: 300px;
    }
  `]
})
export class MyCustomComponent {

  // Required criteria for all files (only image types under 1MB in size)
  private supportedFileTypes: string[] = ['image/png', 'image/jpeg', 'image/gif'];
  private maximumFileSizeInBytes: number = 1e+6;

  // File being dragged has been dropped and is valid
  private dragFileAccepted(acceptedFile: Ng2FileDropAcceptedFile) {
    // Any files passed through here will have met the requested criteria
  }
}
```

### Disabling the Default Style
![](https://cloud.githubusercontent.com/assets/1649415/18009545/b0b552e0-6ba4-11e6-902e-e25a2a151659.gif)

By default ng2-file-drop will automatically style the drop zone, highlighting it in blue when hovering, and flashing red when a file is rejected.  You can disable this behaviour as done in [disable-styles](https://github.com/leewinder/ng2-file-drop/tree/master/samples/src/app/components/file-drop-samples/disable-styles).

```TypeScript
import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-custom-component',
    
  // Disable the default style of drop zones
  template: `<div ng2FileDrop 
                class="custom-component-drop-zone
                
                [ng2FileDropDisableStyles]="true"
                
             </div>`
  
  // Define the size of the file drop zone
  styles: [`
    .custom-component-drop-zone {
      width: 300px;
      height: 300px;
    }
  `]
})
export class MyCustomComponent {
}
```

<br>

## Change Log

### 1.1.0
* Added peerDependancies to the npm package to support both npm2 and npm3

### 1.0.0
* Added support for dropping multiple files - [#25](https://github.com/leewinder/ng2-file-drop/pull/25)
* Updated to Angular ^4.1.3 and Typescript ^2.3.2 - [#26](https://github.com/leewinder/ng2-file-drop/pull/26)
* Altered used of moduleId for Webpack support - [#27](https://github.com/leewinder/ng2-file-drop/pull/27)

### 0.2.2
* Documentation update

### 0.2.1
* Support for Angular versions 2.0.0 - 2.4.7

### 0.2.0
* Fixed - Safari Issue: Can't find variable: DragEvent - https://github.com/leewinder/ng2-file-drop/issues/4

### 0.1.1
* Updated package requirements to Typescript ^2.0.0 plus related package upgrades

### 0.1.0
* Updated Angular dependancy to 2.0.0

### 0.0.1
* Initial release
