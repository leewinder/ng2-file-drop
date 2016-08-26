import { ElementRef, Renderer } from '@angular/core';
import { ColorIndex } from '../properties/color-index';

import { TsLerp, TsLerpStyle, TsLerpTransition } from 'tslerp';

//
// Manages the presentation of the drop zone
//
export class DropZoneStyle {

    // Default colours
    private defaultIdleColor: number[] = [255, 255, 255];
    private defaultHoverColor: number[] = [187, 215, 252];
    private defaultRejectedColor: number[] = [255, 191, 191];

    private currentElementColour: number[] = this.defaultIdleColor;

    private lerpController: TsLerp = new TsLerp();

    private transitionTime: number = 0.5;

    //
    // Entry point
    //
    constructor(private element: ElementRef, private renderer: Renderer) {
    }

    //
    // Called when a hover starts
    //
    public onHoverStart() {
        this.startColourTransition(this.defaultHoverColor, TsLerpTransition.EaseOut, TsLerpStyle.Sine);
    }

    //
    // Called when a hover ends
    //
    public onHoverEnd() {
        this.startColourTransition(this.defaultIdleColor, TsLerpTransition.EaseIn, TsLerpStyle.Sine);
    }

    //
    // Called when a file is rejected
    //
    public onFileRejected() {
        // Slightly different, we flash fail and fade out
        this.currentElementColour = this.defaultRejectedColor;
        this.startColourTransition(this.defaultIdleColor, TsLerpTransition.EaseIn, TsLerpStyle.Cubic);
    }

    //
    // Called when a file is accepted
    //
    public onFileAccepted() {
        // We won't do anything with this by default
    }

    //
    // Converts an RGB to a Hex value
    //
    private convertRgbToHex(rgb: number[]): string {

        // Return our hex value
        return '#' + this.componentToHex(rgb[ColorIndex.Red]) +
            this.componentToHex(rgb[ColorIndex.Green]) +
            this.componentToHex(rgb[ColorIndex.Blue]);
    }

    //
    // Converts a single RGB colour component to hex
    //
    componentToHex(component: number): string {

        // Found it first, we don't deal with non-integer values
        component = Math.round(component);
        let hex = component.toString(16);

        return hex.length === 1 ? '0' + hex : hex;
    }

    //
    // Starts a colour transition
    //
    private startColourTransition(target: number[], transition: TsLerpTransition, style: TsLerpStyle) {

        // Define the lerp for from where we are originally
        this.lerpController.define([
            [this.currentElementColour[ColorIndex.Red], target[ColorIndex.Red]],
            [this.currentElementColour[ColorIndex.Green], target[ColorIndex.Green]],
            [this.currentElementColour[ColorIndex.Blue], target[ColorIndex.Blue]],
        ], this.transitionTime, transition, style);

        // Trigger it
        this.lerpController.lerp((lerpResults: number[], time: number) => {
            this.updateColourLerp(lerpResults, time);
        });
    }

    //
    // Callback during the lerp
    //
    private updateColourLerp(lerpResults: number[], time: number) {

        // Update our element colour
        this.currentElementColour = lerpResults;
        this.updateElementColour();
    }

    //
    // Updates the colour of the element
    //
    private updateElementColour() {

        // Set it to the default colour
        let endColor = this.convertRgbToHex(this.currentElementColour);
        this.renderer.setElementStyle(this.element.nativeElement, 'backgroundColor', endColor);
    }
}
