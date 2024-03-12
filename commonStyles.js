import {StyleSheet, Dimensions} from "react-native";

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const isLandscape = screenWidth > screenHeight;

const commonStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: "red",
    },
    headerContainer: {
        flex: 0.5,
        //backgroundColor: "blue",
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomContainer: {
        flex: 0.5,
        //backgroundColor: "green",
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
    },
    backgroundImage: {
        height: screenHeight,
        width: screenWidth,
    },
    indexImage: {
        padding: 20,
        paddingBottom: 50,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
    fullWidthContainer: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-around',
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
    courtLabel: {
        color: 'orange',
        padding: 5,
        width: 70,
        textAlign: 'center',
        fontSize: 14,
        fontFamily: "notoserif",
        fontWeight: 'bold',
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
        paddingVertical: 0,
        backgroundColor: 'whitesmoke',
        height: 36,
    },
    headerRow: {
        backgroundColor: "orange",
    },
    cell: {
        flex: 1,
        textAlign: "center",
    },
    cell2: {
        flex: 1,
        textAlign: "center",
    },
    counterContainer: {
    },
});

export default commonStyles;
