import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default class PickTablePage extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Pick a table number:</Text>
                <TextInput></TextInput>
                <Button
                    title="Next">
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