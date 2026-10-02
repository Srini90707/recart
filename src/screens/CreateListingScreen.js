import React, { useState, useContext, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import ScreenContainer from '../components/common/ScreenContainer';
import AppHeader from '../components/header/AppHeader';
import CategoryPickerStep from '../components/listing/CategoryPickerStep';
import SubcategoryPickerStep from '../components/listing/SubcategoryPickerStep';
import ListingForm from '../components/listing/ListingForm';
import ListingSuccessModal from '../components/listing/ListingSuccessModal';
import { AuthContext } from '../context/AuthContext';
import { ListingsContext } from '../context/ListingsContext';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

export default function CreateListingScreen() {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const { addListing } = useContext(ListingsContext);

  const [step, setStep] = useState('category'); // 'category' | 'subcategory' | 'form'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [createdListing, setCreatedListing] = useState(null);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  // Optional: reset step if screen is re-focused after completing a flow
  useFocusEffect(
    useCallback(() => {
      // Keep state if in progress, but if already finished, reset
      if (successModalVisible) {
        setSuccessModalVisible(false);
        setStep('category');
        setSelectedCategory(null);
        setSelectedSubcategory(null);
      }
    }, [successModalVisible])
  );

  const handleSelectCategoryAndSubcategory = (category, subcategory) => {
    setSelectedCategory(category);
    setSelectedSubcategory(subcategory);
    setStep('form');
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setStep('subcategory');
  };

  const handleSelectSubcategory = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setStep('form');
  };

  const handleBackToCategories = () => {
    setStep('category');
  };

  const handleBackFromForm = () => {
    setStep('category');
  };

  const handleResetFlow = () => {
    setStep('category');
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setSuccessModalVisible(false);
  };

  const handlePublish = async (formData) => {
    const listingId = Date.now().toString();
    const newListing = {
      ...formData,
      id: listingId,
      postedTime: 'Just now',
      verified: true,
      type: 'buy',
      seller: {
        id: user?.id || 'u_seller',
        name: user?.name || 'ReCart Seller',
        avatar:
          user?.avatar ||
          'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
        rating: user?.rating || 4.9,
        verified: true,
      },
    };

    await addListing(newListing);
    setCreatedListing(newListing);
    setSuccessModalVisible(true);
  };

  const handleViewListing = () => {
    setSuccessModalVisible(false);
    handleResetFlow();
    if (createdListing?.id) {
      navigation.navigate('ProductDetails', { id: createdListing.id });
    } else {
      navigation.navigate('Home');
    }
  };

  return (
    <ScreenContainer noPadding>
      {/* Step 1: Main Category & Subcategory Selection (Horizontal + Grid below) */}
      {step === 'category' && (
        <>
          <AppHeader title="Sell an Item" />
          <CategoryPickerStep
            onSelectCategory={handleSelectCategory}
            onSelectCategoryAndSubcategory={handleSelectCategoryAndSubcategory}
          />
        </>
      )}

      {/* Step 2: Fallback Subcategory Selection */}
      {step === 'subcategory' && (
        <SubcategoryPickerStep
          category={selectedCategory}
          onBack={handleBackToCategories}
          onSelectSubcategory={handleSelectSubcategory}
        />
      )}

      {/* Step 3: Category-Tailored Listing Form */}
      {step === 'form' && (
        <>
          <AppHeader
            title="Item Details"
            leftIcon={<Ionicons name="arrow-back" size={24} color={Colors.text} />}
            onLeftPress={handleBackFromForm}
            rightIcon={<Ionicons name="close" size={24} color={Colors.textSecondary} />}
            onRightPress={handleResetFlow}
          />
          <ListingForm
            category={selectedCategory}
            subcategory={selectedSubcategory}
            onChangeCategory={handleResetFlow}
            onSubmit={handlePublish}
          />
        </>
      )}

      {/* Success Confirmation Modal */}
      <ListingSuccessModal
        visible={successModalVisible}
        listing={createdListing}
        onViewListing={handleViewListing}
        onDone={handleResetFlow}
      />
    </ScreenContainer>
  );
}
