import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../constants/Colors';
import Spacing from '../constants/Spacing';
import Typography from '../constants/Typography';
import Shadows from '../constants/Shadows';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.sm,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  logoText: {
    fontSize: Typography.sizes.xl,
    fontWeight: '800',
    color: '#1A2B4C',
    marginLeft: 4,
    letterSpacing: -0.5,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    marginLeft: 2,
    fontWeight: '500',
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.sm,
  },
  toggleContainer: {
    flexDirection: 'row',
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 16,
  },
  toggleButtonActive: {
    backgroundColor: Colors.surface,
    ...Shadows.sm,
  },
  toggleText: {
    fontSize: Typography.sizes.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  toggleTextActive: {
    color: Colors.primary,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.md,
    marginBottom: Spacing.md,
  },
  categoryItem: {
    width: (width - Spacing.lg * 2 - Spacing.md * 2) / 3, // 3 columns
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  categoryIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFF7F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xs,
    borderWidth: 1,
    borderColor: '#FFE3D3',
  },
  categoryText: {
    fontSize: Typography.sizes.xs,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
  },
  promoBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF7F2',
    marginHorizontal: Spacing.lg,
    padding: Spacing.lg,
    borderRadius: 16,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: '#FFE3D3',
  },
  promoTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: '800',
    color: '#1A2B4C',
  },
  promoSubtitle: {
    fontSize: Typography.sizes.xs,
    color: Colors.textSecondary,
    marginTop: 4,
    fontWeight: '500',
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  sectionTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: '700',
    color: '#1A2B4C',
  },
  seeAll: {
    fontSize: Typography.sizes.sm,
    fontWeight: '600',
    color: Colors.primary,
  },
  horizontalList: {
    paddingLeft: Spacing.lg,
    paddingRight: Spacing.lg,
  },
  horizontalItem: {
    width: width * 0.4,
    marginRight: Spacing.md,
  },
  listContent: {
    paddingBottom: Spacing.xxl,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
});
