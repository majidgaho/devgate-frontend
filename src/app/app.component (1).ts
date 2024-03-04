import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoService } from './todo.service';
import { Todo } from './todo-model';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[TodoService]
})
export class AppComponent implements OnInit{

  tasks: Array<Todo> = [];
  taskId!: number;
  task!: Todo;
  
  constructor(private service: TodoService){

  }
  ngOnInit(): void {
    this.getAll();
  }


  getAll() {
    this.service.getAll().subscribe(res => {
      this.tasks = res;
    })
  }

  save(data : Todo){
    this.service.save(data).subscribe(res => {
      this.tasks.push(res);
    })
  }

  update(data: Todo){
    this.service.update(this.taskId, data).subscribe(res => {

      const existing = this.tasks.find(task => task.id = res.id);
      
      
    })
  }

  delete(id: number){
    this.service.delete(id).subscribe(res => {
      console.log("Deleted ID "+ id);
    })
  }


  getTast(id: number){
    this.service.getTask(id).subscribe(res => {
      this.task = res;
    })
  }
  


}
