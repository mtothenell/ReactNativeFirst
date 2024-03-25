import {StyleSheet, Dimensions} from "react-native";

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const isLandscape = screenWidth > screenHeight;

// grön:   #668939
// orange: #fc7d1e

const commonStyles = StyleSheet.create({
    selectDropDownText: {
        fontFamily: 'Bauhaus_93'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: "red",
    },
    contentContainer: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerLandscape: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerContainer: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomContainer: {
        flex: 0.5,
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
    rowContainerTournamentLandscape: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        marginTop: -60,
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
        width: 100,
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'Bauhaus_93'
    },
    labelVS: {
        color: 'orange',
        width: 50,
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'Bauhaus_93'
    },
    courtLabel: {
        color: 'orange',
        padding: 5,
        width: 50,
        textAlign: 'center',
        fontSize: 18,
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
        fontFamily: 'Bauhaus_93',
    },
    headlines: {
        fontFamily: 'Bauhaus_93',
        fontSize: 26,
        color: "orange",
        textAlign: "center",
        padding: 20,
    },
    underLines: {
        fontSize: 14,
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
        backgroundColor: "white",
        //fontFamily: 'Bauhaus_93',
    },
    selectDropdown2: {
        height: 25,
        width: 60,
        borderRadius: 5,
        backgroundColor: "white"
    },
    heading: {
        fontSize: 20,
        marginBottom: 10,
    },
    table: {
        width: "100%",
    },
    tableRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#000000",
        paddingVertical: 0,
        backgroundColor: '#b8ce9b',
        height: 36,
    },
    headerRow: {
        backgroundColor: "orange",
    },
    cell: {
        flex: 1,
        textAlign: "center",
        fontFamily: 'Bauhaus_93'
    },
    cellHeader: {
        flex: 1,
        textAlign: "center",
        fontFamily: 'Bauhaus_93',
        fontSize: 20
    },
    cell2: {
        flex: 1,
        textAlign: "center",
        fontFamily: 'Bauhaus_93'
    },
    counterContainer: {
    },
    notFirst: {
        backgroundColor: '#b8ce9b',
    },
    first: {
        backgroundColor: '#efdd76',
    },
});

export default commonStyles;
