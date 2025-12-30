import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import api from '../services/api';

export default function RegisterScreen() {
  // --- State ---
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Date State
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // UI State
  const [loading, setLoading] = useState(false);

  // --- Helpers ---
  const calculateAge = (dob: Date) => {
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  };

  const validateInputs = () => {
    if (fullName.trim().length < 2) {
      Alert.alert('Validation Error', 'Full Name must be at least 2 characters.');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return false;
    }

    if (password.length < 8) {
      Alert.alert('Validation Error', 'Password must be at least 8 characters long.');
      return false;
    }
    
    // Check for Uppercase and Lowercase
    if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
       Alert.alert('Validation Error', 'Password must contain both uppercase and lowercase letters.');
       return false;
    }

    if (password !== confirmPassword) {
      Alert.alert('Validation Error', 'Passwords do not match.');
      return false;
    }

    if (calculateAge(dateOfBirth) < 18) {
      Alert.alert('Validation Error', 'You must be at least 18 years old to register.');
      return false;
    }

    return true;
  };

  // --- Helpers ---
  const resetForm = () => {
    setFullName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setDateOfBirth(new Date()); // resets to initial value
    setShowDatePicker(false);
  };

  const handleRegister = async () => {
    if (!validateInputs()) return;

    setLoading(true);

    try {
      // Format date as YYYY-MM-DD for backend
      const formattedDate = dateOfBirth.toISOString().split('T')[0];

      const payload = {
        fullName: fullName,
        email: email,
        password: password,
        dateOfBirth: formattedDate,
      };

      const response = await api.post('/register', payload);

      if (response.status === 201 || response.status === 200) {
        Alert.alert('Success', 'Registration successful!');
        // Reset form or navigate here
        resetForm();
      }
    } catch (error: any) {
      console.log('Registration Error:', error);
      if (error.response) {
        // Backend returned an error (e.g., 409 Conflict)
        Alert.alert('Error', error.response.data.detail || 'Registration failed.');
      } else {
        // Network error (e.g., backend not running)
        Alert.alert('Network Error', 'Could not connect to the server. Is the backend running?');
      }
    } finally {
      setLoading(false);
    }
  };

  // --- Render ---
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      {/* Date Picker Trigger */}
      <TouchableOpacity 
        style={styles.dateButton} 
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.dateText}>
          Date of Birth: {dateOfBirth.toISOString().split('T')[0]}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={dateOfBirth}
          mode="date"
          display="default"
          maximumDate={new Date()} // Can't be born in the future
          onChange={(event, selectedDate) => {
            setShowDatePicker(Platform.OS === 'ios'); // Keep open on iOS, close on Android
            if (selectedDate) setDateOfBirth(selectedDate);
          }}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleRegister} 
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Register</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dateButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
  },
  dateText: {
    color: '#333',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

