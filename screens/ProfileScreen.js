import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';

const ProfileScreen = () => {
  const [profile, setProfile] = useState({
    name: '',
    username: '',
    exp: '',
    age: '',
    about: '',
    phone: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { accessToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('access');
        if (token) {
          const response = await axios.get('https://thankful-moose-gratefully.ngrok-free.app/users/profile/', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setProfile(response.data);
        } else {
          Alert.alert('Error', 'No access token found');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        Alert.alert('Error', 'Failed to fetch profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = await AsyncStorage.getItem('access');
      if (token) {
        await axios.put('https://thankful-moose-gratefully.ngrok-free.app/users/update/', profile, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        Alert.alert('Success', 'Profile updated successfully');
      } else {
        Alert.alert('Error', 'No access token found');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      {Object.keys(profile).map((key) => (
        <TextInput
          key={key}
          style={styles.input}
          placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
          value={profile[key].toString()}
          onChangeText={(text) => setProfile({ ...profile, [key]: text })}
        />
      ))}
      <Button title={saving ? "Saving..." : "Save"} onPress={handleSave} disabled={saving} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default ProfileScreen;