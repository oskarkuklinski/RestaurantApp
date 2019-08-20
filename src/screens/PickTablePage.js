import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import MainStyles from '../Styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
            <View style={MainStyles.container}>
                <Text style={MainStyles.title}>Pick a table number:</Text>
                <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    onChangeText={(text) => this.onChanged(text)}
                    value={this.state.number}
                    maxLength={2}>
                </TextInput>
                <TouchableOpacity 
                style={MainStyles.buttons} 
                onPress={() => this.props.navigation.navigate('FoodMenu', { data: this.state.number })}>
              <Text style={MainStyles.text}>Next</Text>
                </TouchableOpacity>
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
    input: {
        backgroundColor:'#F2E1AE',
        fontSize:40,
        borderRadius:14,
        // borderBottomColor: "grey",
        // borderBottomWidth: 1,
        height: 100,
        width: 100,
        margin: 6,
        textAlign:'center',
    },
    title: {
        fontSize: 26
    },
});