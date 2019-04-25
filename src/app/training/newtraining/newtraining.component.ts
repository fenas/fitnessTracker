import { Exercise } from './../execcise.model';
import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-newtraining',
  templateUrl: './newtraining.component.html',
  styleUrls: ['./newtraining.component.scss']
})
export class NewtrainingComponent implements OnInit, OnDestroy {
  @Output() TrainingStart = new EventEmitter<void>();
  exercises: Exercise[];
  exerciseSubscription: Subscription;
  constructor(private trainingService: TrainingService) {
  }

  ngOnInit() {
    this.trainingService.fetchAvailableExercise();
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
      exercise => (this.exercises = exercise)
    );
  }

  onStartExercise(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);

  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
  }

}
