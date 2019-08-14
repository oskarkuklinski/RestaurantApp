import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { changeTableNumber } from '../actions/index';

class PickTablePage extends React.Component {
    // Initial states
    state = {
        table: null
    }
    
    // Validate only numbers as input values
    onChanged(text) {
        let newText = '';
        let numbers = '0123456789';

        for (var i=0; i < text.length; i++) {
            // if entered value belong to numbers, add it
            if(numbers.indexOf(text[i]) > -1 ) {
                newText = newText + text[i];
            }
            else {
                // return alert if the value is different than a number
                alert("please enter numbers only");
            }
        }
        this.setState({ table: newText });
    }

    handleNavigation() {
        if (this.state.table != "" && this.state.table != null) {
            // change redux prop value using the value from input field
            this.props.dispatch({
                type: 'CHANGE_TABLE_NUMBER',
                payload: this.state.table,
            });
            // Navigate to the next page
            this.props.navigation.navigate('FoodMenu');
        } else {
            alert("Please enter your table number");
        }
    }

    render() {
        console.log(this.props);
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Pick a table number:</Text>
                <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    onChangeText={(text) => this.onChanged(text)}
                    value={this.state.table}
                    maxLength={2}>
                </TextInput>
                <Button
                    title="Next"
                    onPress={() => this.handleNavigation()}>
                </Button>
            </View>
        );
    }
}

// Select data that from the store (redux) that component needs
function mapStateToProps(state){
    return {
        table: state.table.table,
    }
}

// Screen styles
const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: "center", 
        justifyContent: "center",
    },
    input: {
        borderBottomColor: "grey",
        borderBottomWidth: 1,
        height: 32,
        width: 32,
        margin: 6,
    },
    title: {
        fontSize: 26
    },
});

// Connect redux store with react component and export it
export default connect(mapStateToProps)(PickTablePage);