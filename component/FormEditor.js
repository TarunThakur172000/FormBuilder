import React, { useState } from 'react';
import { TextInput, View, Button, StyleSheet, Alert, ScrollView, Image } from 'react-native';  // Import Image here
import Question from './Question';  // Import Question component
import { createForm, uploadImage } from '../services/api';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Axios } from 'axios';

const FormEditor = () => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const navigation = useNavigation();
  const [headerImage, setHeaderImage] = useState(null);

  // Function to pick an image from the library
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setHeaderImage(result.assets[0].uri);  // Directly set the URI
    }
  };

  

  // Add a new question
  const addQuestion = (type) => {
    const newQuestion = {
      id: Date.now(),
      type,
      label: '',
      options: type === 'CheckBox' ? [{ label: '', selected: false }] : [],  // For CheckBox, initialize options
    };
    setQuestions([...questions, newQuestion]);
  };

 
  const handleSubmit = async () => {
    if (!title || questions.length === 0) {
      Alert.alert('Error', 'Please provide a form title and add at least one question.');
      return;
    }
  
    const formData = { title, questions };  // Form data before image upload
  
    // Upload image if a header image exists
    if (headerImage) {
      try {
        const uploadRes = await uploadImage(headerImage); // Upload the header image
        formData.headerImage = uploadRes.data.link; // Save the uploaded image URL in form data
      } catch (error) {
        Alert.alert('Error', 'Failed to upload image. Please try again.');
        console.error('Image upload error:', error);
        return; // Stop further execution if image upload fails
      }
    }
  
    try {
      console.log(formData)
      const newForm = await createForm(formData); // Create the form
      navigation.navigate('FormList');
      Alert.alert('Success', 'Form created successfully!');
    } catch (error) {
      Alert.alert('Error', 'An error occurred while creating the form.');
      console.error('Form creation error:', error);
    }
  };
  
  // Handle question changes
  const handleQuestionChange = (updatedQuestion) => {
    const updatedQuestions = questions.map((q) =>
      q.id === updatedQuestion.id ? updatedQuestion : q
    );
    setQuestions(updatedQuestions);
  };

  return (
    <ScrollView style={{ marginBottom: 20 }}>
      {/* Header Image Picker */}
      <View style={style.imagePickerContainer}>
        <Button title="Pick a Header Image" onPress={pickImage} />
        {headerImage && (
          <Image source={{ uri: headerImage }} style={style.headerImage} />
        )}
      </View>

      <TextInput
        placeholder="Form Title"
        value={title}
        onChangeText={setTitle}
        style={{ borderBottomWidth: 1, marginBottom: 10, padding: 10 }}
      />

      <Button title="Add Text Question" onPress={() => addQuestion('Text')} />
      <Button title="Add CheckBox Question" onPress={() => addQuestion('CheckBox')} />
      <Button title="Add Grid Question" onPress={() => addQuestion('Grid')} />

      {questions.map((question) => (
        <Question key={question.id} question={question} onChange={handleQuestionChange} />
      ))}

      <Button title="Save Form" onPress={handleSubmit} />
    </ScrollView>
  );
};

export default FormEditor;

const style = StyleSheet.create({
  saveForm: {
    marginBottom: 90,
  },
  imagePickerContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  headerImage: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 10,
  },
});
