import {StyleSheet, Dimensions} from "react-native";

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const commonStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 30,
    },
    backgroundImage: {
        height: screenHeight,
        width: screenWidth,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
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
        padding: 20,
    },
    underLines: {
        fontSize: 14,
        fontFamily: "notoserif",
    },
    dropDown: {
        width: 200,
        backgroundColor: "white",
    },
    button: {
        borderRadius: 5,
        backgroundColor: "orange",
        color: "black",
    },
    selectDropdown: {
        height: 25,
        width: 150,
        borderRadius: 5,
        backgroundColor: "white"
    },
    selectDropdown2: {
        height: 25,
        width: 60,
        borderRadius: 5,
        backgroundColor: "white"
    },
    heading: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    table: {
        width: "100%",
    },
    tableRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        paddingVertical: 10,
        backgroundColor: 'white',
    },
    headerRow: {
        backgroundColor: "#f0f0f0",
    },
    cell: {
        flex: 1,
        textAlign: "center",
    },
});

export default commonStyles;
