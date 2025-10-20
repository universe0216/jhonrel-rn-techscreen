import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface StatusFilterProps {
  onFilterChange: (status: 'all' | 'todo' | 'completed' | 'deleted') => void;
  currentFilter: 'all' | 'todo' | 'completed' | 'deleted';
}

export const StatusFilter: React.FC<StatusFilterProps> = ({ onFilterChange, currentFilter }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const filterOptions = [
    { key: 'all', label: 'All', icon: 'list', color: '#666' },
    { key: 'todo', label: 'In Complete', icon: 'play-circle', color: '#2196F3' },
    { key: 'completed', label: 'Completed', icon: 'checkmark-circle', color: '#4CAF50' },
    { key: 'deleted', label: 'Deleted', icon: 'trash', color: '#FF5722' },
  ] as const;

  const handleFilterSelect = (status: 'all' | 'todo' | 'completed' | 'deleted') => {
    onFilterChange(status);
    setShowDropdown(false);
  };

  const getFilterIcon = () => {
    const option = filterOptions.find(opt => opt.key === currentFilter);
    return option?.icon || 'list';
  };

  const getFilterColor = () => {
    const option = filterOptions.find(opt => opt.key === currentFilter);
    return option?.color || '#666';
  };

  const getCurrentLabel = () => {
    const option = filterOptions.find(opt => opt.key === currentFilter);
    return option?.label || 'All';
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.filterButton} 
        onPress={() => setShowDropdown(!showDropdown)}
        activeOpacity={0.7}
      >
        <Ionicons 
          name={getFilterIcon()} 
          size={16} 
          color={getFilterColor()} 
        />
        <Text style={[styles.filterText, { color: getFilterColor() }]}>
          {getCurrentLabel()}
        </Text>
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
            {filterOptions.map((option) => (
              <TouchableOpacity
                key={option.key}
                style={[
                  styles.dropdownOption,
                  currentFilter === option.key && styles.dropdownOptionSelected
                ]}
                onPress={() => handleFilterSelect(option.key)}
              >
                <View style={styles.dropdownOptionContent}>
                  <Ionicons 
                    name={option.icon} 
                    size={16} 
                    color={option.color} 
                  />
                  <Text style={[
                    styles.dropdownOptionText,
                    currentFilter === option.key && styles.dropdownOptionTextSelected
                  ]}>
                    {option.label}
                  </Text>
                </View>
                {currentFilter === option.key && (
                  <Ionicons name="checkmark" size={16} color="#2196F3" />
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
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 80,
    justifyContent: 'space-between',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
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
    minWidth: 120,
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
