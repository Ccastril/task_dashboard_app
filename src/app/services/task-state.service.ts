import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, of } from 'rxjs';
import { Task } from '../models/Task';
import { INITIAL_TASKS } from '../data/test-data';

@Injectable({
  providedIn: 'root'
})
export class TaskStateService {

  private initialTasks: Task[] = INITIAL_TASKS;
  private tasksSubject = new BehaviorSubject<Task[]>(this.initialTasks);
  
  tasks$ = this.tasksSubject.asObservable();

  private selectedTaskSubject = new BehaviorSubject<Task | null>(null);
  selectedTask$ = this.selectedTaskSubject.asObservable();


  constructor() { }

  //searches tasks
  searchTasks(term: string, status: string = 'all', priority:string = 'all'): Observable<Task[]> {


    const normalizedTerm = term.toLowerCase().trim();
    
    const results = this.initialTasks.filter(task => {
      const matchesTerm = task.title.toLowerCase().includes(normalizedTerm) ||
      task.description.toLowerCase().includes(normalizedTerm) ||
      task.assignee.toLowerCase().includes(normalizedTerm);

      const matchesStatus = status === 'all' || task.status === status;
      const matchesPriority = priority === 'all' || task.priority === priority;

      return matchesTerm && matchesStatus && matchesPriority;
    });
    return of(results).pipe(delay(300));
  }

  selectTask(task: Task): void {
    this.selectedTaskSubject.next(task);
  }

  moveTask(taskId: number, newStatus: Task['status']): void {
    let newTasks = this.initialTasks;
    newTasks.forEach((task: Task )=> {
        if(task.id == taskId) {
          task.status = newStatus;
        }
      })

      this.tasksSubject.next(newTasks)
      
    }

  addTask(task: Task): void {
    
  }

  updateTask(updatedTask: Task): void {

  }
}

