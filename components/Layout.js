// SafeAreaReview.js
import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import tw from 'twrnc';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Layout = ({ children, nickname }) => {
    return (
        <SafeAreaView style={tw`flex-1 flex-col flex bg-black `}>
            <View style={tw`w-full h-[200px] flex  flex-col px-6 pb-4 gap-3 bg-black`}>


                <View style={tw`mx-auto w-full  flex justify-between flex-row bg-black`}>
                    <TouchableOpacity onPress={() => alert('Уведомления')}>
                        <Icon name="person-outline" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => alert('Уведомления')}>
                        <Icon name="notifications-outline" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                    <Text style={tw`text-white font-bold text-xl`}>Привет, {nickname} 👋</Text>
                <View style={tw`flex gap-2 w-full flex-row`}>
                    <View style={tw`bg-white rounded-lg p-2 w-[100px] h-[100px] flex-col flex justify-between`}>
                        <Text>💰</Text>
                        <Text style={tw`font-bold text-[14px]`}>Мой счет:  500</Text>
                    </View>
                    <View style={tw`bg-white rounded-lg p-2 w-[100px] h-[100px] flex-col flex justify-between`}>
                        <Text>📕</Text>
                        <Text style={tw`font-bold text-[14px]`}>Активных книг: 2</Text>
                    </View>
                    <View style={tw`bg-white rounded-lg p-2 w-[100px] h-[100px] flex-col flex justify-between`}>
                        <Text>🌟</Text>
                        <Text style={tw`font-bold text-[14px]`}>Мудрость: 403</Text>
                    </View>

                </View>

            </View>
            <View style={tw` bg-white flex-1 p-4 rounded-t-xl`}>
                {children}
            </View>
        </SafeAreaView>
    );
};

export default Layout;