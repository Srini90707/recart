import React, { useState, useContext } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TextInput,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import AppButton from '../common/AppButton';
import Colors from '../../constants/Colors';
import { LocationContext } from '../../context/LocationContext';
import {
  FUEL_TYPES,
  TRANSMISSION_TYPES,
  OWNER_TYPES,
  CONDITION_OPTIONS,
  CAR_BRANDS,
  BIKE_BRANDS,
  MOBILE_BRANDS,
  LAPTOP_BRANDS,
  STORAGE_OPTIONS,
  RAM_OPTIONS,
  CLOTHING_SIZES,
  GENDER_OPTIONS,
  TV_BRANDS,
  TV_SIZES,
  TV_RESOLUTIONS,
  AUDIO_TYPES,
  AUDIO_BRANDS,
  CAMERA_TYPES,
  CAMERA_BRANDS,
  WEARABLE_BRANDS,
  BIKE_CC_OPTIONS,
  BICYCLE_TYPES,
  BICYCLE_BRANDS,
  FOOTWEAR_SIZES,
  FOOTWEAR_TYPES,
  FOOTWEAR_BRANDS,
  ACCESSORY_TYPES,
  FURNITURE_MATERIALS,
  SOFA_TYPES,
  BED_SIZES,
  BED_STORAGE,
  SPORTS_EQUIPMENT_TYPES,
  SPORTS_BRANDS,
  RACQUET_SPORTS,
  MUSIC_INSTRUMENT_TYPES,
  MUSIC_BRANDS,
  GAMING_PLATFORMS,
  TOY_TYPES,
  SERVICE_PACKAGES,
  SERVICE_WARRANTY,
  QUICK_HIGHLIGHTS,
} from '../../data/sellCategoryData';

