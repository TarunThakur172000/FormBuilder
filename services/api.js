import axios from 'axios';


// Fetch all forms
export const fetchForms = async () => {
  try {
    const response = await axios.get('http://192.168.152.58:5000/form');
    return response.data;
  } catch (error) {
    console.error("Error fetching forms:", error);
    throw error;
  }
};

// Fetch  form by ID
export const fetchFormById = async (formId) => {
  try {
    const response = await axios.get(`http://192.168.152.58:5000/form/${formId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching forms:", error);
    throw error;
  }
};

// delete  form by ID
export const deleteForm = async (formId) => {
  try {
    const response = await axios.delete(`http://192.168.152.58:5000/form/${formId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching forms:", error);
    throw error;
  }
};

// Create a form
export const createForm = async (formData) => {
  try {
    const response = await axios.post('http://192.168.152.58:5000/form', formData);
    return response.data;
  } catch (error) {
    console.error("Error creating form:", error);
    throw error;
  }
};

export const uploadImage = async (imguri) => {
  try {
    const formData = new FormData();
    formData.append('image', {
      uri: imguri,
      type: 'image/jpeg',  // Use appropriate mime type, e.g., 'image/png' for PNG files
      name: 'header_image.jpg',  // Optional: provide a name for the image
    });

    const response = await axios.post('https://api.imgur.com/3/image', formData, {
      headers: {
        'Authorization': 'Client-ID ac34b2d433166b2',  // Replace with your Imgur Client-ID
        'Content-Type': 'multipart/form-data',  // Specify content type for multipart/form-data
      },
    });

    return response.data;  // Return the response data, which includes the image URL
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
