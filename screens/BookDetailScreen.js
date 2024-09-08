// screens/BookDetailsScreen.js
import React from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc';

const BookDetailsScreen = ({ route }) => {
  const { book } = route.params;

  const extendBook = async () => {
    try {
      const token = await AsyncStorage.getItem('access');
      if (token) {
        await axios.post('https://thankful-moose-gratefully.ngrok-free.app/books/extend/', 
          { book_title: book.book.title },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert('Book extended successfully!');
      } else {
        console.log('No token found');
      }
    } catch (err) {
      console.error('Error extending book:', err);
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white p-4`}>
      <Image
        source={{ uri: book.book.cover || 'https://via.placeholder.com/300x400' }}
        style={tw`w-full h-60 rounded-md mb-4`}
      />
      <Text style={tw`text-2xl font-bold mb-2`}>{book.book.title}</Text>
      <Text style={tw`text-lg mb-2`}>Description: {book.book.desc}</Text>
      <Text style={tw`text-lg mb-2`}>Genre: {book.book.genre}</Text>
      <Text style={tw`text-lg mb-2`}>Taken Date: {new Date(book.date_taken).toLocaleDateString()}</Text>
      <Text style={tw`text-lg mb-2`}>Return Date: {book.date_returned ? new Date(book.date_returned).toLocaleDateString() : 'Not returned'}</Text>
      <Text style={tw`text-lg mb-2`}>Deadline: {new Date(book.deadline_of_return).toLocaleDateString()}</Text>
      <Button title="Extend" onPress={extendBook} />
    </SafeAreaView>
  );
};

export default BookDetailsScreen;