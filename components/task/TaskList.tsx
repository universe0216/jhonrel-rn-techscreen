import { Task } from '@/types/task';
import { filterTasks } from '@/utils/taskUtils';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  searchQuery: string;
  priorityFilter: 'all' | 'low' | 'medium' | 'high';
  statusFilter: 'all' | 'todo' | 'completed' | 'deleted';
  sortBy: 'createdAt' | 'deadline' | 'priority' | 'title';
  sortOrder: 'asc' | 'desc';
  onEditTask?: (task: Task) => void;
  onToggleTask?: (taskId: string) => void;
  onDeleteTask?: (taskId: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, searchQuery, priorityFilter, statusFilter, sortBy, sortOrder, onEditTask, onToggleTask, onDeleteTask }) => {
  const filteredTasks = filterTasks(tasks, searchQuery, priorityFilter, statusFilter, sortBy, sortOrder);

  const renderTask = ({ item }: { item: Task }) => (
    <TaskItem 
      task={item} 
      onEdit={onEditTask} 
      onToggle={onToggleTask}
      onDelete={onDeleteTask}
    />
  );

  const renderEmptyState = () => {
    if (searchQuery.trim()) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No tasks found</Text>
          <Text style={styles.emptySubtext}>
            Try searching with different keywords or check your spelling
          </Text>
        </View>
      );
    }
    
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No tasks yet</Text>
        <Text style={styles.emptySubtext}>Add a task to get started!</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={filteredTasks}
      renderItem={renderTask}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={renderEmptyState}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flexGrow: 1,
    paddingBottom: 100, 
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
  },
});
