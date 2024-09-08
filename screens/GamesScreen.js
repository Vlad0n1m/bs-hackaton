import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import tw from 'twrnc';

const GamesScreen = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('https://thankful-moose-gratefully.ngrok-free.app/quiz/');
        setGames(response.data);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchGames();
  }, []);

  const handlePress = (link) => {
    // Here you can use Linking.openURL if you want to open the link in the default browser
    // For example:
    // Linking.openURL(link);
    alert(`Link: ${link}`);
  };

  const renderItem = ({ item }) => (
    <View style={tw`bg-white rounded-lg shadow-md p-4 mb-4`}>
      <Image
        style={tw`w-full h-40 rounded-lg mb-4`}
        source={{ uri: item.cover_image }}
      />
      <Text style={tw`text-lg font-bold mb-2`}>{item.title}</Text>
      <Text style={tw`text-base mb-2`}>{item.description}</Text>
      <TouchableOpacity
        style={tw`bg-blue-500 p-2 rounded-lg`}
        onPress={() => handlePress(item.link)}
      >
        <Text style={tw`text-white text-center`}>Play Game</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={tw`flex-1 bg-gray-100 p-4`}>
      <FlatList
        data={games}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default GamesScreen;