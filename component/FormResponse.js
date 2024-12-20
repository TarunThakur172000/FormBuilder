import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, ScrollView, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { deleteForm, fetchFormById } from '../services/api'; // Make sure to define this in your api service
import * as Clipboard from 'expo-clipboard';
const FormResponse = ({ route, navigation }) => {
  const { formId, onDeleteSuccess } = route.params; // Get formId and onDeleteSuccess from the navigation params
  const [formData, setFormData] = useState(null);
  const [responses, setResponses] = useState({});

  console.log(formId);

  // Fetch the form data when the component is mounted
  useEffect(() => {
    const loadFormData = async () => {
      try {
        const data = await fetchFormById(formId); // Fetch form data from backend
        setFormData(data);
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    };

    loadFormData();
  }, [formId]);

  // Function to handle input changes for responses
  const handleResponseChange = (questionId, value) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log("Submitted Responses:", responses);
    // You can send the responses to the backend here
  };

  // Handle form deletion
  const handleDelete = (formId) => {
    Alert.alert(
      "Delete Form",
      "Are you sure you want to delete this form?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              await deleteForm(formId);
              Alert.alert("Success", "Form deleted successfully");
              if (onDeleteSuccess) {
                onDeleteSuccess(); // Call the onDeleteSuccess callback to refresh the list
              }
              navigation.goBack(); // Go back to the form list after deletion
            } catch (error) {
              console.error("Error deleting form:", error);
              Alert.alert("Error", "Could not delete the form");
            }
          },
        },
      ]
    );
  };

  if (!formData) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading form...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity style={{ width: 30, height: 30 }} onPress={() => handleDelete(formId)}>
        <Image
          source={require('../res/dustbin.png')} // Adjust path as necessary
          style={{ width: 30, height: 30 }}
        />
      </TouchableOpacity>
      <TouchableOpacity style={{ width: 30, height: 30 }} onPress={() => Clipboard.setStringAsync(`192.168.152.58:3000/form/${formId}`)}>
      <Image
          source={require('../res/copy.jpg')} // Adjust path as necessary
          style={{ width: 30, height: 30 }}
        />
      </TouchableOpacity>
      </View>
      <Text style={styles.formTitle}>{formData.title}</Text>
      {formData.questions.map((question) => (
        <View key={question.id} style={styles.questionContainer}>
          <Text style={styles.questionLabel}>{question.label}</Text>

          {/* Render different input types based on the question type */}
          {question.type === 'Text' && (
            <TextInput
              style={styles.input}
              placeholder="Enter your answer"
              value={responses[question.id] || ''}
              onChangeText={(text) => handleResponseChange(question.id, text)}
            />
          )}

          {question.type === 'CheckBox' &&
            question.options.map((option, index) => (
              <View key={index} style={styles.checkboxOption}>
                <Text>{option}</Text>
                <Button
                  title={responses[question.id] === option ? "Unselect" : "Select"}
                  onPress={() => handleResponseChange(question.id, option)}
                />
              </View>
            ))}

          {question.type === 'Grid' && (
            <View style={styles.gridContainer}>
              <Text>Rows:</Text>
              {question.rows.map((row, rowIndex) => (
                <TextInput
                  key={`row-${rowIndex}`}
                  style={styles.input}
                  placeholder={`Answer for ${row}`}
                  value={responses[question.id]?.[row] || ''}
                  onChangeText={(text) => handleResponseChange(question.id, { ...responses[question.id], [row]: text })}
                />
              ))}
            </View>
          )}
        </View>
      ))}
      <Button title="Submit Form" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionLabel: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  checkboxOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  gridContainer: {
    marginTop: 10,
  },
});

export default FormResponse;
