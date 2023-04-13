import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

const USER_DATA = [
  {
    id: 1,
    name: 'John Smith',
    occupation: 'Advisor',
    dateOfBirth: '1984-05-05',
    age: 36,
  },
  {
    id: 2,
    name: 'Muhi Masri',
    occupation: 'Developer',
    dateOfBirth: '1992-02-02',
    age: 28,
  },
  {
    id: 3,
    name: 'Peter Adams',
    occupation: 'HR',
    dateOfBirth: '2000-01-01',
    age: 20,
  },
  {
    id: 4,
    name: 'Lora Bay',
    occupation: 'Marketing',
    dateOfBirth: '1977-03-03',
    age: 43,
  },
];

const COLUMNS_SCHEMA = [
  {
    key: 'isSelected',
    type: 'isSelected',
    label: '',
  },
  {
    key: 'name',
    type: 'text',
    label: 'Full Name',
  },
  {
    key: 'occupation',
    type: 'text',
    label: 'Occupation',
  },
  {
    key: 'dateOfBirth',
    type: 'date',
    label: 'Date of Birth',
  },
  {
    key: 'age',
    type: 'number',
    label: 'Age',
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  displayedColumns: string[] = COLUMNS_SCHEMA.map((col) => col.key);
  dataSource = USER_DATA;
  columnsSchema: any = COLUMNS_SCHEMA;

  constructor(public dialog: MatDialog) {}

  addRow() {
    const newRow = {
      id: Date.now(),
      name: '',
      occupation: '',
      dateOfBirth: '',
      age: 0,
      isEdit: true,
    };
    this.dataSource = [newRow, ...this.dataSource];
  }

  removeRow(id) {
    this.dataSource = this.dataSource.filter((u) => u.id !== id);
  }

  removeSelectedRows() {
    this.dialog
      .open(ConfirmDialogComponent)
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm) {
          this.dataSource = this.dataSource.filter((u: any) => !u.isSelected);
        }
      });
  }

  isAllSelected() {
    return this.dataSource.every((item: any) => item.isSelected);
  }

  isAnySelected() {
    return this.dataSource.some((item: any) => item.isSelected);
  }

  selectAll(event) {
    this.dataSource = this.dataSource.map((item: any) => ({
      ...item,
      isSelected: event.checked,
    }));
  }
}
