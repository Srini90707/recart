import { StyleSheet, Dimensions } from 'react-native';
import Shadows from '../../constants/Shadows';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 42) / 2;

export default StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 10,
    width: CARD_WIDTH,
    maxWidth: CARD_WIDTH,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    ...Shadows.small,
  },
  imageContainer: {
    position: 'relative',
    backgroundColor: '#F8FAFC',
  },
  image: {
    width: '100%',
    height: 116,
    backgroundColor: '#F1F5F9',
  },
  favoriteBtn: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderRadius: 16,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 3,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    backgroundColor: 'rgba(16, 185, 129, 0.92)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 1.5,
    borderRadius: 5,
  },
  verifiedText: {
    color: '#FFFFFF',
    fontSize: 8.5,
    fontWeight: '700',
    marginLeft: 3,
  },
  infoContainer: {
    padding: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  price: {
    fontSize: 14.5,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  rentalPeriodText: {
    fontSize: 9.5,
    fontWeight: '600',
    color: '#64748B',
  },

  conditionBadge: {
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 5,
    paddingVertical: 1.5,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#FFEDD5',
  },
  conditionText: {
    fontSize: 8.5,
    color: '#FF6B1A',
    fontWeight: '700',
  },
  title: {
    fontSize: 12,
    color: '#334155',
    fontWeight: '600',
    lineHeight: 16,
    marginBottom: 5,
    minHeight: 32,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 3,
    borderTopWidth: 1,
    borderTopColor: '#F8FAFC',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 4,
  },
  location: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '500',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postedTime: {
    fontSize: 9.5,
    color: '#94A3B8',
    fontWeight: '500',
  },
});
