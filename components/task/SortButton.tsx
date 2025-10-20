import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SortButtonProps {
  onSortChange: (sortBy: 'createdAt' | 'deadline' | 'priority' | 'title', sortOrder: 'asc' | 'desc') => void;
  currentSortBy: 'createdAt' | 'deadline' | 'priority' | 'title';
  currentSortOrder: 'asc' | 'desc';
}

export const SortButton: React.FC<SortButtonProps> = ({ onSortChange, currentSortBy, currentSortOrder }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const sortOptions = [
    { key: 'createdAt', label: 'Created', icon: 'calendar' },
    { key: 'deadline', label: 'Deadline', icon: 'time' },
    { key: 'priority', label: 'Priority', icon: 'flag' },
    { key: 'title', label: 'Title', icon: 'text' },
  ] as const;

  const handleSortSelect = (sortBy: 'createdAt' | 'deadline' | 'priority' | 'title') => {
    let newSortOrder: 'asc' | 'desc' = 'desc';
    
    // If clicking the same sort field, toggle the order
    if (currentSortBy === sortBy) {
      newSortOrder = currentSortOrder === 'asc' ? 'desc' : 'asc';
    }
    
    onSortChange(sortBy, newSortOrder);
    setShowDropdown(false);
  };

  const getSortIcon = () => {
    const option = sortOptions.find(opt => opt.key === currentSortBy);
    return option?.icon || 'calendar';
  };

  const getSortLabel = () => {
    const option = sortOptions.find(opt => opt.key === currentSortBy);
    return option?.label || 'Date Created';
  };

  const getSortOrderIcon = () => {
    return currentSortOrder === 'asc' ? 'arrow-up' : 'arrow-down';
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.sortButton} 
        onPress={() => setShowDropdown(!showDropdown)}
        activeOpacity={0.7}
      >
        <Ionicons 
          name={getSortIcon()} 
          size={16} 
          color="#666" 
        />
        <Text style={styles.sortText}>
          {getSortLabel()}
        </Text>
        <Ionicons 
          name={getSortOrderIcon()} 
          size={14} 
          color="#666" 
        />
        <Ionicons 
          name={showDropdown ? 'chevron-up' : 'chevron-down'} 
          size={16} 
          color="#666" 
        />
      </TouchableOpacity>

      <Modal
        visible={showDropdown}
        transparent
        animationType="none"
        onRequestClose={() => setShowDropdown(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setShowDropdown(false)}
        >
          <View style={styles.dropdown}>
            {sortOptions.map((option) => (
              <TouchableOpacity
                key={option.key}
                style={[
                  styles.dropdownOption,
                  currentSortBy === option.key && styles.dropdownOptionSelected
                ]}
                onPress={() => handleSortSelect(option.key)}
              >
                <View style={styles.dropdownOptionContent}>
                  <Ionicons 
                    name={option.icon} 
                    size={16} 
                    color="#666" 
                  />
                  <Text style={[
                    styles.dropdownOptionText,
                    currentSortBy === option.key && styles.dropdownOptionTextSelected
                  ]}>
                    {option.label}
                  </Text>
                </View>
                {currentSortBy === option.key && (
                  <Ionicons 
                    name={getSortOrderIcon()} 
                    size={16} 
                    color="#2196F3" 
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginLeft: 8,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 100,
    justifyContent: 'space-between',
  },
  sortText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginHorizontal: 4,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 100,
    paddingRight: 20,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 8,
    minWidth: 140,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropdownOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownOptionSelected: {
    backgroundColor: '#E3F2FD',
  },
  dropdownOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownOptionText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },
  dropdownOptionTextSelected: {
    color: '#2196F3',
    fontWeight: '600',
  },
});

