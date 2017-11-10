import { Directive, EventEmitter, ElementRef, Renderer, HostListener, Output, Input, OnInit } from '@angular/core';

import { FileState } from '../utilities/file-state';
import { DropZoneStyle } from '../utilities/drop-zone-style';
import { RejectionReasons } from '../properties/rejection-reasons';

import { AcceptedFile } from '../dropped-files/accepted-file';
import { RejectedFile } from '../dropped-files/rejected-file';
import { DroppedFiles } from '../dropped-files/dropped-files';

//
// Directive to support dragging and dropping and element onto a div
//
@Directive({
    // Selector required in component HTML
    selector: '[ng2FileDrop]',
})
export class FileDropDirective implements OnInit {

    @Output()
    public ng2FileDropHoverStart: EventEmitter<any> = new EventEmitter<any>();
    @Output()
    public ng2FileDropHoverEnd: EventEmitter<any> = new EventEmitter<any>();
    @Output()
    public ng2FileDropFileAccepted: EventEmitter<AcceptedFile> = new EventEmitter<AcceptedFile>();
    @Output()
    public ng2FileDropFileRejected: EventEmitter<RejectedFile> = new EventEmitter<RejectedFile>();
    @Output()
    public ng2FileDropFilesDropped: EventEmitter<DroppedFiles> = new EventEmitter<DroppedFiles>();

    @Input()
    public ng2FileDropAcceptMultiple: boolean;
    @Input()
    public ng2FileDropSupportedFileTypes: string[];
    @Input()
    public ng2FileDropMaximumSizeBytes: number;
    @Input()
    public ng2FileDropDisableStyles: boolean;

    // Keep track of our dropped files
    private fileService: FileState = new FileState();
    private dropZoneStyle: DropZoneStyle = null;

    //
    // Constructor requires an element reference that instantiated this directive
    //
    public constructor(private element: ElementRef, private renderer: Renderer) {
    }

    //
    // Initialisation
    //
    public ngOnInit() {

        // Set our properties
        this.fileService.setExpectedFileProperties(this.ng2FileDropSupportedFileTypes, this.ng2FileDropMaximumSizeBytes);
        if (this.ng2FileDropDisableStyles !== true) {
            this.dropZoneStyle = new DropZoneStyle(this.element, this.renderer);
        }
    }

    //
    // Called when the element has content dragged over
    //
    @HostListener('dragover', ['$event'])
    public onDragOver(event: Event): void {

        // If we're already in the on-drag, don't bother with this
        if (this.fileService.currentFile === null) {

            // Get the object being dragged and reference it as a copy action
            this.fileService.currentFile = this.getDataTransferObject(event);
            if (this.fileService.currentFile === null) {
                return;
            }

            // Let the client know
            this.ng2FileDropHoverStart.emit();
            if (this.dropZoneStyle !== null) {
                this.dropZoneStyle.onHoverStart();
            }
        }

        // Don't propagate
        this.preventAndStopEventPropagation(event);
    }

    //
    // Called when the element has dragged content leave
    //
    @HostListener('dragleave', ['$event'])
    public onDragLeave(event: Event): void {

        // Only bother if we have a file
        if (this.fileService.currentFile !== null) {

            // Finished with the file
            this.fileService.currentFile = null;
            if (event.currentTarget === (this as any).element[0]) {
                return;
            }

            // Let the client know
            this.ng2FileDropHoverEnd.emit();
            if (this.dropZoneStyle !== null) {
                this.dropZoneStyle.onHoverEnd();
            }
        }

        // Don't let it continue
        this.preventAndStopEventPropagation(event);
    }

    //
    // Called when the element has content dropped
    //
    @HostListener('drop', ['$event'])
    public onDrop(event: Event): void {

        // Only bother if we have a file
        if (this.fileService.currentFile !== null) {

            // Let the client know
            this.ng2FileDropHoverEnd.emit();
            if (this.dropZoneStyle !== null) {
                this.dropZoneStyle.onHoverEnd();
            }

            // Update our data
            this.fileService.currentFile = this.getDataTransferObject(event);

            if (this.ng2FileDropAcceptMultiple) {

                // Check if our files are valid or not
                let droppedFiles: DroppedFiles = this.fileService.verifyFiles();

                this.ng2FileDropFilesDropped.emit(droppedFiles);
                if (this.dropZoneStyle !== null) {
                    if (droppedFiles.areAllAccepted()) {
                        this.dropZoneStyle.onFileAccepted();
                    } else {
                        this.dropZoneStyle.onFileRejected();
                    }
                }
            } else {

                // Check if our file is valid or not
                let rejectionReason: RejectionReasons = this.fileService.isFileValid();

                let fileData: File = this.fileService.getFiles()[0];
                if (rejectionReason === RejectionReasons.None) {
                    this.ng2FileDropFileAccepted.emit(new AcceptedFile(fileData));
                    if (this.dropZoneStyle !== null) {
                        this.dropZoneStyle.onFileAccepted();
                    }
                } else {
                    this.ng2FileDropFileRejected.emit(new RejectedFile(fileData, rejectionReason));
                    if (this.dropZoneStyle !== null) {
                        this.dropZoneStyle.onFileRejected();
                    }
                }
            }

            // Finished with the file
            this.fileService.currentFile = null;
        }

        // Don't let it continue
        this.preventAndStopEventPropagation(event);
    }

    //
    // Stops the drag/drop events propagating
    //
    private preventAndStopEventPropagation(event: Event): void {
        event.preventDefault();
        event.stopPropagation();
    }

    //
    // Returns the file dragged into the directive
    //
    private getDataTransferObject(event: Event | any): DataTransfer {
        return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
    }
}
