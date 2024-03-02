import {StyleSheet, Dimensions} from "react-native";

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const commonStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundImage: {
        height: screenHeight,
        width: screenWidth,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    label: {
        color: 'white',
        padding: 5,
        width: 70,
        textAlign: 'center',
        fontSize: 14,
        fontFamily: "notoserif",
    },
    textField: {
        backgroundColor: "white",
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'black',
        height: 25,
        width: 150,
        color: 'black',
        borderRadius: 5,
        textAlign: 'center',
        fontFamily: "notoserif",
    },
    headlines: {
        fontSize: 26,
        fontWeight: "bold",
        color: "orange",
        textAlign: "center",
        fontFamily: "notoserif",
    },
    underLines: {
        fontSize: 14,
        fontFamily: "notoserif",
    },
    tableRow: {
        color: 'white',
    },
    dropDown: {
        width: 200,
        backgroundColor: "white",
    },
    button: {
        borderRadius: 5,
        backgroundColor: "orange",
        color: "black",
        fontFamily: "notoserif",
    },
    selectDropdown: {
        height: 25,
        width: 150,
        borderRadius: 5,
        backgroundColor: "white"
    }
});

export default commonStyles;
