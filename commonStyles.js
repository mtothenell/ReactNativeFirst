import {StyleSheet, Dimensions} from "react-native";

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const isLandscape = screenWidth > screenHeight;

// grön:   #668939
// orange: #fc7d1e

const commonStyles = StyleSheet.create({
    selectDropDownText: {
        fontFamily: 'JosefinSans',
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerLandscapes: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    containerLand: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentContainer: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentContainerLandscape: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'flex-start',
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
        //justifyContent: 'flex-start',
        alignItems: 'center',
        //marginTop: -60,
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
        fontFamily: 'JosefinSans',
        fontWeight: 'bold',
    },
    labelVS: {
        color: 'orange',
        width: 50,
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'JosefinSans',
        fontWeight: 'bold',
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
        fontFamily: 'JosefinSans',
        fontWeight: 'bold',
    },
    textFieldForTournament: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'black',
        color: 'black',
        textAlign: 'center',
        fontFamily: 'JosefinSans',
        fontWeight: 'bold',
        height: 25,
        width: 50,
        borderRadius: 5,
        backgroundColor: "white",
    },
    headlines: {
        fontFamily: 'JosefinSans',
        fontWeight: 'bold',
        fontSize: 26,
        color: "orange",
        textAlign: "center",
        padding: 20,
    },
    headlinesLandscape: {
        fontFamily: 'JosefinSans',
        fontWeight: 'bold',
        fontSize: 18,
        color: "orange",
        textAlign: "center",
        padding: 8,
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
        height: 27,
    },
    headerRow: {
        backgroundColor: "orange",
        height: 25,
    },
    cell: {
        flex: 1,
        textAlign: "center",
        fontFamily: 'JosefinSans',
        fontWeight: 'bold',
    },
    cellHeader: {
        flex: 1,
        textAlign: "center",
        fontFamily: 'JosefinSans',
        fontWeight: 'bold',
        fontSize: 16
    },
    cell2: {
        flex: 1,
        textAlign: "center",
        fontFamily: 'JosefinSans',
        fontWeight: 'bold',
    },
    counterContainer: {

    },
    notFirst: {
        backgroundColor: '#b8ce9b',
    },
    first: {
        backgroundColor: '#FFD700',
    },
});

export default commonStyles;
