export interface Task {
    id: number;
    title: string;
    description: string;
    assignee: string;
    priority: 'low' | 'medium' | 'high';
    status: 'backlog' | 'in-progress' | 'review' | 'done';
}