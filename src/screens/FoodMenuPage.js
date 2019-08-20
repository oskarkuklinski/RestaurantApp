import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

/*
FoodMenuPage component structure

FoodMenuPage
    Header
    Menu
        Category
            Item
*/

// -------------- TEST DATA ----------------------
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

// ---------- HEADER --------------------------
class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <View
                style={styles.header}>
                <Text>ORDER</Text>
                <Text>Table no. {this.props.table}</Text>
                <TouchableOpacity
                    style={styles.basket}
                    onPress={() => this.props.navigate('OrderSummary')}>
                    <Icon
                        name='shopping-cart'
                        color="#F2E1AE"
                        style={styles.basketIcon}>
                    </Icon>
                    <Text>({this.props.basket.numberOfItems})</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

// ---------------- MENU ---------------------------
class Menu extends React.Component {
    render() {
        let items = this.props.items.map((item, index) => {
            return <Category 
                       key={item.id} 
                       item={item}
                       addToBasket={this.props.addToBasket}/>
        });
        return (
            <View>
                {items}
            </View>
        );
    }
}

// ---------------- CATEGORY --------------------
class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // initial state of a style for an item description 
            style: 'none'
        }
    }
    render() {
        let items = this.props.item.contents.map((item, index) => {
            return <Item 
                       key={index} 
                       item={item} 
                       addToBasket={this.props.addToBasket} />
        });
        return (
            <View>
                <TouchableOpacity
                    // Change display of details after a click depending on a current state
                    onPress={() => (this.state.style == 'none') ? this.setState({style: 'flex'}) : this.setState({style: 'none'})}>
                    <Text>
                        {this.props.item.name}
                    </Text>
                    <Icon
                        name='minus'
                        color='#F2E1AE'>
                    </Icon>
                </TouchableOpacity>
                <View
                    // Apply changes in style here
                    style={{display: this.state.style}}>
                    {items}
                </View>
            </View>
        );
    }
}

// ------------------- ITEM -----------------------
class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // initial state of a style for an item description 
            style: 'none'
        }
        this.handleAddToBasket = this.handleAddToBasket.bind(this);
    }
    // Event handler
    handleAddToBasket(e) {
        this.props.addToBasket(this.props.item);
    }
    render() {
        return (
            <View>
                <TouchableOpacity
                    // Change display of details after a click depending on a current state
                    onPress={() => (this.state.style == 'none') ? this.setState({style: 'flex'}) : this.setState({style: 'none'})}>
                    <Text
                        style={styles.item}>
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
                        title="Add"
                        onPress={this.handleAddToBasket}>
                    </Button>
                </View>
            </View>
        );
    }
}

// -------------------- MAIN COMPONENT -------------------------
class FoodMenuPage extends React.Component {
    constructor(props) {
        super(props);
        // Initial states
        this.state = {
            basket: {
                numberOfItems: this.props.basket.numberOfItems,
                items: this.props.basket.items,
            },
            items: testData,
            table: this.props.table,
        }
        // Bind the function to the component
        this.addToBasket = this.addToBasket.bind(this)
    }
    
    addToBasket(item) {
        let newItem = item;
        // increase quantity of repeating object
        if (this.props.basket.items.includes(item)) {
            this.props.dispatch({
                type: 'INCREASE_QUANTITY',
                payload: this.state.basket,
                item: item,
            });
        }  else {
            // add quantity and index value to the object in the basket
            newItem.quantity = 1;
            newItem.index = this.props.basket.items.length;
            this.props.dispatch({
                type: 'ADD_TO_BASKET',
                payload: this.state.basket,
                item: newItem,
            });
        }
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Header 
                    basket={this.props.basket} 
                    table={this.props.table} 
                    // navigation prop reference to navigate to the summary page
                    navigate={this.props.navigation.navigate} />
                <Text>Search the menu</Text>
                <Menu 
                    items={this.state.items}
                    addToBasket={this.addToBasket}
                    basketItems={this.state.basketItems}/>
            </View>
        );
    }
}

// Select data from the store (redux) that component needs
function mapStateToProps(state){
    return {
        table: state.table.table,
        basket: state.basket,
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
    basket: {
        display: "flex",
        flexDirection: "row"
    },
    basketIcon: {
        fontSize: 26
    },
    item: {
        padding: 8
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

// Connect redux store with react component and export it
export default connect(mapStateToProps)(FoodMenuPage);