import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Task } from '../../models/Task';
import { CommonModule } from '@angular/common';
import { TaskCardComponent } from '../task-card/task-card.component';

@Component({
  selector: 'app-task-column',
  standalone: true,
  imports: [CommonModule, TaskCardComponent],
  templateUrl: './task-column.component.html',
  styleUrl: './task-column.component.css'
})
export class TaskColumnComponent {
  //tasks already have the shape, 
  @Input() status!: Task['status'];
  @Input() tasks: Task[]= [];
  @Input() title = '';

  @Output() taskSelected = new EventEmitter<Task>();
  @Output() taskMoved = new EventEmitter<{ task: Task; status: Task['status'] }>();

  selectTask(task: Task): void {
    this.taskSelected.emit(task);
  }
  moveTask($event: any): void {
   this.taskMoved.emit($event); 
  }
  

   ngOnChanges(changes: SimpleChanges): void {
    console.log('TaskColumn inputs changed:', {
      status: this.status,
      tasks: this.tasks,
      title: this.title,
      changes
    });

  }
}
