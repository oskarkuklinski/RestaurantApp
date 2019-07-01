import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default class PickTablePage extends React.Component {
    state = {
        number: null
    }
    
    onChanged(text){
        let newText = '';
        let numbers = '0123456789';

        for (var i=0; i < text.length; i++) {
            if(numbers.indexOf(text[i]) > -1 ) {
                newText = newText + text[i];
            }
            else {
                // call back function
                alert("please enter numbers only");
            }
        }
        this.setState({ number: newText });
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Pick a table number:</Text>
                <TextInput
                    keyboardType='numeric'
                    onChangeText={(text) => this.onChanged(text)}
                    value={this.state.number}
                    maxLength={2}>
                </TextInput>
                <Button
                    title="Next"
                    onPress={() => this.props.navigation.navigate('FoodMenu', { data: this.state.number })}>
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