import React, {useState} from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import commonStyles from "../commonStyles";

const CustomCounter = ({initialValue, onIncrement, onDecrement, tournamentData, isLandscape}) => {
    const [count, setCount] = useState(initialValue || 0);

    const handleIncrement = () => {
        setCount(count + 1);
        if (onIncrement) onIncrement(count + 1);
    };

    const handleDecrement = () => {
        if (count > 0) {
            setCount(count - 1);
            if (onDecrement) onDecrement(count - 1);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleDecrement} style={styles.button}>
                <Text style={[styles.buttonText, isLandscape && tournamentData.playerNames.length > 12 && {fontSize: 10}]}>-</Text>
        </TouchableOpacity>
            <Text style={[styles.count, isLandscape && tournamentData.playerNames.length > 12 && {fontSize: 10}]}>{count}</Text>
    <TouchableOpacity onPress={handleIncrement} style={styles.button}>
        <Text style={[styles.buttonText, isLandscape && tournamentData.playerNames.length > 12 && {fontSize: 10}]}>+</Text>
    </TouchableOpacity>
</View>

)
    ;
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    count: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CustomCounter;
