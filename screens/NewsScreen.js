import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import tw from 'twrnc';

const NewsScreen = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://thankful-moose-gratefully.ngrok-free.app/articles/');
        setNews(response.data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  const renderItem = ({ item }) => (
    <View style={tw`bg-white rounded-lg shadow-md p-4 mb-4`}>
      <Text style={tw`text-lg font-bold mb-2`}>{item.title}</Text>
      <Text style={tw`text-sm text-gray-600 mb-2`}>By {item.author_username} on {item.date}</Text>
      <Text style={tw`text-base`}>{item.content}</Text>
      <Text style={tw`text-sm text-gray-500 mt-2`}>Rating: {item.average_rating}</Text>
    </View>
  );

  return (
    <View style={tw`flex-1 bg-gray-100 p-4`}>
      <FlatList
        data={news}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default NewsScreen;