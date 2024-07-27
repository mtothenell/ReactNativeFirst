import React from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet, FlatList, ImageBackground, Dimensions} from 'react-native';
import bg from "../assets/img.png";
import commonStyles from "../commonStyles";

const MyModal = ({onClose, onSelectNumber, pointsPlaying, playerTextfield = false, isAmericano = false}) => {

    let numbers;
    let itemHeight = 34; // Height of each item
    let itemWidth = 35;  // Width of each item
    let numColumns = 4;   // Number of columns
    if (!playerTextfield) {
        numbers = Array.from({length: pointsPlaying}, (_, i) => i + 1);
    } else {
        if (isAmericano === true) {
            numbers = [4];
        } else {
            numbers = Array.from({length: 4}, (_, i) => (i + 1) * 4);
        }
        itemHeight = 60;
        itemWidth = 20;
        numColumns = 8;
    }

    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const contentWidth = Math.min(screenWidth * 0.8, numColumns * itemWidth * 1.5);
    const contentHeight = Math.min(screenHeight * 0.8, Math.ceil(numbers.length / numColumns) * itemHeight * 1.5);
    return (
        <Modal
            onRequestClose={onClose}
            transparent={true}
            animationType="fade"
        >
            <View style={[styles.container]}>
                <View style={[styles.modalContent, {width: contentWidth, height: contentHeight}]}>
                    <FlatList
                        data={numbers}
                        renderItem={({item}) => (
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
    )
        ;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //paddingHorizontal: 65,
        //paddingVertical: 180,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    containerLandscape: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
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
