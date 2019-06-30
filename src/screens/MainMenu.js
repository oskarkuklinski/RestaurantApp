import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class MainMenu extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>LOGO</Text>
                <Button
                    title="Order food to your table"
                    onPress={() => this.props.navigation.navigate("PickTable")}>
                </Button>
                <Button
                    title="Check reviews and information">
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: "center", 
        justifyContent: "center",
    },
    title: {
        fontSize: 26
    },
});