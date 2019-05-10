import { element } from 'protractor';
import { Subscription } from 'rxjs';
import { TrainingService } from './../training.service';
import { Exercise } from './../execcise.model';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';



@Component({
  selector: 'app-pasttraining',
  templateUrl: './pasttraining.component.html',
  styleUrls: ['./pasttraining.component.scss']
})
export class PasttrainingComponent implements OnInit, OnDestroy {

  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  private ExChangedSubscription: Subscription;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private trainingService: TrainingService) { }

  doFilter(filterValue: string) {

    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  ngOnInit() {
    this.ExChangedSubscription = this.trainingService.finishedExercisesChanged.subscribe((exercises: Exercise[]) => {
      this.dataSource.data = exercises;
      console.log(exercises);
    });
    this.trainingService.fetchCancelledOrCompleted();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.ExChangedSubscription.unsubscribe();
  }

  convertToDate(timestamp: any): Date {
    console.log(timestamp);
    const newdate = new Date(parseFloat(timestamp.seconds) * 1000);
    console.log(newdate);
    return newdate;

  }

}
