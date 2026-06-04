import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Task } from '../../models/Task';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent {
  @Input({required: true}) task!: Task;

  @Output() selected = new EventEmitter<Task>();
  @Output() moved = new EventEmitter<{ task: Task; status: Task['status']}>();

  onSelect(): void {
    this.selected.emit(this.task);
  }

  onMove(status: Task['status']): void {
    //passing along teh event
    this.moved.emit({task:this.task, status});
  }

  ngOnChanges(changes: SimpleChanges): void {

    console.log("tehes are the keys of the task!!!!!!!!!!!!!!!", Object.keys(this.task))
  }
}
