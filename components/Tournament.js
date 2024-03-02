import { View, Text, ImageBackground, FlatList} from "react-native";
import React from "react";
import bg from "../assets/img.png";
import commonStyles from "../commonStyles";

const Tournament = ({ route }) => {
    const { playerInputs } = route.params;

    const randomizePlayer = () => {
        return playerInputs[0].name
    }


    return (
        <ImageBackground
            source={bg}
            resizeMode="cover"
            style={commonStyles.backgroundImage}
        >
            <View style={commonStyles.container}>
                <Text style={commonStyles.headlines}>Toplist</Text>
                <View style={commonStyles.table}>
                    {/*<FlatList*/}
                    {/*    data={playerInputs}*/}
                    {/*    renderItem={({ item }) => (*/}
                    {/*        <View style={commonStyles.tableRow}>*/}
                    {/*            <Text style={commonStyles.cell}>{item.name}</Text>*/}
                    {/*        </View>*/}
                    {/*    )}*/}
                    {/*    keyExtractor={(item, index) => index.toString()}*/}
                    {/*/>*/}
                    <Text style={commonStyles.headlines}>{randomizePlayer()}</Text>
                </View>
            </View>
        </ImageBackground>
    );
};

export default Tournament;
