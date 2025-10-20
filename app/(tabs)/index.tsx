import { AddTask } from '@/components/task/AddTask';
import { SearchBar } from '@/components/task/SearchBar';
import { SortButton } from '@/components/task/SortButton';
import { StatusFilter } from '@/components/task/StatusFilter';
import { TaskForm } from '@/components/task/TaskForm';
import { TaskList } from '@/components/task/TaskList';
import initialTasks from '@/data/initialTasks.json';
import { Task } from '@/types/task';
import { filterTasks } from '@/utils/taskUtils';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  // Local state management
  const [tasks, setTasks] = useState<Task[]>(initialTasks as Task[]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'todo' | 'completed' | 'deleted'>('all');
  const [sortBy, setSortBy] = useState<'createdAt' | 'deadline' | 'priority' | 'title'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleStatusFilterChange = (status: 'all' | 'todo' | 'completed' | 'deleted') => {
    setStatusFilter(status);
  };

  const handleSortChange = (newSortBy: 'createdAt' | 'deadline' | 'priority' | 'title', newSortOrder: 'asc' | 'desc') => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  const handleEditTask = (task: Task) => {
    setTaskToEdit(task);
    setShowTaskForm(true);
  };

  const handleCloseTaskForm = () => {
    setShowTaskForm(false);
    setTaskToEdit(null);
  };

  const handleAddTask = () => {
    setTaskToEdit(null);
    setShowTaskForm(true);
  };

  // Task management functions
  const handleAddNewTask = (taskData: {
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    label: string;
    deadline: string;
    completed: boolean;
  }) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority,
      label: taskData.label,
      deadline: taskData.deadline,
      completed: taskData.completed,
      createdAt: new Date().toISOString(),
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const handleEditExistingTask = (taskData: {
    id: string;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    label: string;
    deadline: string;
    completed: boolean;
  }) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskData.id 
          ? { ...task, ...taskData }
          : task
      )
    );
  };

  // Toggle task completion status
  const handleToggleTask = (taskId: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // Delete task
  const handleDeleteTask = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  // Platform-specific bottom padding for absolute positioning
  const getBottomPadding = () => {
    if (Platform.OS === 'ios') {
      return 50; // Closer to tab bar on iOS
    }
    return 40; // Closer to tab bar on Android
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('@/assets/images/logo.svg')} 
          style={styles.logo}
          contentFit="contain"
        />
      </View>
      
      <SearchBar onSearch={handleSearch} />
      
      <View style={styles.taskCountContainer}>
        <Text style={styles.taskCount}>
          {(() => {
            const filteredTasks = filterTasks(tasks, searchQuery, 'all', statusFilter, sortBy, sortOrder);
            return `${filteredTasks.length} ${filteredTasks.length === 1 ? 'task' : 'tasks'} found`;
          })()}
        </Text>
        <View style={styles.filtersContainer}>
          <StatusFilter 
            onFilterChange={handleStatusFilterChange} 
            currentFilter={statusFilter} 
          />
          <SortButton 
            onSortChange={handleSortChange} 
            currentSortBy={sortBy}
            currentSortOrder={sortOrder}
          />
        </View>
      </View>
      
      <View style={styles.listContainer}>
        <TaskList 
          tasks={tasks} 
          searchQuery={searchQuery} 
          priorityFilter={'all'} 
          statusFilter={statusFilter}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onEditTask={handleEditTask}
          onToggleTask={handleToggleTask}
          onDeleteTask={handleDeleteTask}
        />
      </View>
      
      <View style={[styles.fabContainer, { bottom: getBottomPadding() }]}>
        <AddTask onPress={handleAddTask} />
      </View>

      <TaskForm 
        visible={showTaskForm} 
        onClose={handleCloseTaskForm}
        taskToEdit={taskToEdit}
        onAddTask={handleAddNewTask}
        onEditTask={handleEditExistingTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    paddingTop: 30,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  logo: {
    width: 166,
    height: 28,
  },
  taskCountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  taskCount: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  filtersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listContainer: {
    flex: 1,
  },
  fabContainer: {
    position: 'absolute',
    right: 20,
    bottom: 0,
  },
});
