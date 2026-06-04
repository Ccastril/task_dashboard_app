# TaskApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


Mini App Prompt: Task Workflow Board

Build a small Angular app called Task Workflow Board.

The app should manage a list of tasks moving through statuses:

Backlog → In Progress → Review → Done

The goal is to practice:

RxJS state management
BehaviorSubject
service-to-component communication
filtering/searching
derived Observables
combineLatest
map
switchMap or service calls
parent-child component communication with @Input() / @Output()
Core requirements
1. Task model

Each task should have:

export interface Task {
  id: number;
  title: string;
  description: string;
  assignee: string;
  priority: 'low' | 'medium' | 'high';
  status: 'backlog' | 'in-progress' | 'review' | 'done';
}
2. Components

Use this structure:

src/app/
  models/
    task.model.ts

  services/
    task-state.service.ts

  tasks/
    task-board/
      task-board.component.ts
      task-board.component.html
      task-board.component.scss

    task-column/
      task-column.component.ts
      task-column.component.html
      task-column.component.scss

    task-card/
      task-card.component.ts
      task-card.component.html
      task-card.component.scss

    task-detail/
      task-detail.component.ts
      task-detail.component.html
      task-detail.component.scss
What each component does
TaskBoardComponent

This is the main container.

It owns:

search input
priority filter
selected status filter if you want one
displays all columns
subscribes to filtered tasks stream

Practice:

combineLatest()
map()
BehaviorSubject
async pipe
TaskColumnComponent

Receives a status and tasks as inputs.

Practice:

@Input()
@Output()

Example:

@Input() title = '';
@Input() status!: Task['status'];
@Input() tasks: Task[] = [];

@Output() taskSelected = new EventEmitter<Task>();
@Output() taskMoved = new EventEmitter<{ task: Task; status: Task['status'] }>();
TaskCardComponent

Displays one task.

Receives task via @Input().

Emits selected task via @Output().

Practice:

@Input() task!: Task;
@Output() selected = new EventEmitter<Task>();
TaskDetailComponent

Shows the selected task.

Gets selected task from shared service:

selectedTask$ = this.taskState.selectedTask$;

Practice:

shared state service
BehaviorSubject
async pipe
null/default state
Service requirements

Create TaskStateService.

It should own the task list and selected task.

private tasksSubject = new BehaviorSubject<Task[]>(INITIAL_TASKS);
tasks$ = this.tasksSubject.asObservable();

private selectedTaskSubject = new BehaviorSubject<Task | null>(null);
selectedTask$ = this.selectedTaskSubject.asObservable();

Methods:

selectTask(task: Task): void

moveTask(taskId: number, newStatus: Task['status']): void

addTask(task: Task): void

updateTask(updatedTask: Task): void

The important part: components should not mutate the task array directly. They should call service methods.

RxJS practice goals

In TaskBoardComponent, create filter streams:

private searchTerm$ = new BehaviorSubject<string>('');
private priorityFilter$ = new BehaviorSubject<string>('all');

Then derive filtered tasks:

filteredTasks$ = combineLatest([
  this.taskState.tasks$,
  this.searchTerm$,
  this.priorityFilter$
]).pipe(
  map(([tasks, searchTerm, priority]) => {
    // return filtered tasks
  })
);

Then derive tasks by status:

backlogTasks$ = this.filteredTasks$.pipe(
  map(tasks => tasks.filter(task => task.status === 'backlog'))
);

Repeat for:

inProgressTasks$
reviewTasks$
doneTasks$

This reinforces a very important RxJS idea:

One source stream can produce multiple derived streams.

Interview concepts this app teaches

By the end, you should be able to say:

“I built a small Angular task board using RxJS-based state management. The service owns the task list in a private BehaviorSubject and exposes it as a public Observable. The board component combines the task stream with search and priority filter streams using combineLatest, then derives filtered task lists for each status column. Child components use @Input() and @Output() for direct parent-child communication, while unrelated components communicate through the shared service.”

That is a strong Angular/RxJS explanation.

What this app reinforces better than the first one

Your first app taught:

search/filter streams
service calls
selected customer state
async pipe

This second app teaches:

state updates
derived streams
parent-child communication
component composition
shared service state
immutable updates

That is perfect for locking in Angular fundamentals.

First step

Start with this prompt to yourself:

“Create an Angular standalone app called task-workflow-board. Build a task board with four columns: Backlog, In Progress, Review, and Done. Store tasks in a shared TaskStateService using a private BehaviorSubject. Expose tasks$ and selectedTask$ as public Observables. The board should filter tasks by search term and priority using combineLatest and map. Columns and cards should use @Input() and @Output() for parent-child communication.”

That’s the right next mini app.
