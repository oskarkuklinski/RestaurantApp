import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

/*
FoodMenuPage component structure

FoodMenuPage
    Header
    Menu
        Category
            Item
*/

const testData = [
    {
        id: 0, 
        name: 'Promotions and Deals',
        contents: [ 
            { name: 'Family Deal', price: 20, desc: 'Family sharing deal including 20 spicy wings, 3 soft drinks and starter of your choice' },
            { name: 'Pizza Club', price: 8 ,desc: 'Pizza of your choice with a soft drink or a beer inlcuded' },
            { name: 'Sharing Platter', price: 25, desc: 'A whole chicken with two sides of your choice and two soft drinks' }
        ]
    },
    {
        id: 1,
        name: 'Drinks and Spirits',
        contents: [ 
            { name: 'Soft Drink', price: 4, desc: 'coca-cola classic, coca-cola zero, coca-cola light, sprite, fanta' },
            { name: 'Beer', price: 5, desc: 'Peroni, Carlsberg, Stella, Guinness' },
        ]
    },
    {
        id: 2,
        name: 'Starters',
        contents: [ 
            { name: 'Chicken Wings', price: 5, desc: '3 chicken wings with a baste of your choice' },
            { name: 'Olives', price: 4, desc: 'Small portion of olives to start your evening' },
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
            return <Category 
                       key={item.id} 
                       item={item} />
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
        let items = this.props.item.contents.map((item, index) => {
            return <Item 
                       key={index} 
                       item={item} />
        });
        return (
            <View>
                <Text>{this.props.item.name}</Text>
                <Icon
                    name='minus'
                    color='#F2E1AE'>
                </Icon>
                <View>
                    {items}
                </View>
            </View>
        );
    }
}

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // initial state of a style for an item description 
            style: 'none'
        }
    }
    render() {
        return (
            <View>
                <TouchableOpacity>
                    <Text
                        style={styles.item}
                        // Change display of details after a click depending on a current state
                        onPress={() => (this.state.style == 'none') ? this.setState({style: 'flex'}) : this.setState({style: 'none'})}>
                        {this.props.item.name} - {this.props.item.price} £
                    </Text>
                </TouchableOpacity>
                <View
                    // Apply changes in style here
                    style={{display: this.state.style}}>
                    <Text>
                        {this.props.item.desc}
                    </Text>
                    <Button
                        title="Add">
                    </Button>
                </View>
            </View>
        );
    }
}

export default class FoodMenuPage extends React.Component {
    constructor(props) {
        super(props);
        // Initial states
        this.state = {
            basket: 0,
            items: testData,
            number: this.props.navigation.state.params.data,
            descDisplay: "red",
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Header 
                    basket={this.state.basket} 
                    number={this.state.number} />
                <Text>Search the menu</Text>
                <Menu 
                    items={this.state.items} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        padding: 6
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