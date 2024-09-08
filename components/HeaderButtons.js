import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

const HeaderButtons = () => {
  const navigation = useNavigation();

  return (
    <View style={tw`flex-row justify-between w-full px-4`}>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Image source={require('../assets/profile-icon.png')} style={tw`w-6 h-6`} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => alert('Уведомления')}>
        <Image source={require('../assets/notification-icon.png')} style={tw`w-6 h-6`} />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderButtons;