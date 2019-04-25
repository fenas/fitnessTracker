import { TrainingService } from './../training.service';
import { StoptrainingComponent } from './stop-training.component';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material';



@Component({
  selector: 'app-currenttraining',
  templateUrl: './currenttraining.component.html',
  styleUrls: ['./currenttraining.component.scss']
})
export class CurrenttrainingComponent implements OnInit {
  @Output() trainingStop = new EventEmitter();
  progress = 0;
  timer: number;
  step: number;

  constructor(private dialog: MatDialog, private trainingservice: TrainingService) { }

  ngOnInit() {
    this.stopOrResetTimer();
  }

  stopOrResetTimer() {
    this.step = this.trainingservice.getRunningExercise().duration;
    const steps = this.step / 100 * 1000;

    this.timer = setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        clearInterval(this.timer);
        this.trainingservice.completeExercise();
      }
    }, steps);
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StoptrainingComponent, {
      data: {
        progress: this.progress
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.trainingservice.cancelExercise(this.progress);
      } else {
        this.stopOrResetTimer();
      }
    });


  }


}
