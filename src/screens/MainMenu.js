import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import MainStyles from '../Styles';
import EStyleSheet from 'react-native-extended-stylesheet';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class MainMenu extends React.Component {
    render() {
        return (
            <View style={MainStyles.container}>
                <Text style={MainStyles.title}>!cheers</Text>
                    <TouchableOpacity style={MainStyles.buttons} onPress={() => this.props.navigation.navigate("PickTable")}>
                        <Text style={MainStyles.text}>Order food to your table</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {MainStyles.buttons} onPress={() => {}}>
                        <Text style={MainStyles.text}>Check reviews and information</Text>
                    </TouchableOpacity>
                {/* <Button style={MainStyles.buttons}
                    title="Order food to your table"
                    onPress={() => this.props.navigation.navigate("PickTable")}>
                </Button>
                <Button style={MainStyles.buttons}
                    title="Check reviews and information">
                </Button> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1, 
        // alignItems: "center", 
        // justifyContent: "center",
    },
    title: {
        // fontSize: 26
    },
});