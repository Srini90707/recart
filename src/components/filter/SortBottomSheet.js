import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SORT_OPTIONS } from '../../data/categoryData';

export default function SortBottomSheet({
  visible,
  onClose,
  selectedSort,
  onSelectSort,
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.sheetContainer}>
              {/* Drag Handle */}
              <View style={styles.handleContainer}>
                <View style={styles.dragHandle} />
              </View>

              {/* Header */}
              <View style={styles.header}>
                <Text style={styles.title}>Sort By</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                  <Ionicons name="close" size={20} color="#475569" />
                </TouchableOpacity>
              </View>

              {/* Options */}
              <View style={styles.optionsList}>
                {SORT_OPTIONS.map((item) => {
                  const isSelected = selectedSort === item.id;
                  return (
                    <TouchableOpacity
                      key={item.id}
                      style={[
                        styles.optionItem,
                        isSelected && styles.optionItemActive,
                      ]}
                      onPress={() => {
                        onSelectSort(item.id);
                        onClose();
                      }}
                      activeOpacity={0.7}
                    >
                      <View style={styles.optionLeft}>
                        <View
                          style={[
                            styles.iconWrapper,
                            isSelected && styles.iconWrapperActive,
                          ]}
                        >
                          <Ionicons
                            name={item.icon}
                            size={18}
                            color={isSelected ? '#FF6B1A' : '#64748B'}
                          />
                        </View>
                        <Text
                          style={[
                            styles.optionLabel,
                            isSelected && styles.optionLabelActive,
                          ]}
                        >
                          {item.label}
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.radioCircle,
                          isSelected && styles.radioCircleActive,
                        ]}
                      >
                        {isSelected && <View style={styles.radioDot} />}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 20,
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  dragHandle: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#CBD5E1',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  closeBtn: {
    padding: 4,
    backgroundColor: '#F1F5F9',
    borderRadius: 20,
  },
  optionsList: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginVertical: 2,
  },
  optionItemActive: {
    backgroundColor: '#FFF7ED',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconWrapperActive: {
    backgroundColor: '#FFEDD5',
  },
  optionLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#334155',
  },
  optionLabelActive: {
    color: '#FF6B1A',
    fontWeight: '700',
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleActive: {
    borderColor: '#FF6B1A',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF6B1A',
  },
});
