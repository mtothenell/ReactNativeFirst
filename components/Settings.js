import commonStyles from "../commonStyles";
import {View, Text, ImageBackground} from "react-native";
import bg from "../assets/img.png";

const Settings = () => {

    return(
        <ImageBackground
            source={bg}
            resizeMode="cover"
            style={commonStyles.backgroundImage}
        >
        <View style={commonStyles.container}>
            <Text style={commonStyles.headlines}></Text>
        </View>
        </ImageBackground>
    )
}
export default Settings;
