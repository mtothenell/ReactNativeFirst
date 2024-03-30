import React from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet, FlatList, ImageBackground} from 'react-native';
import bg from "../assets/img.png";
import commonStyles from "../commonStyles";

const MyModal = ({onClose, onSelectNumber, pointsPlaying, isLandscape}) => {
    console.log("pointsplay: " + pointsPlaying)

    const numbers = Array.from({length: pointsPlaying}, (_, i) => i + 1);

    const itemHeight = 34; // Height of each item
    const itemWidth = 35;  // Width of each item
    const numColumns = 4;   // Number of columns

    let contentHeight = Math.ceil(numbers.length / numColumns) * itemHeight * 1.5; // Adjusted to add extra space
    let contentWidth = numColumns * itemWidth * 1.5; // Adjusted to add extra space

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
