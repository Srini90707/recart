export const MOCK_CATEGORIES = [
  { id: '1', name: 'Electronics', icon: 'laptop-outline' },
  { id: '2', name: 'Clothing', icon: 'shirt-outline' },
  { id: '3', name: 'Home', icon: 'home-outline' },
  { id: '4', name: 'Sports', icon: 'football-outline' },
  { id: '5', name: 'Toys', icon: 'game-controller-outline' },
];

export const MOCK_PRODUCTS = [
  {
    id: '1',
    title: 'Wireless Headphones',
    price: 99.99,
    image: 'https://via.placeholder.com/150',
    category: 'Electronics',
    seller: { name: 'Tech Store', rating: 4.8 },
    condition: 'New',
    location: 'New York, NY',
    isFavorite: false,
  },
  {
    id: '2',
    title: 'Running Shoes',
    price: 49.99,
    image: 'https://via.placeholder.com/150',
    category: 'Clothing',
    seller: { name: 'Sports Gear', rating: 4.5 },
    condition: 'Like New',
    location: 'Los Angeles, CA',
    isFavorite: true,
  },
  {
    id: '3',
    title: 'Coffee Maker',
    price: 29.99,
    image: 'https://via.placeholder.com/150',
    category: 'Home',
    seller: { name: 'Home Goods', rating: 4.2 },
    condition: 'Used',
    location: 'Chicago, IL',
    isFavorite: false,
  },
  {
    id: '4',
    title: 'Smart Watch',
    price: 199.99,
    image: 'https://via.placeholder.com/150',
    category: 'Electronics',
    seller: { name: 'Gadget Hub', rating: 4.9 },
    condition: 'New',
    location: 'Austin, TX',
    isFavorite: false,
  },
];

export const MOCK_USER = {
  id: 'u1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://via.placeholder.com/100',
  memberSince: '2022',
  listingsCount: 12,
  rating: 4.9,
};
