import React, { useContext } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenContainer from '../components/common/ScreenContainer';
import AppHeader from '../components/header/AppHeader';
import ListingForm from '../components/listing/ListingForm';
import { AuthContext } from '../context/AuthContext';
import { ListingsContext } from '../context/ListingsContext';

export default function CreateListingScreen() {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const { addListing } = useContext(ListingsContext);

  const handleCreate = async (data) => {
    const newListing = {
      ...data,
      seller: {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        rating: user.rating,
      }
    };
    
    await addListing(newListing);
    Alert.alert('Success', 'Your item has been listed!');
    navigation.navigate('Profile'); // Redirect to profile or my listings
  };

  return (
    <ScreenContainer noPadding>
      <AppHeader title="Create Listing" />
      <ListingForm mode="create" onSubmit={handleCreate} />
    </ScreenContainer>
  );
}
