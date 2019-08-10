import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class OrderSummaryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: this.props.navigation.state.params.number,
            basketItems: this.props.navigation.state.params.basketItems,
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Table no. {this.state.number}</Text>
                <Text>{this.state.basketItems.toString()}</Text>
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