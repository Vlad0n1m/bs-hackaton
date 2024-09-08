import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {


  // Function to handle login and save tokens
  const login = async (username, password) => {
    try {
      const response = await axios.post('https://thankful-moose-gratefully.ngrok-free.app/auth/token/', {
        username,
        password,
      });

      const { access, refresh } = response.data;

      // Save tokens in AsyncStorage
      await AsyncStorage.setItem('access', access);
      await AsyncStorage.setItem('refresh', refresh);


    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Throw error so that the LoginScreen can handle it
    }
  };

  return (
    <AuthContext.Provider value={{ login }}>
      {children}
    </AuthContext.Provider>
  );
};