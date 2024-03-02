import {View, Text, ImageBackground} from "react-native";
import React from "react";
import bg from "../assets/img.png";
import commonStyles from "../commonStyles";
import {Table, Row, Rows} from "react-native-table-component";

const Topboard = ({route}) => {

    const {playerInputs} = route.params;
    console.log(playerInputs)
    const tableData = playerInputs.map(player => [player.name, player.score]);

    return (
        <ImageBackground
            source={bg}
            resizeMode="cover" style={commonStyles.backgroundImage}>
            <View style={commonStyles.container}>
                <Text style={commonStyles.headlines}>Toplist</Text>
                <View style={commonStyles.rowContainer}>
                    <Table style={{backgroundColor: 'white'}} borderStyle={{ width: 200, borderWidth: 1, borderColor: '#C1C0B9'}}>
                        <Row textStyle={{color: "black", fontWeight: "bold"}} data={['Name', 'Score']} style={[{width: 200}, commonStyles.underLines]}/>
                        {tableData.map((rowData, index) => (
                            <Row style={commonStyles.tableRow} key={index} data={rowData}/>
                        ))}
                    </Table>
                </View>
            </View>
        </ImageBackground>
    )

}

export default Topboard;
