import { Task } from '@/types/task';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface TaskItemProps {
  task: Task;
  onEdit?: (task: Task) => void;
  onToggle?: (taskId: string) => void;
  onDelete?: (taskId: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onToggle, onDelete }) => {

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#FF5722';
      case 'medium': return '#FF9800';
      case 'low': return '#4CAF50';
      default: return '#2196F3';
    }
  };

  const handleToggle = () => {
    if (onToggle) {
      onToggle(task.id);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            if (onDelete) {
              onDelete(task.id);
            }
          }
        },
      ]
    );
  };

  // Edit task
  const handleTaskPress = () => {
    if (onEdit) {
      onEdit(task);
    }
  };

  return (
    <View style={[styles.container, task.completed && styles.completedContainer]}>
      <TouchableOpacity 
        style={styles.taskContent} 
        onPress={handleTaskPress}
        activeOpacity={0.7}
      >
        <Text style={[styles.title, task.completed && styles.completedText]}>
          {task.title}
        </Text>
        <Text style={[styles.description, task.completed && styles.completedText]}>
          {task.description}
        </Text>
        <View style={styles.taskMeta}>
          <View style={[styles.priorityContainer, { backgroundColor: getPriorityColor(task.priority) }]}>
            <Text style={styles.priorityText}>{task.priority.toUpperCase()}</Text>
          </View>
          {task.label && (
            <View style={styles.labelContainer}>
              <Text style={styles.labelText}>{task.label}</Text>
            </View>
          )}
          <View style={styles.deadlineContainer}>
            <Ionicons name="calendar-outline" size={12} color="#666" />
            <Text style={styles.deadlineText}>
              {new Date(task.deadline).toLocaleDateString()}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.completeButton]} 
          onPress={handleToggle}
          activeOpacity={0.7}
        >
          <Ionicons 
            name={task.completed ? 'checkmark-circle' : 'ellipse-outline'} 
            size={16} 
            color={task.completed ? '#4CAF50' : '#666'} 
          />
          <Text style={[styles.actionButtonText, { color: task.completed ? '#4CAF50' : '#666' }]}>
            {task.completed ? 'Completed' : 'Complete'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.deleteButton]} 
          onPress={handleDelete}
          activeOpacity={0.7}
        >
          <Ionicons name="trash-outline" size={16} color="#FF5722" />
          <Text style={[styles.actionButtonText, { color: '#FF5722' }]}>
            Delete
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  completedContainer: {
    backgroundColor: '#f5f5f5',
    opacity: 0.8,
  },
  taskContent: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  taskMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  labelContainer: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  labelText: {
    fontSize: 12,
    color: '#1976D2',
    fontWeight: '500',
  },
  priorityContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '600',
  },
  deadlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 4,
  },
  deadlineText: {
    fontSize: 10,
    color: '#666',
    marginLeft: 4,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'column',
    alignItems: 'stretch',
    width: 100,
    borderLeftWidth: 1,
    borderLeftColor: '#e0e0e0',
    marginRight: -16,
    marginTop: -16,
    marginBottom: -16,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    overflow: 'hidden',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 16,
    justifyContent: 'center',
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  completeButton: {
    backgroundColor: '#f0f8f0',
  },
  deleteButton: {
    backgroundColor: '#fff5f5',
    borderBottomWidth: 0,
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
});
