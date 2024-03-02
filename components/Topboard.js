import {View, Text, ImageBackground, FlatList} from "react-native";
import React, {useState} from "react";
import bg from "../assets/img.png";
import commonStyles from "../commonStyles";

const Topboard = ({route}) => {

    const {playerInputs} = route.params || [];
    const [started, setStarted] = useState(false);

    return (
        <ImageBackground
            source={bg}
            resizeMode="cover"
            style={commonStyles.backgroundImage}
        >
            {started ? (
                < View style={commonStyles.container}>
                    <Text style={commonStyles.headlines}>Toplist</Text>
                    <View style={commonStyles.table}>
                        <View style={[commonStyles.tableRow, commonStyles.headerRow]}>
                            <Text style={commonStyles.cell}>Name</Text>
                            <Text style={commonStyles.cell}>Score</Text>
                        </View>
                        <FlatList
                            data={playerInputs}
                            renderItem={({item}) => (
                                <View style={commonStyles.tableRow}>
                                    <Text style={commonStyles.cell}>{item.name}</Text>
                                    <Text style={commonStyles.cell}>{item.score}</Text>
                                </View>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </View>
            ) : (
                <View style={commonStyles.container}>
                    <Text style={commonStyles.headlines}>Tournament not started</Text>
                </View>)}
        </ImageBackground>
    );
};

export default Topboard;

