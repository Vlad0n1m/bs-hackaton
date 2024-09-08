// screens/TakenBooksScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Button, SafeAreaView, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc';

const TakenBooksScreen = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = await AsyncStorage.getItem('access');
        if (token) {
          const response = await axios.get('https://thankful-moose-gratefully.ngrok-free.app/books/taken-books/', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setBooks(response.data);
        } else {
          console.log('No token found');
        }
      } catch (err) {
        setError('Failed to load books');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const renderItem = ({ item }) => {
    const statusColor = item.status === 'Returned' ? 'green' : (new Date(item.deadline_of_return) < new Date() ? 'red' : 'orange');
    return (
      <View style={tw`p-4 border-t-2 border-b-2 border-gray-300 flex-row items-center`}>
        <Image
          source={{ uri: item.book.cover || 'https://via.placeholder.com/50' }}
          style={tw`w-16 h-16 rounded-md`}
        />
        <View style={tw`flex-1 ml-3`}>
          <Text style={tw`text-lg font-semibold`}>{item.book.title}</Text>
          <Text style={tw`text-gray-600`}>{item.book.genre}</Text>
          <Text>Status: {item.status}</Text>
          <Text>Return by: {new Date(item.deadline_of_return).toLocaleDateString()}</Text>
        </View>
        <Button
          title="View Details"
          onPress={() => navigation.navigate('BookDetails', { book: item })}
        />
      </View>
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={tw`text-red-500`}>{error}</Text>;
  }

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={(item) => item.book.id.toString()}
      />
    </SafeAreaView>
  );
};

export default TakenBooksScreen;