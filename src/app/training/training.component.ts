import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

  onGoingTraining = false;
  exerciseSubscription: Subscription;

  constructor(private trainingservice: TrainingService) { }

  ngOnInit() {
    this.exerciseSubscription = this.trainingservice.exerciseChanged.subscribe(
      exercise => {
        if (exercise) {
          this.onGoingTraining = true;
        } else {
          this.onGoingTraining = false;
        }
      });
  }

}
