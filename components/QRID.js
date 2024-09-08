import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image, Modal, StyleSheet, Dimensions } from 'react-native';
import tw from 'twrnc';

const QRID = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={tw`bg-black rounded-lg w-full h-[100px] p-4 flex-row justify-between items-center`}
        onPress={() => setModalVisible(true)}
      >
        <View style={tw`flex flex-col`}>
          <Text style={tw`text-white font-bold text-[16px]`}>Войти в библиотеку</Text>
          <Text style={tw`text-white text-[12px] w-[60%]`}>Наведите на QR-код, чтобы увеличить его</Text>
        </View>
        <Image
          style={tw`h-[100px] w-[80px]`}
          source={require('../assets/qr.png')}
        />
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeText}>X</Text>
          </TouchableOpacity>
          <Image
            style={styles.qrImage}
            source={require('../assets/qr.png')}
          />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  qrImage: {
    width: Dimensions.get('window').width * 0.8,  // Adjust size as needed
    height: Dimensions.get('window').height * 0.8, // Adjust size as needed
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
  },
  closeText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default QRID;