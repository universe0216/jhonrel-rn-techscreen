export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  label: string;
  deadline: string; // Store as ISO string for serialization
  completed: boolean;
  createdAt: string; // Store as ISO string for serialization
}

export interface TasksState {
  tasks: Task[];
  searchQuery: string;
  priorityFilter: 'all' | 'low' | 'medium' | 'high';
  statusFilter: 'all' | 'todo' | 'completed' | 'deleted';
  sortBy: 'createdAt' | 'deadline' | 'priority' | 'title';
  sortOrder: 'asc' | 'desc';
}
