import React, { useEffect, useState } from 'react';
import { Text, View, Button, FlatList, TouchableOpacity, Alert } from 'react-native';
import { fetchForms, deleteForm } from '../services/api'; // Adjust path as needed

const FormList = ({ navigation }) => {
  const [forms, setForms] = useState([]);

  // Function to load forms
  const loadForms = async () => {
    try {
      const data = await fetchForms();
      setForms(data);
    } catch (error) {
      console.error("Error loading forms:", error);
      Alert.alert("Error", "Failed to load forms.");
    }
  };

  // Load forms on initial render
  useEffect(() => {
    loadForms();
  }, []);

  // Handle form deletion
  const handleDelete = async (formId) => {
    try {
      await deleteForm(formId);
      // Reload forms after deletion
      loadForms();
      Alert.alert("Success", "Form deleted successfully.");
    } catch (error) {
      console.error("Error deleting form:", error);
      Alert.alert("Error", "Failed to delete form.");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Available Forms</Text>

      <FlatList
        data={forms}
        keyExtractor={(item) => item._id} // Ensure that _id is present in your data
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Button
              title={item.title}
              onPress={() => navigation.navigate('FormResponse', { formId: item._id, onDeleteSuccess: loadForms })}
            />
            {/* Delete button */}
            
          </View>
        )}
      />

      <View>
        <Button title="Create New Form" onPress={() => navigation.navigate('FormEditor')} />
      </View>
    </View>
  );
};

export default FormList;
