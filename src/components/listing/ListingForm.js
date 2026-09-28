import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity, Text, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import AppInput from '../common/AppInput';
import AppButton from '../common/AppButton';
import Typography from '../../constants/Typography';
import Spacing from '../../constants/Spacing';
import Colors from '../../constants/Colors';

export default function ListingForm({ initialValues, mode = 'create', onSubmit }) {
  const [title, setTitle] = useState(initialValues?.title || '');
  const [price, setPrice] = useState(initialValues?.price?.toString() || '');
  const [category, setCategory] = useState(initialValues?.category || '');
  const [description, setDescription] = useState(initialValues?.description || '');
  const [image, setImage] = useState(initialValues?.image || null);
  const [condition, setCondition] = useState(initialValues?.condition || 'Used - Good');
  const [location, setLocation] = useState(initialValues?.location || 'Hyderabad');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!title || !price || !category || !image) {
      Alert.alert('Missing fields', 'Please fill in title, price, category, and select an image.');
      return;
    }
    onSubmit({ title, price: parseFloat(price), category, description, image, condition, location });
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{flex: 1}}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.imagePreview} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Ionicons name="camera" size={40} color={Colors.textSecondary} />
              <Text style={styles.imageText}>Add Photo</Text>
            </View>
          )}
        </TouchableOpacity>

        <AppInput label="Title" value={title} onChangeText={setTitle} placeholder="What are you selling?" />
        <AppInput label="Price (₹)" value={price} onChangeText={setPrice} placeholder="0.00" keyboardType="numeric" />
        <AppInput label="Category" value={category} onChangeText={setCategory} placeholder="e.g. Electronics, Vehicles..." />
        <AppInput label="Condition" value={condition} onChangeText={setCondition} placeholder="e.g. Used, New..." />
        <AppInput label="Location" value={location} onChangeText={setLocation} placeholder="e.g. Hyderabad" />
        <AppInput label="Description" value={description} onChangeText={setDescription} placeholder="Describe your item..." multiline />
        
        <AppButton 
          title={mode === 'create' ? 'Publish Listing' : 'Update Listing'}
          onPress={handleSubmit}
          style={styles.submitBtn}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: Spacing.md },
  imagePicker: { width: '100%', height: 200, backgroundColor: Colors.card, borderRadius: 12, overflow: 'hidden', marginBottom: Spacing.xl, borderWidth: 1, borderColor: Colors.border, borderStyle: 'dashed' },
  imagePreview: { width: '100%', height: '100%' },
  imagePlaceholder: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  imageText: { marginTop: Spacing.sm, color: Colors.textSecondary, fontWeight: Typography.weights.medium },
  submitBtn: { marginTop: Spacing.md, marginBottom: Spacing.xxxl }
});
