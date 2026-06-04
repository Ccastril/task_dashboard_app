import { Component, inject, Input } from '@angular/core';
import { TaskStateService } from '../../services/task-state.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css'
})
export class TaskDetailComponent {

  private taskState = inject(TaskStateService);
  
  selectedTask$ = this.taskState.selectedTask$;

}
