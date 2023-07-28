import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  data: any;

  nameColumns = ['number', 'name', 'age', 'gender', 'position'];
  rows = [
    {
      number: '1',
      name: 'Eric',
      age: '19',
      gender: 'Male',
      position: 'Front-end'
    },
    {
      number: '2',
      name: 'Alex',
      age: '28',
      gender: 'Male',
      position: 'Designer'
    },
    {
      number: '3',
      name: 'Ben',
      age: '18',
      gender: 'Male',
      position: 'Back-end'
    },
    {
      number: '4',
      name: 'Lina',
      age: '23',
      gender: 'Female',
      position: 'Project Manager'
    },
    {
      number: '5',
      name: 'Ricky',
      age: '30',
      gender: 'Male',
      position: 'Product manager'
    }
   ];

  columns = [
    {
      name: 'number',
      title: '№'
    },
    {
      name: 'name',
      title: 'Name'
    },
    {
      name: 'age',
      title: 'Age'
    },
    {
      name: 'gender',
      title: 'Gender'
    },
    {
      name: 'position',
      title: 'Position'
    }
  ];

  ngOnInit() {
    this.data = new MatTableDataSource(this.rows);
  }

  tableDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.nameColumns, event.previousIndex, event.currentIndex);
  }
}
