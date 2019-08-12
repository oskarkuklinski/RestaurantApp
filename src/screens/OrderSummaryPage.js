import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// ---------- HEADER --------------------------
class Header extends React.Component {
    render() {
        return (
            <View
                style={styles.header}>
                <Text>Summary</Text>
                <Text>Table no. {this.props.number}</Text>
            </View>
        );
    }
}

// ---------- SUMMARY --------------------------
class Summary extends React.Component {
    render() {
        let basketItems = this.props.basketItems.map((item, index) => {
            return <BasketItem 
                       key={index}
                       item={item}/>
        });
        return (
            <View>
                {basketItems}
            </View>
        );
    }
}

// ---------- BASKET ITEM --------------------------
class BasketItem extends React.Component {
    render() {
        return (
            <View>
                <Text>{this.props.item.quantity}x {this.props.item.name}</Text>
                <TouchableOpacity>
                    <Icon
                        name='remove'
                        color="#F2E1AE">
                    </Icon>
                </TouchableOpacity>
            </View>
        );
    }
}

// ---------- MAIN COMPONENT --------------------------
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
                <Header
                    number={this.state.number} />
                <Summary
                    basketItems={this.state.basketItems} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
     header: {
        paddingHorizontal: 10,
        width: '100%',
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    container: {
        flex: 1, 
        alignItems: "center", 
        justifyContent: "center",
    },
    title: {
        fontSize: 26
    },
});