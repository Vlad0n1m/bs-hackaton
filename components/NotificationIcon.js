import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function NotificationIcon({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Ionicons name="notifications-outline" size={24} color="black" />
    </TouchableOpacity>
  );
}