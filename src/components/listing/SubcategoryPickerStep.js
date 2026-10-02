import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

const { width } = Dimensions.get('window');
const CARD_GAP = 12;
const CONTAINER_PADDING = 16;
const CARD_WIDTH = (width - CONTAINER_PADDING * 2 - CARD_GAP) / 2;

export default function SubcategoryPickerStep({
  category,
  onBack,
  onSelectSubcategory,
}) {
  if (!category) return null;

  return (
    <View style={styles.container}>
      {/* Header Banner */}
      <View style={styles.bannerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={20} color="#0F172A" />
        </TouchableOpacity>

        <View style={[styles.categoryIconBadge, { backgroundColor: category.bgColor }]}>
          <Ionicons name={category.icon} size={22} color={category.color} />
        </View>

        <View style={styles.bannerInfo}>
          <View style={styles.stepIndicator}>
            <Text style={styles.stepText}>STEP 2 OF 3</Text>
          </View>
          <Text style={styles.categoryTitle}>{category.name}</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.subHeadingContainer}>
          <Text style={styles.instruction}>SELECT SUBCATEGORY</Text>
          <Text style={styles.hintText}>
            Choose specific category for {category.name.toLowerCase()}
          </Text>
        </View>

        {/* 2-Column Grid of Small Cards */}
        <View style={styles.gridContainer}>
          {category.subcategories.map((sub, idx) => (
            <TouchableOpacity
              key={sub.id || idx}
              style={styles.subCard}
              activeOpacity={0.75}
              onPress={() => onSelectSubcategory(sub)}
            >
              {sub.image ? (
                <View style={styles.imageWrapper}>
                  <Image source={{ uri: sub.image }} style={styles.thumbImage} />
                  <View style={styles.imageOverlay} />
                  <View style={[styles.miniBadge, { backgroundColor: category.bgColor }]}>
                    <Ionicons name={sub.icon || category.icon} size={14} color={category.color} />
                  </View>
                </View>
              ) : (
                <View style={[styles.iconBox, { backgroundColor: category.bgColor }]}>
                  <Ionicons name={sub.icon || category.icon} size={28} color={category.color} />
                </View>
              )}

              <View style={styles.cardFooter}>
                <Text style={styles.subcategoryName} numberOfLines={2}>
                  {sub.name}
                </Text>
                <View style={styles.arrowCircle}>
                  <Ionicons name="arrow-forward" size={12} color={Colors.primary} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  bannerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: CONTAINER_PADDING,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  categoryIconBadge: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  bannerInfo: {
    flex: 1,
  },
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 0.8,
  },
  categoryTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },
  scrollContent: {
    paddingHorizontal: CONTAINER_PADDING,
    paddingTop: 16,
    paddingBottom: 110,
  },
  subHeadingContainer: {
    marginBottom: 16,
  },
  instruction: {
    fontSize: 12,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 0.8,
    marginBottom: 3,
  },
  hintText: {
    fontSize: 13,
    color: '#64748B',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  subCard: {
    width: CARD_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: CARD_GAP,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  imageWrapper: {
    width: '100%',
    height: 90,
    position: 'relative',
    backgroundColor: '#E2E8F0',
  },
  thumbImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  miniBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    width: 26,
    height: 26,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBox: {
    width: '100%',
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  subcategoryName: {
    flex: 1,
    fontSize: 13.5,
    fontWeight: '700',
    color: '#1E293B',
    lineHeight: 18,
    marginRight: 6,
  },
  arrowCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FFF1E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
