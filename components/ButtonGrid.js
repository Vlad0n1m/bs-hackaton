import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import tw from 'twrnc';

const { width } = Dimensions.get('window');
const buttonSize = width / 2 - 16- 6; // Size of each button, accounting for margins

const ButtonGrid = ({ onButtonPress }) => {
  return (
    <View style={tw` flex-col gap-3 flex-1  mt-3`}>
      <View style={tw`flex  flex-row gap-3`}>
      <TouchableOpacity
          style={[tw`rounded-xl flex flex-col justify-center gap-4 border-black border-2 bg-black items-center p-3`, { width: buttonSize, height: buttonSize }]}
          onPress={() => onButtonPress('Active Books')}
        >
          <Text style={tw`text-[32px]`}>📚</Text>
          <Text style={tw`text-[18px] text-white font-semibold`}>Активные книги</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[tw`rounded-xl flex flex-col justify-center gap-4 border-black border-2 bg-black items-center p-3`, { width: buttonSize, height: buttonSize }]}
          onPress={() => onButtonPress('Catalog')}
        >
          <Text style={tw`text-[32px]`}>📖</Text>
          <Text style={tw`text-[18px] text-white font-semibold`}>Каталог книг</Text>
        </TouchableOpacity>
      </View>
      <View style={tw`flex  flex-row gap-3`}>
      <TouchableOpacity
          style={[tw`rounded-xl flex flex-col justify-center gap-4 border-black border-2 bg-black items-center p-3`, { width: buttonSize, height: buttonSize }]}
          onPress={() => onButtonPress('News')}
        >
          <Text style={tw`text-[32px]`}>📰</Text>
          <Text style={tw`text-[18px] text-white font-semibold`}>Новости</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[tw`rounded-xl flex flex-col justify-center gap-4 border-black border-2 bg-black items-center p-3`, { width: buttonSize, height: buttonSize }]}
          onPress={() => onButtonPress('Games')}
        >
          <Text style={tw`text-[32px]`}>🎮</Text>
          <Text style={tw`text-[18px] text-white font-semibold`}>Игры</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    ...tw`bg-gray-200 m-2 rounded-lg`,
    elevation: 3,
  },
  emoji: {
    fontSize: 36,
  },
  text: {
    fontSize: 16,
    marginTop: 4,
  },
});

export default ButtonGrid;