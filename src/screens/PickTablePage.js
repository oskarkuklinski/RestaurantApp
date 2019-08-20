import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import MainStyles from '../Styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

class PickTablePage extends React.Component {
    // Initial states
    state = {
        table: null,
        basket: {
            numberOfItems: this.props.basket.numberOfItems,
            items: this.props.basket.items,
        },
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
        return (
            <View style={MainStyles.container}>
                <Text style={MainStyles.title}>Pick a table number:</Text>
                <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    onChangeText={(text) => this.onChanged(text)}
                    value={this.state.table}
                    maxLength={2}>
                </TextInput>
                <TouchableOpacity 
                style={MainStyles.buttons} 
                onPress={() => this.props.navigation.navigate('FoodMenu', { data: this.state.number })}>
              <Text style={MainStyles.text}>Next</Text>
                </TouchableOpacity>
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
        basket: state.basket
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

// Connect redux store with react component and export it
export default connect(mapStateToProps)(PickTablePage);