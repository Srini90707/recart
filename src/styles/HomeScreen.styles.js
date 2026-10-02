import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import Spacing from '../constants/Spacing';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  /* ------------------------------------------------------------- */
  /* Top App Bar & Header                                          */
  /* ------------------------------------------------------------- */
  headerContainer: {
    backgroundColor: '#FFFFFF',
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    width: 34,
    height: 34,
    borderRadius: 8,
    marginRight: 8,
  },
  brandTextColumn: {
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.6,
  },
  logoSubtext: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.primary,
    letterSpacing: 0.3,
    marginTop: -2,
  },
  headerActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    position: 'relative',
  },
  notificationBadgeDot: {
    position: 'absolute',
    top: 8,
    right: 9,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },

  /* ------------------------------------------------------------- */
  /* VIP Promo Banner (Explore Card)                               */
  /* ------------------------------------------------------------- */
  promoBanner: {
    backgroundColor: '#FFF7F2',
    marginHorizontal: Spacing.lg,
    padding: 12,
    borderRadius: 16,
    marginTop: 8,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#FFE3D3',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  promoHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  promoLocationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFE3D3',
    gap: 4,
  },
  promoLocationLabel: {
    fontSize: 10.5,
    fontWeight: '600',
    color: '#64748B',
  },
  promoLocationText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#0F172A',
    maxWidth: 150,
  },
  promoLocationChange: {
    fontSize: 9.5,
    fontWeight: '700',
    color: Colors.primary,
    marginLeft: 2,
  },
  promoContentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  promoLeft: {
    flex: 1,
    paddingRight: 8,
  },
  promoTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#0F172A',
    lineHeight: 19,
  },
  promoTitleAccent: {
    fontSize: 15,
    fontWeight: '900',
    color: Colors.primary,
    lineHeight: 19,
    marginBottom: 2,
  },
  promoSubtitle: {
    fontSize: 10.5,
    color: '#64748B',
    lineHeight: 15,
    marginBottom: 8,
    fontWeight: '500',
  },
  promoCtaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#0F172A',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    gap: 4,
  },
  promoCtaText: {
    color: '#FFFFFF',
    fontSize: 10.5,
    fontWeight: '700',
  },
  promoRightGraphic: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  promoGlowCircle: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFE8DB',
  },
  promoIconPill: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFE3D3',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 2,
  },

  /* ------------------------------------------------------------- */
  /* Search Bar Placement Override                                 */
  /* ------------------------------------------------------------- */
  searchBarOverride: {
    marginHorizontal: Spacing.lg,
    marginTop: 0,
    marginBottom: 10,
  },

  /* ------------------------------------------------------------- */
  /* Categories Carousel                                           */
  /* ------------------------------------------------------------- */
  categoriesSection: {
    marginTop: 0,
    marginBottom: 12,
  },
  categoriesScrollList: {
    paddingLeft: Spacing.lg,
    paddingRight: 6,
  },
  categoryItem: {
    width: 72,
    alignItems: 'center',
    marginRight: 12,
  },
  categoryImageContainer: {
    width: 66,
    height: 66,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#FFFFFF',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 6,
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  categoryBadgeActive: {
    backgroundColor: '#0F172A',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
    textAlign: 'center',
  },
  categoryTextActive: {
    color: Colors.primary,
    fontWeight: '800',
  },

  /* ------------------------------------------------------------- */
  /* Sections & Headers                                            */
  /* ------------------------------------------------------------- */
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginBottom: 10,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  sectionBadge: {
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 6,
    borderWidth: 1,
    borderColor: '#FFEDD5',
  },
  sectionBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primary,
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  seeAllText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
  },
  horizontalList: {
    paddingLeft: Spacing.lg,
    paddingRight: 6,
  },
  horizontalItem: {
    width: 156,
    marginRight: 10,
  },

  /* Feed Grid */
  listContent: {
    paddingBottom: 130, // Generous bottom clearance above tab bar and floating + button
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    marginBottom: 10,
  },

  /* Empty State */
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: Spacing.xl,
  },
  emptyIconCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#FFF7F2',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFE3D3',
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 18,
  },
  emptyResetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 12,
    marginTop: 14,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  emptyResetBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});
