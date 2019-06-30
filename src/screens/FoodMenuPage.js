import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

/*
FoodMenuPage component structure

FoodMenuPage
    Header
    Menu
        Category
*/

const testData = [
    {
        id: 0, 
        name: 'Promotions and Deals',
        contents: [ 
            { name: 'Family Deal', price: 20 },
            { name: 'Pizza Club', price: 8 },
            { name: 'Sharing Platter', price: 25 }
        ]
    },
    {
        id: 1,
        name: 'Drinks and Spirits',
        contents: [ 
            { name: 'Soft Drink', price: 4 },
            { name: 'Beer', price: 5 },
        ]
    },
    {
        id: 2,
        name: 'Starters',
        contents: [ 
            { name: 'Chicken Wings', price: 5 },
            { name: 'Olives', price: 4 },
        ]
    }
];

class Header extends React.Component {
    render() {
        return (
            <View>
                <Text>ORDER</Text>
                <Text>Table no. {this.props.number}</Text>
                <Icon
                    name='shopping-cart'
                    color="#F2E1AE">
                </Icon>
                <Text>({this.props.basket})</Text>
            </View>
        );
    }
}

class Menu extends React.Component {
    render() {
        let items = this.props.items.map((item, index) => {
            return <Category key={item.id} item={item} />
        });
        return (
            <View>
                {items}
            </View>
        );
    }
}

class Category extends React.Component {
    render() {
        return (
            <View>
                <Text>{this.props.item.name}</Text>
                <Icon
                    name='minus'
                    color='#F2E1AE'>
                </Icon>
                <View>
                    {this.props.item.contents.map((item, index) => {
                        return <Text key={index}>{item.name} - {item.price} £</Text>
                    })}
                </View>
            </View>
        );
    }
}

export default class FoodMenuPage extends React.Component {
    state = {
        basket: 0,
        items: testData,
        number: this.props.navigation.state.params.data
    }
    render() {
        return (
            <View style={styles.container}>
                <Header basket={this.state.basket} number={this.state.number} />
                <Text>Search the menu</Text>
                <Menu items={this.state.items}/>
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