import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-stop-training',
    template: `<h2 mat-dialog-title>Are You Sure?</h2>
    <mat-dialog-content>
    <p> You Already Got {{passedData.progress}} %</p>
    </mat-dialog-content>
            <mat-dialog-actions>
                <button mat-button [mat-dialog-close]="true">Yes</button>
                <button mat-button [mat-dialog-close]="false">No</button>
            </mat-dialog-actions>`
})
export class StoptrainingComponent {
    constructor(@Inject(MAT_DIALOG_DATA) private passedData: any) { }

}