export default function ListingForm({
  category,
  subcategory,
  initialValues,
  onChangeCategory,
  onSubmit,
}) {
  const { currentLocation } = useContext(LocationContext);

  // Common Fields
  const [title, setTitle] = useState(initialValues?.title || '');
  const [price, setPrice] = useState(initialValues?.price?.toString() || '');
  const [description, setDescription] = useState(initialValues?.description || '');
  const [image, setImage] = useState(initialValues?.image || null);
  const [condition, setCondition] = useState(initialValues?.condition || 'Like New');
  const [location, setLocation] = useState(
    initialValues?.location || currentLocation?.formatted || 'Bengaluru, Karnataka'
  );
  const [highlights, setHighlights] = useState(initialValues?.highlights || ['Bill Available']);

  // Dynamic Category Specific Fields
  const [brand, setBrand] = useState(initialValues?.brand || '');
  const [model, setModel] = useState(initialValues?.model || '');
  const [year, setYear] = useState(initialValues?.year || '');
  const [kmDriven, setKmDriven] = useState(initialValues?.kmDriven || '');
  const [fuelType, setFuelType] = useState(initialValues?.fuelType || 'Petrol');
  const [transmission, setTransmission] = useState(initialValues?.transmission || 'Manual');
  const [owners, setOwners] = useState(initialValues?.owners || '1st Owner');
  const [engineCC, setEngineCC] = useState(initialValues?.engineCC || '150 - 200 cc');
  const [bicycleType, setBicycleType] = useState(initialValues?.bicycleType || 'Geared (Shimano)');
  const [storage, setStorage] = useState(initialValues?.storage || '128 GB');
  const [ram, setRam] = useState(initialValues?.ram || '8 GB');
  const [screenSize, setScreenSize] = useState(initialValues?.screenSize || '43 Inch');
  const [resolution, setResolution] = useState(initialValues?.resolution || '4K Ultra HD');
  const [isSmartTV, setIsSmartTV] = useState(initialValues?.isSmartTV !== undefined ? initialValues.isSmartTV : true);
  const [audioType, setAudioType] = useState(initialValues?.audioType || 'TWS Earbuds');
  const [hasANC, setHasANC] = useState(initialValues?.hasANC !== undefined ? initialValues.hasANC : true);
  const [cameraType, setCameraType] = useState(initialValues?.cameraType || 'Mirrorless');
  const [size, setSize] = useState(initialValues?.size || 'M');
  const [gender, setGender] = useState(initialValues?.gender || 'Men');
  const [shoeSize, setShoeSize] = useState(initialValues?.shoeSize || 'UK 8');
  const [footwearType, setFootwearType] = useState(initialValues?.footwearType || 'Sneakers / Casual');
  const [accessoryType, setAccessoryType] = useState(initialValues?.accessoryType || 'Luxury Watch');
  const [material, setMaterial] = useState(initialValues?.material || 'Solid Sheesham');
  const [sofaType, setSofaType] = useState(initialValues?.sofaType || '3 Seater');
  const [bedSize, setBedSize] = useState(initialValues?.bedSize || 'Queen Size');
  const [bedStorage, setBedStorage] = useState(initialValues?.bedStorage || 'Hydraulic Storage');
  const [sportsType, setSportsType] = useState(initialValues?.sportsType || 'Gym / Dumbbells');
  const [sportsBrand, setSportsBrand] = useState(initialValues?.sportsBrand || 'Decathlon / Domyos');
  const [racquetSport, setRacquetSport] = useState(initialValues?.racquetSport || 'Badminton');
  const [musicInstrument, setMusicInstrument] = useState(initialValues?.musicInstrument || 'Acoustic Guitar');
  const [musicBrand, setMusicBrand] = useState(initialValues?.musicBrand || 'Yamaha');
  const [hasMusicBag, setHasMusicBag] = useState(initialValues?.hasMusicBag !== undefined ? initialValues.hasMusicBag : true);
  const [gamingPlatform, setGamingPlatform] = useState(initialValues?.gamingPlatform || 'PlayStation 5');
  const [toyType, setToyType] = useState(initialValues?.toyType || 'Action Figures / Anime');
  const [servicePackage, setServicePackage] = useState(initialValues?.servicePackage || 'Complete Repair');
  const [serviceWarranty, setServiceWarranty] = useState(initialValues?.serviceWarranty || '30 Days Warranty');

  const [submitting, setSubmitting] = useState(false);

  // Category & Subcategory Detection
  const catId = category?.id || '';
  const subId = subcategory?.id || '';
  const categoryColor = category?.color || Colors.primary;
  const categoryBgColor = category?.bgColor || '#FFF1E8';

  const isCar = catId === 'vehicles' && subId === 'cars';
  const isBike = catId === 'vehicles' && (subId === 'bikes' || subId === 'scooters');
  const isBicycle = catId === 'vehicles' && subId === 'bicycles';
  const isCommercial = catId === 'vehicles' && subId === 'commercial';
  const isSpareParts = catId === 'vehicles' && subId === 'spare_parts';

  const isMobile = catId === 'electronics' && subId === 'mobiles';
  const isLaptop = catId === 'electronics' && subId === 'laptops';
  const isTablet = catId === 'electronics' && subId === 'tablets';
  const isTV = catId === 'electronics' && subId === 'tvs';
  const isAudio = catId === 'electronics' && subId === 'audio';
  const isCamera = catId === 'electronics' && subId === 'cameras';
  const isWearable = catId === 'electronics' && subId === 'wearables';
  const isGaming = (catId === 'electronics' && subId === 'gaming') || (catId === 'toys' && subId === 'consoles');

  const isClothing = catId === 'fashion' && (subId === 'men_fashion' || subId === 'women_fashion');
  const isFootwear = catId === 'fashion' && subId === 'footwear';
  const isAccessory = catId === 'fashion' && subId === 'bags_accessories';

  const isSofa = catId === 'furniture' && subId === 'sofas';
  const isBed = catId === 'furniture' && subId === 'beds';
  const isDining = catId === 'furniture' && subId === 'dining';
  const isOffice = catId === 'furniture' && subId === 'office_furniture';
  const isDecor = catId === 'furniture' && subId === 'decor';
  const isGenericFurniture = catId === 'furniture' && !isSofa && !isBed;

  const isGym = catId === 'sports' && subId === 'gym';
  const isOutdoorSports = catId === 'sports' && subId === 'outdoor_sports';
  const isRacquet = catId === 'sports' && subId === 'racquet';
  const isSportsCycle = catId === 'sports' && subId === 'cycles';

  const isMusicGuitar = catId === 'music' && subId === 'guitars';
  const isMusicKeyboard = catId === 'music' && subId === 'keyboards';
  const isMusicOther = catId === 'music' && !isMusicGuitar && !isMusicKeyboard;

  const isToysLego = catId === 'toys' && subId === 'lego';
  const isToysBoard = catId === 'toys' && subId === 'board_games';
  const isToysRC = catId === 'toys' && subId === 'rc_toys';

  const isService = catId === 'services';

  // Sample quick images based on subcategory for easy testing
  const samplePresets = [
    subcategory?.image,
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80',
  ].filter(Boolean);

  const toggleHighlight = (item) => {
    if (highlights.includes(item)) {
      setHighlights(highlights.filter((h) => h !== item));
    } else {
      setHighlights([...highlights, item]);
    }
  };

  const pickFromGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions?.Images || ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.85,
      });

      if (!result.canceled && result.assets?.[0]?.uri) {
        setImage(result.assets[0].uri);
      }
    } catch (e) {
      console.warn('Image picker error:', e);
      Alert.alert('Error', 'Could not open image gallery.');
    }
  };

  const takePhotoWithCamera = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Camera access is required to take photos.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.85,
      });

      if (!result.canceled && result.assets?.[0]?.uri) {
        setImage(result.assets[0].uri);
      }
    } catch (e) {
      console.warn('Camera error:', e);
      Alert.alert('Error', 'Could not open camera.');
    }
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert('Required field', 'Please enter a title for your listing.');
      return;
    }
    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      Alert.alert('Required field', 'Please enter a valid price in ₹.');
      return;
    }
    if (!image) {
      Alert.alert('Photo required', 'Please add at least one photo for your item.');
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        title: title.trim(),
        price: parseFloat(price),
        category: category?.name || 'General',
        subCategory: subcategory?.name || 'Other',
        description: description.trim() || 'No description provided.',
        image,
        condition,
        location: location.trim() || 'Bengaluru',
        brand: brand || sportsBrand || musicBrand || undefined,
        highlights,
        attributes: {
          ...(isCar && { brand, model, year, kmDriven, fuelType, transmission, owners }),
          ...(isBike && { brand, model, year, kmDriven, engineCC }),
          ...(isBicycle && { bicycleType, brand }),
          ...(isCommercial && { vehicleType: model, year, kmDriven, fuelType }),
          ...(isSpareParts && { partType: model, brand }),
          ...(isMobile && { brand, storage, ram }),
          ...(isLaptop && { brand, ram, storage }),
          ...(isTablet && { brand, storage }),
          ...(isTV && { brand, screenSize, resolution, isSmartTV }),
          ...(isAudio && { brand, audioType, hasANC }),
          ...(isCamera && { brand, cameraType }),
          ...(isWearable && { brand }),
          ...(isGaming && { gamingPlatform, storage }),
          ...(isClothing && { brand, size, gender }),
          ...(isFootwear && { brand, shoeSize, footwearType }),
          ...(isAccessory && { brand, accessoryType }),
          ...(isSofa && { sofaType, material }),
          ...(isBed && { bedSize, material, bedStorage }),
          ...(isDining && { material }),
          ...(isOffice && { material }),
          ...(isDecor && { material }),
          ...(isGenericFurniture && { material }),
          ...(isGym && { sportsType, sportsBrand }),
          ...(isOutdoorSports && { sportsBrand }),
          ...(isRacquet && { racquetSport, sportsBrand }),
          ...(isSportsCycle && { bicycleType, sportsBrand }),
          ...(isMusicGuitar && { musicInstrument, musicBrand, hasMusicBag }),
          ...(isMusicKeyboard && { musicInstrument, musicBrand }),
          ...(isMusicOther && { musicInstrument, musicBrand }),
          ...(isToysLego && { toyType }),
          ...(isToysBoard && { toyType }),
          ...(isToysRC && { toyType }),
          ...(isService && { servicePackage, serviceWarranty }),
        },
      };

      await onSubmit(payload);
    } catch (err) {
      console.error('[ListingForm] submit error:', err);
      Alert.alert('Error', 'Failed to publish listing. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Helper renderer for interactive chips
  const renderChips = (options, selectedValue, onSelect) => (
    <View style={styles.chipsRow}>
      {options.map((opt) => {
        const isSelected = selectedValue === opt;
        return (
          <TouchableOpacity
            key={opt}
            activeOpacity={0.7}
            style={[
              styles.chip,
              isSelected && [styles.chipActive, { borderColor: categoryColor, backgroundColor: categoryBgColor }],
            ]}
            onPress={() => onSelect(opt)}
          >
            {isSelected && (
              <Ionicons name="checkmark-circle" size={14} color={categoryColor} style={{ marginRight: 5 }} />
            )}
            <Text
              style={[
                styles.chipText,
                isSelected && [styles.chipTextActive, { color: categoryColor }],
              ]}
            >
              {opt}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  // Helper renderer for horizontal scrollable chips
  const renderHorizontalChips = (options, selectedValue, onSelect) => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalChips}>
      {options.map((opt) => {
        const isSelected = selectedValue === opt;
        return (
          <TouchableOpacity
            key={opt}
            activeOpacity={0.7}
            style={[
              styles.chip,
              isSelected && [styles.chipActive, { borderColor: categoryColor, backgroundColor: categoryBgColor }],
            ]}
            onPress={() => onSelect(opt)}
          >
            {isSelected && (
              <Ionicons name="checkmark-circle" size={14} color={categoryColor} style={{ marginRight: 5 }} />
            )}
            <Text
              style={[
                styles.chipText,
                isSelected && [styles.chipTextActive, { color: categoryColor }],
              ]}
            >
              {opt}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );

  // Dynamic placeholder for title based on selected category & subcategory
  const getTitlePlaceholder = () => {
    if (isCar) return 'e.g. 2022 Hyundai Creta SX (O) Automatic';
    if (isBike) return 'e.g. 2021 Royal Enfield Classic 350 Dual Channel';
    if (isBicycle) return 'e.g. Firefox Road Runner Pro 21 Speed';
    if (isMobile) return 'e.g. iPhone 15 Pro 128GB Natural Titanium';
    if (isLaptop) return 'e.g. MacBook Pro M2 16GB / 512GB SSD';
    if (isTV) return 'e.g. Sony Bravia 55 Inch 4K Google TV';
    if (isAudio) return 'e.g. Sony WH-1000XM5 Active Noise Cancelling';
    if (isCamera) return 'e.g. Sony Alpha A7 III with 28-70mm Kit Lens';
    if (isFootwear) return 'e.g. Nike Air Jordan 1 Retro High OG';
    if (isClothing) return "e.g. Levi's 511 Slim Fit Denim Jacket";
    if (isSofa) return 'e.g. Solid Sheesham 3+2 Luxury Sofa Set';
    if (isBed) return 'e.g. King Size Hydraulic Storage Teak Bed';
    if (isGym) return 'e.g. 20kg Hex Rubber Dumbbells Set with Stand';
    if (isMusicGuitar) return 'e.g. Yamaha F310 Acoustic Guitar with Padded Bag';
    if (isGaming) return 'e.g. Sony PlayStation 5 Disc Edition with 2 Controllers';
    if (isService) return 'e.g. Professional AC Deep Clean & Gas Refill';
    return `e.g. Brand & item name for ${subcategory?.name || 'listing'}`;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1, backgroundColor: '#F8FAFC' }}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* CATEGORY BANNER CARD */}
        <View style={styles.categoryCardHeader}>
          <View style={styles.categoryBadgeRow}>
            <View style={[styles.categoryIconCircle, { backgroundColor: categoryBgColor }]}>
              <Ionicons name={category?.icon || 'grid'} size={20} color={categoryColor} />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <View style={styles.stepProgressRow}>
                <Text style={[styles.stepBadgeText, { color: categoryColor }]}>STEP 2 OF 2</Text>
                <Text style={styles.stepDot}>•</Text>
                <Text style={styles.stepTitle}>Item Specifications</Text>
              </View>
              <Text style={styles.categoryBreadcrumbs} numberOfLines={1}>
                {category?.name} <Text style={{ color: '#CBD5E1' }}>›</Text> {subcategory?.name}
              </Text>
            </View>

            {onChangeCategory && (
              <TouchableOpacity onPress={onChangeCategory} style={styles.changeCategoryBtn} activeOpacity={0.7}>
                <Ionicons name="swap-horizontal" size={14} color={Colors.primary} style={{ marginRight: 4 }} />
                <Text style={styles.changeCategoryBtnText}>Change</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* 1. PHOTO UPLOAD SECTION */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <View style={[styles.sectionIconBadge, { backgroundColor: '#FFF1E8' }]}>
              <Ionicons name="camera-outline" size={18} color={Colors.primary} />
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.sectionTitle}>Product Photos *</Text>
              <Text style={styles.sectionSubtitle}>Photos with good lighting get 3x faster buyer replies</Text>
            </View>
          </View>

          {image ? (
            <View style={styles.previewContainer}>
              <Image source={{ uri: image }} style={styles.imagePreview} />
              
              <View style={styles.previewOverlayPill}>
                <Ionicons name="checkmark-circle" size={14} color="#10B981" style={{ marginRight: 4 }} />
                <Text style={styles.previewPillText}>Cover Photo Ready</Text>
              </View>

              <View style={styles.imageActionsRow}>
                <TouchableOpacity
                  style={styles.changePhotoBtn}
                  onPress={pickFromGallery}
                  activeOpacity={0.8}
                >
                  <Ionicons name="images-outline" size={14} color="#FFFFFF" style={{ marginRight: 5 }} />
                  <Text style={styles.changePhotoText}>Replace</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.removePhotoBtn}
                  onPress={() => setImage(null)}
                  activeOpacity={0.8}
                >
                  <Ionicons name="trash-outline" size={15} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View>
              <View style={styles.uploadDropzone}>
                <View style={styles.cameraIconRing}>
                  <Ionicons name="camera" size={32} color={Colors.primary} />
                </View>
                <Text style={styles.uploadMainText}>Add a clear photo of your item</Text>
                <Text style={styles.uploadSubText}>PNG, JPG or JPEG up to 10MB</Text>

                <View style={styles.uploadButtonsRow}>
                  <TouchableOpacity style={styles.primaryUploadBtn} onPress={takePhotoWithCamera} activeOpacity={0.8}>
                    <Ionicons name="camera" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
                    <Text style={styles.primaryUploadBtnText}>Take Photo</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.secondaryUploadBtn} onPress={pickFromGallery} activeOpacity={0.8}>
                    <Ionicons name="images" size={16} color={Colors.primary} style={{ marginRight: 6 }} />
                    <Text style={styles.secondaryUploadBtnText}>From Gallery</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Sample Photo Presets */}
              {samplePresets.length > 0 && (
                <View style={styles.samplePresetsBox}>
                  <Text style={styles.presetLabel}>Quick Demo Photos:</Text>
                  <View style={styles.presetThumbsRow}>
                    {samplePresets.map((uri, idx) => (
                      <TouchableOpacity
                        key={idx}
                        onPress={() => setImage(uri)}
                        style={styles.presetThumbnail}
                        activeOpacity={0.7}
                      >
                        <Image source={{ uri }} style={styles.presetImg} />
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
            </View>
          )}
        </View>

        {/* 2. CORE DETAILS: TITLE, PRICE, CONDITION */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <View style={[styles.sectionIconBadge, { backgroundColor: '#EEF2FF' }]}>
              <Ionicons name="pricetag-outline" size={18} color="#4F46E5" />
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.sectionTitle}>Basic Information</Text>
              <Text style={styles.sectionSubtitle}>Title, asking price, and item condition</Text>
            </View>
          </View>

          {/* Title Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.fieldLabel}>Listing Title *</Text>
            <View style={styles.textInputWrapper}>
              <TextInput
                style={styles.textInput}
                value={title}
                onChangeText={setTitle}
                placeholder={getTitlePlaceholder()}
                placeholderTextColor="#94A3B8"
              />
            </View>
          </View>

          {/* Expected Price */}
          <View style={styles.inputGroup}>
            <Text style={styles.fieldLabel}>Expected Price (₹) *</Text>
            <View style={styles.priceInputWrapper}>
              <View style={styles.currencyBadge}>
                <Text style={styles.currencySymbol}>₹</Text>
              </View>
              <TextInput
                style={styles.priceTextInput}
                value={price}
                onChangeText={setPrice}
                placeholder="e.g. 14999"
                placeholderTextColor="#94A3B8"
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Condition Pills */}
          <View style={styles.inputGroup}>
            <Text style={styles.fieldLabel}>Item Condition</Text>
            {renderChips(CONDITION_OPTIONS, condition, setCondition)}
          </View>
        </View>

        {/* 3. DYNAMIC CATEGORY-SPECIFIC SPECIFICATIONS */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <View style={[styles.sectionIconBadge, { backgroundColor: categoryBgColor }]}>
              <Ionicons name="options-outline" size={18} color={categoryColor} />
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.sectionTitle}>{category?.name || 'Item'} Specifications</Text>
              <Text style={styles.sectionSubtitle}>Detailed specs help buyers find your ad faster</Text>
            </View>
          </View>

          {/* CAR SPECIFICATIONS */}
          {isCar && (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Car Brand / Make</Text>
                {renderHorizontalChips(CAR_BRANDS, brand, setBrand)}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Model & Variant</Text>
                <View style={styles.textInputWrapper}>
                  <TextInput
                    style={styles.textInput}
                    value={model}
                    onChangeText={setModel}
                    placeholder="e.g. Creta SX (O) Automatic, Swift VXi"
                    placeholderTextColor="#94A3B8"
                  />
                </View>
              </View>

              <View style={styles.twoColRow}>
                <View style={{ flex: 1, marginRight: 8 }}>
                  <Text style={styles.fieldLabel}>Registration Year</Text>
                  <View style={styles.textInputWrapper}>
                    <TextInput
                      style={styles.textInput}
                      value={year}
                      onChangeText={setYear}
                      placeholder="e.g. 2021"
                      placeholderTextColor="#94A3B8"
                      keyboardType="numeric"
                    />
                  </View>
                </View>

                <View style={{ flex: 1, marginLeft: 8 }}>
                  <Text style={styles.fieldLabel}>KM Driven</Text>
                  <View style={styles.textInputWrapper}>
                    <TextInput
                      style={styles.textInput}
                      value={kmDriven}
                      onChangeText={setKmDriven}
                      placeholder="e.g. 35000"
                      placeholderTextColor="#94A3B8"
                      keyboardType="numeric"
                    />
                  </View>
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Fuel Type</Text>
                {renderChips(FUEL_TYPES, fuelType, setFuelType)}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Transmission</Text>
                {renderChips(TRANSMISSION_TYPES, transmission, setTransmission)}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Ownership History</Text>
                {renderChips(OWNER_TYPES, owners, setOwners)}
              </View>
            </>
          )}

          {/* BIKE / SCOOTER SPECIFICATIONS */}
          {isBike && (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Brand / Manufacturer</Text>
                {renderHorizontalChips(BIKE_BRANDS, brand, setBrand)}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Model Name</Text>
                <View style={styles.textInputWrapper}>
                  <TextInput
                    style={styles.textInput}
                    value={model}
                    onChangeText={setModel}
                    placeholder="e.g. Classic 350, Activa 6G, Duke 390"
                    placeholderTextColor="#94A3B8"
                  />
                </View>
              </View>

              <View style={styles.twoColRow}>
                <View style={{ flex: 1, marginRight: 8 }}>
                  <Text style={styles.fieldLabel}>Year</Text>
                  <View style={styles.textInputWrapper}>
                    <TextInput
                      style={styles.textInput}
                      value={year}
                      onChangeText={setYear}
                      placeholder="e.g. 2022"
                      placeholderTextColor="#94A3B8"
                      keyboardType="numeric"
                    />
                  </View>
                </View>
                <View style={{ flex: 1, marginLeft: 8 }}>
                  <Text style={styles.fieldLabel}>KM Driven</Text>
                  <View style={styles.textInputWrapper}>
                    <TextInput
                      style={styles.textInput}
                      value={kmDriven}
                      onChangeText={setKmDriven}
                      placeholder="e.g. 12000"
                      placeholderTextColor="#94A3B8"
                      keyboardType="numeric"
                    />
                  </View>
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Engine Displacement (CC)</Text>
                {renderChips(BIKE_CC_OPTIONS, engineCC, setEngineCC)}
              </View>
            </>
          )}

          {/* BICYCLE SPECIFICATIONS */}
          {isBicycle && (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Bicycle Type</Text>
                {renderChips(BICYCLE_TYPES, bicycleType, setBicycleType)}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Brand</Text>
                {renderHorizontalChips(BICYCLE_BRANDS, brand, setBrand)}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Model / Frame Specs</Text>
                <View style={styles.textInputWrapper}>
                  <TextInput
                    style={styles.textInput}
                    value={model}
                    onChangeText={setModel}
                    placeholder="e.g. 21 Speed Shimano, Disc Brakes, 27.5 inch"
                    placeholderTextColor="#94A3B8"
                  />
                </View>
              </View>
            </>
          )}

          {/* COMMERCIAL VEHICLES & SPARE PARTS */}
          {(isCommercial || isSpareParts) && (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Brand / Vehicle Make</Text>
                {renderHorizontalChips(CAR_BRANDS, brand, setBrand)}
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Item / Model Description</Text>
                <View style={styles.textInputWrapper}>
                  <TextInput
                    style={styles.textInput}
                    value={model}
                    onChangeText={setModel}
                    placeholder={isCommercial ? 'e.g. Tata Ace Gold, Bolero Pickup' : 'e.g. LED Headlights, Alloy Wheels 16 inch'}
                    placeholderTextColor="#94A3B8"
                  />
                </View>
              </View>
            </>
          )}

          {/* SMARTPHONE / MOBILE SPECIFICATIONS */}
          {isMobile && (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Phone Brand</Text>
                {renderHorizontalChips(MOBILE_BRANDS, brand, setBrand)}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Storage Capacity</Text>
                {renderChips(STORAGE_OPTIONS, storage, setStorage)}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>RAM</Text>
                {renderChips(RAM_OPTIONS, ram, setRam)}
              </View>
            </>
          )}

          {/* LAPTOP / COMPUTER SPECIFICATIONS */}
          {isLaptop && (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Laptop Brand</Text>
                {renderHorizontalChips(LAPTOP_BRANDS, brand, setBrand)}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>RAM</Text>
                {renderChips(['8 GB', '16 GB', '32 GB+'], ram, setRam)}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Storage Type & Capacity</Text>
                {renderChips(['256 GB SSD', '512 GB SSD', '1 TB SSD', '2 TB SSD'], storage, setStorage)}
              </View>
            </>
          )}

          {/* TABLET / IPAD SPECIFICATIONS */}
          {isTablet && (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Tablet Brand</Text>
                {renderHorizontalChips(['Apple (iPad)', 'Samsung', 'Lenovo', 'Xiaomi', 'OnePlus', 'Other'], brand, setBrand)}
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Storage Capacity</Text>
                {renderChips(['64 GB', '128 GB', '256 GB', '512 GB'], storage, setStorage)}
              </View>
            </>
          )}

          {/* TV & HOME ENTERTAINMENT */}
          {isTV && (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>TV Brand</Text>
                {renderHorizontalChips(TV_BRANDS, brand, setBrand)}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Screen Size</Text>
                {renderChips(TV_SIZES, screenSize, setScreenSize)}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Resolution</Text>
                {renderChips(TV_RESOLUTIONS, resolution, setResolution)}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Smart TV Enabled</Text>
                <View style={styles.chipsRow}>
                  {['Smart TV (Android / Google / webOS)', 'Non-Smart TV'].map((opt) => (
                    <TouchableOpacity
                      key={opt}
                      style={[
                        styles.chip,
                        (opt.startsWith('Smart') ? isSmartTV : !isSmartTV) && [
                          styles.chipActive,
                          { borderColor: categoryColor, backgroundColor: categoryBgColor },
                        ],
                      ]}
                      onPress={() => setIsSmartTV(opt.startsWith('Smart'))}
                    >
                      <Text
                        style={[
                          styles.chipText,
                          (opt.startsWith('Smart') ? isSmartTV : !isSmartTV) && [
                            styles.chipTextActive,
                            { color: categoryColor },
                          ],
                        ]}
                      >
                        {opt}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </>
          )}

          {/* HEADPHONES & AUDIO */}
          {isAudio && (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Audio Equipment Type</Text>
                {renderChips(AUDIO_TYPES, audioType, setAudioType)}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Brand</Text>
                {renderHorizontalChips(AUDIO_BRANDS, brand, setBrand)}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Active Noise Cancellation (ANC)</Text>
                <View style={styles.chipsRow}>
                  {['ANC Enabled', 'Standard (No ANC)'].map((opt) => (
                    <TouchableOpacity
                      key={opt}
                      style={[
                        styles.chip,
                        (opt.startsWith('ANC') ? hasANC : !hasANC) && [
                          styles.chipActive,
                          { borderColor: categoryColor, backgroundColor: categoryBgColor },
                        ],
                      ]}
                      onPress={() => setHasANC(opt.startsWith('ANC'))}
                    >
                      <Text
                        style={[
                          styles.chipText,
                          (opt.startsWith('ANC') ? hasANC : !hasANC) && [
                            styles.chipTextActive,
                            { color: categoryColor },
                          ],
                        ]}
                      >
                        {opt}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </>
          )}

          {/* CAMERAS & PHOTOGRAPHY */}
          {isCamera && (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Camera Type</Text>
                {renderChips(CAMERA_TYPES, cameraType, setCameraType)}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Brand</Text>
                {renderHorizontalChips(CAMERA_BRANDS, brand, setBrand)}
              </View>
            </>
          )}

          {/* WEARABLES / SMART WATCHES */}
          {isWearable && (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Watch / Band Brand</Text>
                {renderHorizontalChips(WEARABLE_BRANDS, brand, setBrand)}
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Display & Case Size</Text>
                {renderChips(['40mm / 41mm', '44mm / 45mm', '49mm Ultra', 'Standard Band'], storage, setStorage)}
              </View>
            </>
          )}

          {/* GAMING CONSOLES */}
          {isGaming && (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Gaming Platform</Text>
                {renderChips(GAMING_PLATFORMS, gamingPlatform, setGamingPlatform)}
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Console Storage</Text>
                {renderChips(['500 GB', '825 GB / 1 TB', '2 TB'], storage, setStorage)}
              </View>
            </>
          )}

          {/* CLOTHING (MEN & WOMEN) */}
          {isClothing && (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Department</Text>
                {renderChips(GENDER_OPTIONS, gender, setGender)}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Size</Text>
                {renderChips(CLOTHING_SIZES, size, setSize)}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Brand Name</Text>
                <View style={styles.textInputWrapper}>
                  <TextInput
                    style={styles.textInput}
                    value={brand}
                    onChangeText={setBrand}
                    placeholder="e.g. Zara, H&M, Levi's, Nike, Uniqlo"
                    placeholderTextColor="#94A3B8"
                  />
                </View>
              </View>
            </>
          )}

          {/* FOOTWEAR & SHOES */}
          {isFootwear && (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Footwear Type</Text>
                {renderChips(FOOTWEAR_TYPES, footwearType, setFootwearType)}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Shoe Size (UK / India)</Text>
                {renderChips(FOOTWEAR_SIZES, shoeSize, setShoeSize)}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Brand</Text>
                {renderHorizontalChips(FOOTWEAR_BRANDS, brand, setBrand)}
              </View>
            </>
          )}

          {/* WATCHES, BAGS & ACCESSORIES */}
          {isAccessory && (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Accessory Category</Text>
                {renderChips(ACCESSORY_TYPES, accessoryType, setAccessoryType)}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Brand Name</Text>
                <View style={styles.textInputWrapper}>
                  <TextInput
                    style={styles.textInput}
                    value={brand}
                    onChangeText={setBrand}
                    placeholder="e.g. Fossil, Michael Kors, Ray-Ban, Titan"
                    placeholderTextColor="#94A3B8"
                  />
                </View>
              </View>
            </>
          )}

          {/* SOFAS & LIVING ROOM */}
          {isSofa && (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Seater Configuration</Text>
                {renderChips(SOFA_TYPES, sofaType, setSofaType)}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Primary Material</Text>
                {renderChips(FURNITURE_MATERIALS, material, setMaterial)}
              </View>
            </>
          )}

          {/* BEDS & WARDROBES */}
          {isBed && (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Bed Size</Text>
                {renderChips(BED_SIZES, bedSize, setBedSize)}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Storage Type</Text>
                {renderChips(BED_STORAGE, bedStorage, setBedStorage)}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Wood / Material</Text>
                {renderChips(FURNITURE_MATERIALS, material, setMaterial)}
              </View>
            </>
          )}

          {/* DINING, OFFICE & HOME DECOR */}
          {(isDining || isOffice || isDecor || isGenericFurniture) && (
            <View style={styles.inputGroup}>
              <Text style={styles.fieldLabel}>Primary Material</Text>
              {renderChips(FURNITURE_MATERIALS, material, setMaterial)}
            </View>
          )}

          {/* GYM & FITNESS */}
          {isGym && (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Equipment Category</Text>
                {renderChips(SPORTS_EQUIPMENT_TYPES, sportsType, setSportsType)}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Brand</Text>
                {renderHorizontalChips(SPORTS_BRANDS, sportsBrand, setSportsBrand)}
              </View>
            </>
          )}

          {/* OUTDOOR SPORTS & RACQUET */}
          {(isOutdoorSports || isRacquet) && (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Sport</Text>
                {renderChips(isRacquet ? RACQUET_SPORTS : ['Cricket', 'Football', 'Basketball', 'Volleyball'], racquetSport, setRacquetSport)}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Brand</Text>
                {renderHorizontalChips(SPORTS_BRANDS, sportsBrand, setSportsBrand)}
              </View>
            </>
          )}

          {/* SPORTS CYCLES */}
          {isSportsCycle && (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Cycle Type</Text>
                {renderChips(BICYCLE_TYPES, bicycleType, setBicycleType)}
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Brand</Text>
                {renderHorizontalChips(BICYCLE_BRANDS, sportsBrand, setSportsBrand)}
              </View>
            </>
          )}

          {/* MUSIC: GUITARS, KEYBOARDS, DRUMS */}
          {(isMusicGuitar || isMusicKeyboard || isMusicOther) && (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Instrument Category</Text>
                {renderChips(MUSIC_INSTRUMENT_TYPES, musicInstrument, setMusicInstrument)}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Brand / Maker</Text>
                {renderHorizontalChips(MUSIC_BRANDS, musicBrand, setMusicBrand)}
              </View>

              {isMusicGuitar && (
                <View style={styles.inputGroup}>
                  <Text style={styles.fieldLabel}>Padded Gig Bag / Case</Text>
                  <View style={styles.chipsRow}>
                    {['Padded Bag Included', 'Guitar Only'].map((opt) => (
                      <TouchableOpacity
                        key={opt}
                        style={[
                          styles.chip,
                          (opt.startsWith('Padded') ? hasMusicBag : !hasMusicBag) && [
                            styles.chipActive,
                            { borderColor: categoryColor, backgroundColor: categoryBgColor },
                          ],
                        ]}
                        onPress={() => setHasMusicBag(opt.startsWith('Padded'))}
                      >
                        <Text
                          style={[
                            styles.chipText,
                            (opt.startsWith('Padded') ? hasMusicBag : !hasMusicBag) && [
                              styles.chipTextActive,
                              { color: categoryColor },
                            ],
                          ]}
                        >
                          {opt}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
            </>
          )}

          {/* TOYS & HOBBIES */}
          {(isToysLego || isToysBoard || isToysRC) && (
            <View style={styles.inputGroup}>
              <Text style={styles.fieldLabel}>Toy / Collectible Category</Text>
              {renderChips(TOY_TYPES, toyType, setToyType)}
            </View>
          )}

          {/* SERVICES */}
          {isService && (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Service Scope</Text>
                {renderChips(SERVICE_PACKAGES, servicePackage, setServicePackage)}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Service Guarantee / Warranty</Text>
                {renderChips(SERVICE_WARRANTY, serviceWarranty, setServiceWarranty)}
              </View>
            </>
          )}
        </View>

        {/* 4. ITEM HIGHLIGHTS / QUICK PERKS */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <View style={[styles.sectionIconBadge, { backgroundColor: '#ECFDF5' }]}>
              <Ionicons name="sparkles" size={18} color="#059669" />
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.sectionTitle}>Key Highlights & Perks</Text>
              <Text style={styles.sectionSubtitle}>Select all that apply to boost buyer trust</Text>
            </View>
          </View>

          <View style={styles.chipsRow}>
            {QUICK_HIGHLIGHTS.map((hl) => {
              const isSelected = highlights.includes(hl);
              return (
                <TouchableOpacity
                  key={hl}
                  activeOpacity={0.7}
                  style={[
                    styles.chip,
                    isSelected && {
                      backgroundColor: '#ECFDF5',
                      borderColor: '#059669',
                    },
                  ]}
                  onPress={() => toggleHighlight(hl)}
                >
                  <Ionicons
                    name={isSelected ? 'checkmark-circle' : 'add-circle-outline'}
                    size={14}
                    color={isSelected ? '#059669' : '#64748B'}
                    style={{ marginRight: 6 }}
                  />
                  <Text
                    style={[
                      styles.chipText,
                      isSelected && { color: '#059669', fontWeight: '700' },
                    ]}
                  >
                    {hl}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* 5. LOCATION & DESCRIPTION */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <View style={[styles.sectionIconBadge, { backgroundColor: '#FFF7ED' }]}>
              <Ionicons name="location-outline" size={18} color="#EA580C" />
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.sectionTitle}>Pickup Location & Details</Text>
              <Text style={styles.sectionSubtitle}>Where buyers can pick up or inspect the item</Text>
            </View>
          </View>

          {/* Location Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.fieldLabel}>Location / Area *</Text>
            <View style={styles.locationInputWrapper}>
              <Ionicons name="location" size={18} color={Colors.primary} style={{ marginRight: 8 }} />
              <TextInput
                style={styles.locationTextInput}
                value={location}
                onChangeText={setLocation}
                placeholder="e.g. Indiranagar, Bengaluru"
                placeholderTextColor="#94A3B8"
              />
            </View>
          </View>

          {/* Description */}
          <View style={styles.inputGroup}>
            <Text style={styles.fieldLabel}>Item Description</Text>
            <View style={[styles.textInputWrapper, { minHeight: 110, paddingVertical: 10 }]}>
              <TextInput
                style={[styles.textInput, { textAlignVertical: 'top', minHeight: 90 }]}
                value={description}
                onChangeText={setDescription}
                placeholder="Share details on condition, age, usage history, included accessories, or reasons for selling..."
                placeholderTextColor="#94A3B8"
                multiline
                numberOfLines={4}
              />
            </View>
          </View>
        </View>

        {/* TRUST BANNER & PUBLISH BUTTON */}
        <View style={styles.footerContainer}>
          <View style={styles.trustBanner}>
            <Ionicons name="shield-checkmark" size={16} color="#059669" style={{ marginRight: 6 }} />
            <Text style={styles.trustBannerText}>
              Free listing • Verified ReCart Seller Protection • Instant inquiry notifications
            </Text>
          </View>

          <AppButton
            title={submitting ? 'Publishing Your Listing...' : 'Publish Listing Now'}
            onPress={handleSubmit}
            loading={submitting}
            style={styles.submitBtn}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  categoryCardHeader: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  categoryBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepProgressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  stepBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  stepDot: {
    marginHorizontal: 6,
    fontSize: 10,
    color: '#94A3B8',
  },
  stepTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  categoryBreadcrumbs: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  changeCategoryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
    backgroundColor: '#FFF1E8',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  changeCategoryBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionIconBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  inputGroup: {
    marginBottom: 14,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 7,
  },
  textInputWrapper: {
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  textInput: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0F172A',
    padding: 0,
  },
  priceInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    overflow: 'hidden',
  },
  currencyBadge: {
    backgroundColor: '#FFF1E8',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRightWidth: 1,
    borderRightColor: '#FED7AA',
  },
  currencySymbol: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.primary,
  },
  priceTextInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 2,
  },
  horizontalChips: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 22,
    backgroundColor: '#F8FAFC',
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    marginRight: 8,
    marginBottom: 8,
  },
  chipActive: {
    borderWidth: 1.5,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  chipTextActive: {
    fontWeight: '700',
  },
  twoColRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  uploadDropzone: {
    minHeight: 160,
    backgroundColor: '#FFFDFB',
    borderRadius: 14,
    borderWidth: 1.8,
    borderColor: '#FDBA74',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
  },
  cameraIconRing: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#FFF1E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  uploadMainText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 3,
  },
  uploadSubText: {
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 14,
  },
  uploadButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  primaryUploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 10,
    marginRight: 8,
  },
  primaryUploadBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  secondaryUploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1.2,
    borderColor: '#FED7AA',
  },
  secondaryUploadBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary,
  },
  samplePresetsBox: {
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  presetLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 8,
  },
  presetThumbsRow: {
    flexDirection: 'row',
  },
  presetThumbnail: {
    marginRight: 10,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  presetImg: {
    width: 44,
    height: 44,
  },
  previewContainer: {
    height: 220,
    borderRadius: 14,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#0F172A',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  previewOverlayPill: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  previewPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  imageActionsRow: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  changePhotoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    marginRight: 8,
  },
  changePhotoText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  removePhotoBtn: {
    backgroundColor: 'rgba(239, 68, 68, 0.9)',
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  locationTextInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#0F172A',
    padding: 0,
  },
  footerContainer: {
    marginTop: 6,
    marginBottom: 24,
  },
  trustBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ECFDF5',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  trustBannerText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#065F46',
    textAlign: 'center',
    flex: 1,
  },
  submitBtn: {
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
});
