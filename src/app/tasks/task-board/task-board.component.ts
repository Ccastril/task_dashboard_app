import { Component, inject } from '@angular/core'; 
import { BehaviorSubject, combineLatest, catchError, of, switchMap, debounceTime, distinctUntilChanged, startWith, map } from 'rxjs';
import { TaskStateService } from '../../services/task-state.service.js';
import { TaskColumnComponent } from '../task-column/task-column.component.js';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/Task.js';
import { TaskDetailComponent } from "../task-detail/task-detail.component";

@Component({
  selector: 'app-task-board',
  standalone: true,
  templateUrl: './task-board.component.html',
  imports: [CommonModule, TaskColumnComponent, TaskDetailComponent],
  styleUrl: './task-board.component.css'
})
export class TaskBoardComponent {

  private searchTerm$ = new BehaviorSubject<string>('');
  private statusFilter$ = new BehaviorSubject<string>('all');
  private priorityFilter$ = new BehaviorSubject<string>('all');

  taskState = inject(TaskStateService);
  
  selectedTask$ = this.taskState.selectedTask$;

  onSearchChange(term: string): void {
    this.searchTerm$.next(term);
  }
  onStatusChange(status: string): void {
    this.statusFilter$.next(status);
  }
  onPriorityChange(priority: string): void {
    this.priorityFilter$.next(priority);
  }

  filteredTasks$ = combineLatest([
    this.searchTerm$,
    this.statusFilter$,
    this.priorityFilter$
  ]).pipe(
    debounceTime(300),
    switchMap(([ term, status, priority])=> 
      this.taskState.searchTasks(term, status, priority)
    ), 
    catchError(error => {
      console.error(error);
      return of([]);
    })
  )

  inProgressTasks$ = this.filteredTasks$.pipe(
    map(tasks => tasks.filter(task => task.status === 'in-progress'))
  );

  backlogTasks$ = this.filteredTasks$.pipe(
    map(tasks => tasks.filter(task => task.status === 'backlog'))
  );

  inReviewTasks$ = this.filteredTasks$.pipe(
    map(tasks => tasks.filter(task => task.status === 'review'))
  )

  completedTasks$ = this.filteredTasks$.pipe(
    map(tasks => tasks.filter(task => task.status === 'done'))
  );

  onTaskSelected(task: Task): void {
    this.taskState.selectTask(task);
  }
  onMove($event: any): void {
    this.taskState.moveTask($event.task.id, $event.status)
  }

 }
