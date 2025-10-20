import { Task } from '@/types/task';

export const filterTasks = (
  tasks: Task[], 
  searchQuery: string, 
  priorityFilter: 'all' | 'low' | 'medium' | 'high',
  statusFilter: 'all' | 'todo' | 'completed' | 'deleted',
  sortBy: 'createdAt' | 'deadline' | 'priority' | 'title',
  sortOrder: 'asc' | 'desc'
): Task[] => {
  let filteredTasks = tasks;

  // Filter by status first
  if (statusFilter !== 'all') {
    switch (statusFilter) {
      case 'todo':
        filteredTasks = filteredTasks.filter(task => !task.completed);
        break;
      case 'completed':
        filteredTasks = filteredTasks.filter(task => task.completed);
        break;
      case 'deleted':
        // For now, we'll show all tasks since we don't have a deleted state
        // In a real app, you'd have a deleted flag or move tasks to a separate array
        filteredTasks = [];
        break;
    }
  }

  // Filter by priority
  if (priorityFilter !== 'all') {
    filteredTasks = filteredTasks.filter(task => task.priority === priorityFilter);
  }

  // Then filter by search query
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase().trim();
    filteredTasks = filteredTasks.filter(task => {
      const titleMatch = task.title.toLowerCase().includes(query);
      const descriptionMatch = task.description.toLowerCase().includes(query);
      const labelMatch = task.label.toLowerCase().includes(query);
      
      return titleMatch || descriptionMatch || labelMatch;
    });
  }

  // Finally sort the tasks (create a new array to avoid mutating the original)
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'createdAt':
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        break;
      case 'deadline':
        comparison = new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        break;
      case 'priority':
        const priorityOrder = { low: 1, medium: 2, high: 3 };
        comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
        break;
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  return sortedTasks;
};
