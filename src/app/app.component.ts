import { Component } from '@angular/core';
import { Todo } from './todo-model';
import { TodoService } from './todo.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  action: string = "Add New Task";

  tasks: Todo[] = [
    {id: 1, name: 'Buy groceries', status: 'Pending'},
    {id: 2, name: 'Read a book', status: 'Completed'},
    // Add more Todos as needed
  ];

  displayedColumns: string[] = ['id', 'name', 'status', 'action'];
  title = 'todo-app';


  // tasks: Array<Todo> = [];
  taskId!: number;
  task!: Todo;
  selectedTask!: Todo;
  
  constructor(private service: TodoService,private snackBar: MatSnackBar){

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
    data.status = "pending"
    this.service.save(data).subscribe(res => {
      this.tasks.push(res);
    })
  }

  onEdit(data: Todo){
    this.selectedTask = data;
    this.action = "Edit Task";
  }

  delete(id: number){
    this.service.delete(id).subscribe(res => {
      console.log("Deleted ID "+ id);
      this.tasks = this.tasks.filter(task => task.id !== id);
      this.showSuccessMessage();
    })
  }


  getTast(id: number){
    this.service.getTask(id).subscribe(res => {
      this.task = res;
    })
  }


  onTaskSaved(savedTask: Todo) {
    this.tasks = [...this.tasks, savedTask];
    this.showSuccessMessage();
  }


  onTaskUpdated(updatedTask: Todo) {
    this.action = "Add New Task"
    const index = this.tasks.findIndex(task => task.id === updatedTask.id);
  
    if (index !== -1) {
      this.tasks[index] = updatedTask;
  
       this.tasks = [
         ...this.tasks.slice(0, index),
         updatedTask,
         ...this.tasks.slice(index + 1)
       ];
    }
    this.showSuccessMessage();
  }


  showSuccessMessage() {
    this.snackBar.open('Operation successful!', 'Close', {
      duration: 2000, // Duration in milliseconds after which the snack-bar will be automatically dismissed.
      panelClass: ['success-snackbar'] // Optional: add a custom class for styling
    });
  }
  


}

