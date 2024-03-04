import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../todo-model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit, OnChanges {

  @Output() taskSaved: EventEmitter<any> = new EventEmitter();
  @Output() taskUpdated: EventEmitter<any> = new EventEmitter();

  @Input() taskInfo!: Todo;

  status!: string;
  name!: string;
  id!: number;
  isUpdate!: boolean;

  constructor(private service: TodoService) { 
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if(changes && changes.taskInfo.currentValue){
      this.name = changes.taskInfo.currentValue.name;
      this.status = changes.taskInfo.currentValue.status;
      this.id = changes.taskInfo.currentValue.id
      this.isUpdate = true;
    }
    
  }

  ngOnInit(): void {
    this.status = 'Pending'
  }

  saveTask() {
    const data: Todo = {id: 0, name: this.name, status: this.status};
    this.service.save(data).subscribe(res => {
      this.taskSaved.emit(res);
      this.clear();
    }, error => {
      console.error('Error saving task:', error);
    });
  }

  updateTask() {
    const data: Todo = {id: this.id, name: this.name, status: this.status};
    this.service.update(data.id, data).subscribe(res => {
      this.taskUpdated.emit(res);
      this.clear();
    }, error => {
      console.error('Error saving task:', error);
    });
  }

  
  


  private clear() {
    this.id = 0;
    this.name = '';
    this.status = '';
    this.isUpdate = false;
  }
}
