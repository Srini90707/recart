import { StyleSheet, Dimensions } from 'react-native';
import Shadows from '../../constants/Shadows';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 42) / 2;

export default StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
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
    height: 140,
    backgroundColor: '#F1F5F9',
  },
  favoriteBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderRadius: 20,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 3,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(16, 185, 129, 0.92)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  verifiedText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
    marginLeft: 3,
  },
  infoContainer: {
    padding: 10,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  conditionBadge: {
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#FFEDD5',
  },
  conditionText: {
    fontSize: 9,
    color: '#FF6B1A',
    fontWeight: '700',
  },
  title: {
    fontSize: 13,
    color: '#334155',
    fontWeight: '600',
    lineHeight: 18,
    marginBottom: 8,
    minHeight: 36,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 4,
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
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postedTime: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '500',
  },
});
