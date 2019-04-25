import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable()
export class UiService {

    showSpinner = new Subject<boolean>();

    constructor(private snackbar: MatSnackBar) { }

    showSnackbar(message, action, duration) {

        this.snackbar.open(message, action, {
            // tslint:disable-next-line: object-literal-shorthand
            duration: duration
        });

    }
}
