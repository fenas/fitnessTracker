import { UiService } from './../shared/ui.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Exercise } from './execcise.model';
import { Injectable } from '@angular/core';
import { Subject, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();
  private fbSubs: Subscription[] = [];
  private runningExercise: Exercise;
  private availableExercises: Exercise[];

  //   { id: 'Squat', name: 'Squat', duration: 30, calories: 8 },
  //   { id: 'Crunches', name: 'Crunches', duration: 30, calories: 10 },
  //   { id: 'PushUp', name: 'PushUp', duration: 20, calories: 8 },
  //   { id: 'RunningPlank', name: 'RunningPlank', duration: 60, calories: 9 },
  //   { id: 'Burpee', name: 'Burpee', duration: 30, calories: 10 },
  //   { id: 'BackExtention', name: 'BackExtention', duration: 60, calories: 8 }];
  // private exercise: Exercise[] = [];

  constructor(private db: AngularFirestore, private uiservice: UiService) { }

  fetchAvailableExercise() {
    // return this.availableExercises.slice();

    this.fbSubs.push(this.db.collection('availableExercises')
      .snapshotChanges()
      .pipe(map(DocArray => {
        return DocArray
          .map(doc => {
            return {
              id: doc.payload.doc.id,
              ...doc.payload.doc.data()
              // duration: doc.payload.doc.data().duration,
              // calorie: doc.payload.doc.data().calorie
            };
          });
      })).subscribe((exercises: Exercise[]) => {
        this.availableExercises = exercises;
        this.exercisesChanged.next([...this.availableExercises]);

        console.log(exercises);
      }, error => {
        this.uiservice.showSnackbar('unable to ftch exericises', null, 3000);
      }
      ));



  }

  startExercise(selectedId: string) {
    console.log(selectedId);
    this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  completeExercise() {

    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);

  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled',
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);

  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  fetchCancelledOrCompleted() {
    this.fbSubs.push(this.db.collection('finishedExercises').valueChanges().subscribe((exercises: Exercise[]) => {
      this.finishedExercisesChanged.next(exercises);
      console.log(exercises);
    }));
  }

  cancelSubscritions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}


