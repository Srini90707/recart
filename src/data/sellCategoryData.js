export const SELL_CATEGORIES = [
  {
    id: 'electronics',
    name: 'Electronics',
    icon: 'laptop-outline',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&auto=format&fit=crop&q=80',
    color: '#4F46E5',
    bgColor: '#EEF2FF',
    tagline: 'Phones, Laptops, TVs & Gadgets',
    subcategories: [
      { id: 'mobiles', name: 'Smartphones & Mobiles', icon: 'phone-portrait-outline', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&auto=format&fit=crop&q=80' },
      { id: 'laptops', name: 'Laptops & Computers', icon: 'laptop-outline', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&auto=format&fit=crop&q=80' },
      { id: 'tablets', name: 'Tablets & iPads', icon: 'tablet-portrait-outline', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&auto=format&fit=crop&q=80' },
      { id: 'tvs', name: 'TVs & Entertainment', icon: 'tv-outline', image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&auto=format&fit=crop&q=80' },
      { id: 'audio', name: 'Headphones & Speakers', icon: 'headset-outline', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80' },
      { id: 'cameras', name: 'Cameras & Photography', icon: 'camera-outline', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&auto=format&fit=crop&q=80' },
      { id: 'wearables', name: 'Smart Watches & Bands', icon: 'watch-outline', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop&q=80' },
      { id: 'gaming', name: 'Gaming Consoles & Gear', icon: 'game-controller-outline', image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&auto=format&fit=crop&q=80' },
    ],
  },
  {
    id: 'fashion',
    name: 'Clothing',
    icon: 'shirt-outline',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=300&auto=format&fit=crop&q=80',
    color: '#E11D48',
    bgColor: '#FFF1F2',
    tagline: 'Men, Women, Shoes & Bags',
    subcategories: [
      { id: 'men_fashion', name: 'Men Clothing', icon: 'shirt-outline', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&auto=format&fit=crop&q=80' },
      { id: 'women_fashion', name: 'Women Clothing', icon: 'woman-outline', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&auto=format&fit=crop&q=80' },
      { id: 'footwear', name: 'Footwear & Shoes', icon: 'footsteps-outline', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=80' },
      { id: 'bags_accessories', name: 'Watches, Bags & Wallets', icon: 'bag-handle-outline', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&auto=format&fit=crop&q=80' },
    ],
  },
  {
    id: 'furniture',
    name: 'Home',
    icon: 'home-outline',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&auto=format&fit=crop&q=80',
    color: '#059669',
    bgColor: '#ECFDF5',
    tagline: 'Sofas, Beds, Tables & Decor',
    subcategories: [
      { id: 'sofas', name: 'Sofas & Living Room', icon: 'bed-outline', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&auto=format&fit=crop&q=80' },
      { id: 'beds', name: 'Beds & Wardrobes', icon: 'bed-outline', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&auto=format&fit=crop&q=80' },
      { id: 'dining', name: 'Dining Tables & Kitchen', icon: 'restaurant-outline', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400&auto=format&fit=crop&q=80' },
      { id: 'office_furniture', name: 'Office & Study Desks', icon: 'desktop-outline', image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&auto=format&fit=crop&q=80' },
      { id: 'decor', name: 'Home Decor & Lighting', icon: 'flower-outline', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&auto=format&fit=crop&q=80' },
    ],
  },
  {
    id: 'sports',
    name: 'Sports',
    icon: 'football-outline',
    image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=300&auto=format&fit=crop&q=80',
    color: '#D97706',
    bgColor: '#FFFBEB',
    tagline: 'Gym, Cricket, Badminton & Cycles',
    subcategories: [
      { id: 'gym', name: 'Gym & Fitness Equipment', icon: 'barbell-outline', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&auto=format&fit=crop&q=80' },
      { id: 'outdoor_sports', name: 'Cricket & Football', icon: 'football-outline', image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&auto=format&fit=crop&q=80' },
      { id: 'racquet', name: 'Badminton & Tennis', icon: 'tennisball-outline', image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&auto=format&fit=crop&q=80' },
      { id: 'cycles', name: 'Sports Cycles & Skates', icon: 'bicycle-outline', image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&auto=format&fit=crop&q=80' },
    ],
  },
  {
    id: 'vehicles',
    name: 'Vehicles',
    icon: 'car-sport-outline',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=300&auto=format&fit=crop&q=80',
    color: '#0284C7',
    bgColor: '#E0F2FE',
    tagline: 'Cars, Bikes, Scooters & Bicycles',
    subcategories: [
      { id: 'cars', name: 'Cars', icon: 'car-sport-outline', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&auto=format&fit=crop&q=80' },
      { id: 'bikes', name: 'Bikes & Scooters', icon: 'bicycle-outline', image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=400&auto=format&fit=crop&q=80' },
      { id: 'bicycles', name: 'Bicycles', icon: 'bicycle-outline', image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&auto=format&fit=crop&q=80' },
      { id: 'commercial', name: 'Commercial Vehicles', icon: 'bus-outline', image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&auto=format&fit=crop&q=80' },
      { id: 'spare_parts', name: 'Spare Parts & Accessories', icon: 'construct-outline', image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=400&auto=format&fit=crop&q=80' },
    ],
  },
  {
    id: 'music',
    name: 'Music',
    icon: 'musical-notes-outline',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80',
    color: '#9333EA',
    bgColor: '#FAF5FF',
    tagline: 'Guitars, Keyboards, Drums & Audio',
    subcategories: [
      { id: 'guitars', name: 'Guitars & Ukuleles', icon: 'musical-notes-outline', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop&q=80' },
      { id: 'keyboards', name: 'Keyboards & Synthesizers', icon: 'musical-notes-sharp', image: 'https://images.unsplash.com/photo-1520523839898-507127042a98?w=400&auto=format&fit=crop&q=80' },
      { id: 'drums', name: 'Drums & Percussion', icon: 'disc-outline', image: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=400&auto=format&fit=crop&q=80' },
      { id: 'audio_gear', name: 'Studio & Microphones', icon: 'mic-outline', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&auto=format&fit=crop&q=80' },
    ],
  },
  {
    id: 'toys',
    name: 'Toys',
    icon: 'game-controller-outline',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=300&auto=format&fit=crop&q=80',
    color: '#7C3AED',
    bgColor: '#F3E8FF',
    tagline: 'Consoles, LEGO, Figures & Games',
    subcategories: [
      { id: 'consoles', name: 'Video Games & Consoles', icon: 'game-controller-outline', image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&auto=format&fit=crop&q=80' },
      { id: 'lego', name: 'Action Figures & LEGO', icon: 'cube-outline', image: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=400&auto=format&fit=crop&q=80' },
      { id: 'board_games', name: 'Board Games & Puzzles', icon: 'grid-outline', image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=400&auto=format&fit=crop&q=80' },
      { id: 'rc_toys', name: 'RC & Remote Drones', icon: 'car-outline', image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=400&auto=format&fit=crop&q=80' },
    ],
  },
  {
    id: 'services',
    name: 'Services',
    icon: 'construct-outline',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&auto=format&fit=crop&q=80',
    color: '#EA580C',
    bgColor: '#FFF7ED',
    tagline: 'Repair, Cleaning, Shifting & Mechanics',
    subcategories: [
      { id: 'appliance_repair', name: 'Appliance Repair', icon: 'snow-outline', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&auto=format&fit=crop&q=80' },
      { id: 'home_cleaning', name: 'Home Cleaning', icon: 'sparkles-outline', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&auto=format&fit=crop&q=80' },
      { id: 'gadget_repair', name: 'Gadget & Mobile Repair', icon: 'phone-portrait-outline', image: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?w=400&auto=format&fit=crop&q=80' },
      { id: 'packers_movers', name: 'Packers & Movers', icon: 'cube-outline', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&auto=format&fit=crop&q=80' },
      { id: 'bike_service', name: 'Doorstep Bike Service', icon: 'bicycle-outline', image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=400&auto=format&fit=crop&q=80' },
    ],
  },
];

export const FUEL_TYPES = ['Petrol', 'Diesel', 'CNG', 'Electric', 'Hybrid'];
export const TRANSMISSION_TYPES = ['Manual', 'Automatic'];
export const OWNER_TYPES = ['1st Owner', '2nd Owner', '3rd Owner', '4th+'];
export const CONDITION_OPTIONS = ['Brand New', 'Like New', 'Good', 'Fair'];

export const CAR_BRANDS = ['Maruti Suzuki', 'Hyundai', 'Tata', 'Honda', 'Mahindra', 'Toyota', 'Kia', 'Volkswagen', 'Ford', 'Skoda', 'Renault', 'Other'];
export const BIKE_BRANDS = ['Royal Enfield', 'Honda', 'Yamaha', 'Hero', 'TVS', 'KTM', 'Bajaj', 'Suzuki', 'Kawasaki', 'Other'];
export const MOBILE_BRANDS = ['Apple', 'Samsung', 'OnePlus', 'Xiaomi', 'Vivo', 'Realme', 'Google', 'Oppo', 'Motorola', 'Other'];
export const LAPTOP_BRANDS = ['Apple', 'Dell', 'HP', 'Lenovo', 'Asus', 'Acer', 'MSI', 'Samsung', 'Other'];
export const STORAGE_OPTIONS = ['64 GB', '128 GB', '256 GB', '512 GB', '1 TB'];
export const RAM_OPTIONS = ['4 GB', '6 GB', '8 GB', '16 GB', '32 GB+'];
export const CLOTHING_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size'];
export const GENDER_OPTIONS = ['Men', 'Women', 'Kids', 'Unisex'];

// Electronics Extras
export const TV_BRANDS = ['Samsung', 'LG', 'Sony', 'Mi', 'OnePlus', 'TCL', 'Vu', 'Other'];
export const TV_SIZES = ['32 Inch', '43 Inch', '50 Inch', '55 Inch', '65+ Inch'];
export const TV_RESOLUTIONS = ['4K Ultra HD', 'Full HD 1080p', 'OLED / QLED', 'HD Ready'];

export const AUDIO_TYPES = ['TWS Earbuds', 'Over-Ear Headphones', 'Bluetooth Speaker', 'Soundbar'];
export const AUDIO_BRANDS = ['Sony', 'Bose', 'JBL', 'boAt', 'Apple / Beats', 'Sennheiser', 'Marshall', 'Other'];

export const CAMERA_TYPES = ['DSLR', 'Mirrorless', 'Action Cam (GoPro)', 'Camera Lens', 'Point & Shoot'];
export const CAMERA_BRANDS = ['Sony', 'Canon', 'Nikon', 'Fujifilm', 'GoPro', 'Panasonic', 'Other'];

export const WEARABLE_BRANDS = ['Apple Watch', 'Samsung Galaxy', 'Garmin', 'Fitbit', 'Noise', 'boAt', 'Amazfit', 'Other'];

// Vehicles Extras
export const BIKE_CC_OPTIONS = ['100 - 125 cc', '150 - 200 cc', '250 - 400 cc', '500 cc+', 'Electric (EV)'];
export const BICYCLE_TYPES = ['Geared (Shimano)', 'Single Speed', 'MTB (Mountain)', 'Hybrid', 'Road Bike', 'Electric'];
export const BICYCLE_BRANDS = ['Hero', 'Firefox', 'Btwin / Decathlon', 'Hercules', 'Trek', 'Montra', 'Other'];

// Fashion Extras
export const FOOTWEAR_SIZES = ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11', 'UK 12'];
export const FOOTWEAR_TYPES = ['Sneakers / Casual', 'Sports / Running', 'Formal Shoes', 'Boots', 'Sandals / Slides'];
export const FOOTWEAR_BRANDS = ['Nike', 'Adidas', 'Puma', 'Jordan', 'New Balance', 'Crocs', 'Woodland', 'Other'];
export const ACCESSORY_TYPES = ['Luxury Watch', 'Smart Watch', 'Handbag', 'Backpack', 'Wallet', 'Sunglasses'];

// Furniture Extras
export const FURNITURE_MATERIALS = ['Solid Sheesham', 'Teak Wood', 'Engineered Wood', 'Metal', 'Fabric / Upholstery', 'Leatherette'];
export const SOFA_TYPES = ['1 Seater', '2 Seater', '3 Seater', '3+2 Set', 'L-Shape Sectional', 'Recliner'];
export const BED_SIZES = ['King Size', 'Queen Size', 'Single Bed', 'Double Bed', 'Bunk Bed'];
export const BED_STORAGE = ['Hydraulic Storage', 'Box Storage', 'Drawer Storage', 'No Storage'];

// Sports Extras
export const SPORTS_EQUIPMENT_TYPES = ['Dumbbells / Weights', 'Bench Press', 'Treadmill / Cardio', 'Exercise Spin Bike', 'Home Gym Multi'];
export const SPORTS_BRANDS = ['Decathlon / Domyos', 'Yonex', 'Cosco', 'Nivia', 'Kobo', 'SG / SS', 'Other'];
export const RACQUET_SPORTS = ['Badminton', 'Lawn Tennis', 'Table Tennis', 'Squash'];

// Music Extras
export const MUSIC_INSTRUMENT_TYPES = ['Acoustic Guitar', 'Electric Guitar', 'Keyboard / Synth', 'Digital Piano', 'Drums / Cajon', 'Ukulele'];
export const MUSIC_BRANDS = ['Yamaha', 'Fender', 'Gibson', 'Casio', 'Roland', 'Ibanez', 'Cort', 'Other'];

// Toys & Gaming Extras
export const GAMING_PLATFORMS = ['PlayStation 5', 'PlayStation 4', 'Xbox Series X/S', 'Nintendo Switch', 'Gaming PC / Rig'];
export const TOY_TYPES = ['Action Figures / Anime', 'LEGO & Building Sets', 'Board Games & Puzzles', 'RC Drones & Cars'];

// Services Extras
export const SERVICE_PACKAGES = ['Inspection & Diagnosis', 'Complete Repair', 'Deep Servicing', 'Installation'];
export const SERVICE_WARRANTY = ['30 Days Warranty', '90 Days Warranty', '6 Months Warranty', 'Standard Service'];

// General Highlights / Badges
export const QUICK_HIGHLIGHTS = [
  'Bill Available',
  'Original Box',
  'Under Warranty',
  'Price Negotiable',
  'Scratchless Condition',
  'Original Accessories',
];

