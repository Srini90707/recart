import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import Typography from '../../constants/Typography';
import Spacing from '../../constants/Spacing';
import Shadows from '../../constants/Shadows';

export default StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: Spacing.md,
    flex: 1,
    marginHorizontal: Spacing.xs,
    ...Shadows.small,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 140,
    backgroundColor: Colors.background,
  },
  favoriteBtn: {
    position: 'absolute',
    top: Spacing.xs,
    right: Spacing.xs,
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 6,
    ...Shadows.small,
  },
  infoContainer: {
    padding: Spacing.md,
  },
  price: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.text,
    marginBottom: 4,
  },
  title: {
    fontSize: Typography.sizes.sm,
    color: Colors.text,
    fontWeight: Typography.weights.medium,
    marginBottom: 8,
  },
  conditionBadge: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  conditionText: {
    fontSize: 10,
    color: Colors.primaryDark,
    fontWeight: Typography.weights.bold,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: Typography.sizes.xs,
    color: Colors.textSecondary,
  },
});
