import React from 'react';
import MainStyles from '../Styles';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { removeFromBasket, increaseQuantity, decreaseQuantity } from '../actions/index';

// ---------- HEADER --------------------------
class Header extends React.Component {
    render() {
        return (
            <View
                style={MainStyles.header}>
                <TouchableOpacity
                    onPress={() => this.props.navigate('FoodMenu')}>
                    <Icon
                        style={MainStyles.icon}
                        name='arrow-left'
                        color="#F2E1AE">
                    </Icon>
                </TouchableOpacity>
                <Text style={MainStyles.text}>Summary</Text>
                <View></View>
            </View>
        );
    }
}

// ---------- SUMMARY --------------------------
class Summary extends React.Component {
    render() {
        let basketItems = this.props.basket.items.map((item, index) => {
            return <BasketItem 
                       key={index}
                       item={item}
                       basket={this.props.basket}
                       removeFromBasket={this.props.removeFromBasket}
                       increaseQuantity={this.props.increaseQuantity} 
                       decreaseQuantity={this.props.decreaseQuantity} />
        });
        if (this.props.basket.items.length > 0) {
            return (
                <View style={styles.summary}>
                    {basketItems}
                    <TouchableOpacity>
                        <Text>Table no: {this.props.table}</Text>
                    </TouchableOpacity>
                    <Text>Total: {this.props.basket.total} £</Text>
                    <Button
                        title="Checkout">
                    </Button>
                </View>
            );
        }
        return (
            <View>
                <Text>You have not chosen any products yet.</Text>
                <Text>Please go back to the Menu page if you wish to order.</Text>
            </View>
        );
    }
}

// ---------- BASKET ITEM --------------------------
class BasketItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleRemoveFromBasket = this.handleRemoveFromBasket.bind(this);
        this.handleIncreaseQuantity = this.handleIncreaseQuantity.bind(this);
        this.handleDecreaseQuantity = this.handleDecreaseQuantity.bind(this);
    }
    
    handleRemoveFromBasket(e) {
        this.props.removeFromBasket(this.props.item, this.props.basket);
    }
    handleIncreaseQuantity(e) {
        this.props.increaseQuantity(this.props.item, this.props.basket);
    }
    handleDecreaseQuantity(e) {
        if (this.props.item.quantity > 1) {
            this.props.decreaseQuantity(this.props.item, this.props.basket);
        } else {
            alert("Press x to remove the product from basket");
        }
    }
    
    render() {
        return (
            <View style={styles.item}>
                <Text style={styles.name}>{this.props.item.name}</Text>
                <View style={styles.quantity}>
                    <TouchableOpacity
                        onPress={this.handleDecreaseQuantity}>
                        <Icon
                            name='minus'
                            color="#F2E1AE">
                        </Icon>
                    </TouchableOpacity>
                    <Text>{this.props.item.quantity}</Text>
                    <TouchableOpacity
                        onPress={this.handleIncreaseQuantity}>
                        <Icon
                            name='plus'
                            color="#F2E1AE">
                        </Icon>
                    </TouchableOpacity>
                </View>
                <Text style={styles.price}>{this.props.item.price * this.props.item.quantity} £</Text>
                <TouchableOpacity 
                    style={styles.remove}
                    onPress={this.handleRemoveFromBasket}>
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
class OrderSummaryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            table: this.props.table,
            basket: {
                numberOfItems: this.props.basket.numberOfItems,
                items: this.props.basket.items,
            },
        }
    }
    
    render() {
        return (
            <View style={MainStyles.container}>
                <Header
                    numberOfItems={this.props.basket.numberOfItems} 
                    navigate={this.props.navigation.navigate} 
                    basket={this.props.basket} />
                <Summary
                    basket={this.props.basket}
                    table={this.props.table}
                    removeFromBasket={this.props.removeFromBasket}
                    increaseQuantity={this.props.increaseQuantity}
                    decreaseQuantity={this.props.decreaseQuantity} />
            </View>
        );
    }
}
                
                
// Select data that from the store (redux) that component needs
function mapStateToProps(state){
    return {
        table: state.table.table,
        basket: state.basket,
    }
}

// Bind the actions to be used for the component
function mapDispatchToProps (dispatch) {
    return {
        removeFromBasket: (item, basket) => { dispatch(removeFromBasket(item, basket)) },
        increaseQuantity: (item, basket) => { dispatch(increaseQuantity(item, basket)) },
        decreaseQuantity: (item, basket) => { dispatch(decreaseQuantity(item, basket)) },
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
    summary: {
        margin: 5
    },
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
        padding: 6,
    },
    item: {
        width: '100%',
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    quantity: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent:"space-around",
    },
    name: {
        flex: 1,
    },
    price: {
        flex: 1,
    },
    remove: {
        flex: 1,
    },
    title: {
        fontSize: 26
    },
});

// Connect redux store with react component and export it
export default connect(mapStateToProps, mapDispatchToProps)(OrderSummaryPage);