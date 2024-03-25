import React from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet, FlatList, ImageBackground} from 'react-native';
import bg from "../assets/img.png";
import commonStyles from "../commonStyles";
const MyModal = ({ visible, onClose, onSelectNumber }) => {

    const numbers = Array.from({ length: 32 }, (_, i) => i + 1);

    return (
        <Modal
            onRequestClose={onClose}
            transparent={true}
            animationType="fade"
        >
            <View style={styles.container}>
                <View style={styles.modalContent}>
                    <FlatList
                        data={numbers}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.numberButton}
                            onPress={() => onSelectNumber(item)}>
                                <Text style={styles.numberText}>{item}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.toString()}
                        numColumns={4}
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 65,
        paddingVertical: 180,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContent: {
        backgroundColor: '#668939',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    numberButton: {
        height: 34,
        width: 35,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding: 8,
        margin: 3,
    },
    numberText: {
        fontSize: 14,
    },
});

export default MyModal;
