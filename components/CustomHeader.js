import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomHeader = ({ onProfilePress, onNotificationsPress }) => {
  return (
    <View style={tw`flex-row justify-between items-center px-4 py-2 bg-white`}>
      <TouchableOpacity onPress={onProfilePress}>
        <Icon name="person-outline" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onNotificationsPress}>
        <Icon name="notifications-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;